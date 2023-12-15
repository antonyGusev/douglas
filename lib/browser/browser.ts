import * as fs from 'fs';

import { IPage, IBrowser, IBrowserContext, chromium, IObjectStringVal, ITestInfo } from '../types';
import { pubsub } from '../helpers';
import { BasePage } from '../base.components';
import { pwLogging } from '../reporter';

const launchOptions = {
  headless: false,
};

interface InitialEntities {
  browser: IBrowser;
  currentPage: IPage;
  browserContext: IBrowserContext;
  pages: IPage[];
  initialPageIndex: number;
}

class BrowserAdapter {
  private currentPage: IPage | null = null;
  private browser: IBrowser | null = null;
  private browserContext: IBrowserContext | null = null;
  private pages: IPage[] = [];
  private initialPageIndex: number | null = null;

  constructor() {
    pubsub.subscribe('entity_Initialization', this.initPageForRemoteCtx.bind(this));
  }

  private initPageForRemoteCtx<T extends BasePage>(ctx: T): void {
    ctx['initPage'](this.currentPage!);
  }

  async init(): Promise<InitialEntities> {
    this.browser = await chromium.launch(launchOptions);
    this.browserContext = await this.browser.newContext();
    this.currentPage = await this.browserContext.newPage();

    pubsub.publish('current_page', this.currentPage);

    this.pages = this.browserContext.pages();
    this.initialPageIndex = this.findCurrentPageIndex();

    return {
      browser: this.browser,
      currentPage: this.currentPage,
      browserContext: this.browserContext,
      pages: this.pages,
      initialPageIndex: this.initialPageIndex,
    };
  }

  async newPage(url: string): Promise<number> {
    this.currentPage = await this.browserContext!.newPage();
    this.currentPage.goto(url)

    await this.currentPage.waitForLoadState('networkidle')
    await this.currentPage.bringToFront();

    pubsub.publish('current_page', this.currentPage);

    this.pages.push(this.currentPage);

    return this.findCurrentPageIndex();
  }

  async switchPage(pageIndex: number) {
    this.currentPage = this.pages[pageIndex];
    await this.currentPage.bringToFront();
    pubsub.publish('current_page', this.currentPage);
  }

  async closeCurrentPage() {
    if (this.pages.length <= 1) {
      throw new Error(`Can't close last one page!`);
    }

    await this.currentPage!.close();

    this.pages.pop();

    this.currentPage = this.pages[await this.initialPageIndex!];
    pubsub.publish('current_page', this.currentPage);

    await this.currentPage.bringToFront();
  }

  @pwLogging
  async goTo(url: string): Promise<void> {
    const currentPage = this.currentPage ?? (await this.init()).currentPage;
    await currentPage.goto(url);
    await currentPage.waitForLoadState('load')
  }

  async saveVideo(testInfo: ITestInfo): Promise<void> {
    await this.browserContext!.close()
    const path = await this.currentPage!.video()?.path();

    await testInfo.attach('video', {
      path,
      contentType: 'video/webm',
    })
  }

  async saveScrenshot(testInfo: ITestInfo): Promise<void> {
    const screenshot = await this.currentPage!.screenshot();
    await testInfo.attach('screenshot', { body: screenshot, contentType: 'image/png' });
  }

  async close(): Promise<void> {
    await this.browser!.close();

    this.browser = null;
    this.currentPage = null;
    this.browserContext = null;
    this.pages = [];

    pubsub.publish('close_browser', this.currentPage);
  }

  async sleep(timeout = 1000): Promise<void> {
    await (() => new Promise((res) => setTimeout(res, timeout)))();
  }

  async screenshot(path: string) {
    const currentPage = this.currentPage ?? (await this.init()).currentPage;

    await currentPage.screenshot({ path });
    
    return fs.readFileSync(path);
  }

  async newContext() {
    return this.browser!.newContext();
  }

  async getCurrentUrl() {
    const currentPage = this.currentPage ?? (await this.init()).currentPage;

    return currentPage.url();
  }

  async getCoockies(url?: string) {
    const browserContext = this.browserContext ?? (await this.init()).browserContext;

    return browserContext.cookies(url);
  }

  async getLocalStorage() {
    const browserContext = this.browserContext ?? (await this.init()).browserContext;

    return browserContext.storageState();
  }

  async setLocalStorage(givenStorage: IObjectStringVal) {
    const currentPage = this.currentPage ?? (await this.init()).currentPage;

    await currentPage.evaluate((givenStorage) => {
      for (const key in givenStorage) {
        localStorage.setItem(key, givenStorage[key]);
      }
    }, givenStorage);
  }

  async refreshThePage() {
    const currentPage = this.currentPage ?? (await this.init()).currentPage;

    await currentPage.reload();
    await currentPage.waitForLoadState('networkidle');
    await currentPage.bringToFront();
  }

  /**
   *
   * @private_service_methods
   */

  private getPageGuid = (page: IPage): string => JSON.parse(JSON.stringify(page))._guid;

  private findCurrentPageIndex() {
    return this.pages.findIndex((page) => this.getPageGuid(page) === this.getPageGuid(this.currentPage!));
  }
}

const browser = new BrowserAdapter();

export { browser, BrowserAdapter };
