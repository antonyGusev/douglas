import { BasePage, ButtonElement, IButtonElement } from '../../../lib';
import {
  DialogWindowFragment,
  HeaderFragment,
  IDialogWindowFragment,
  IDialogWindowFragmentClick,
  IHeaderFragment,
  IHeaderFragmentClick,
  IHeaderFragmentIsVisible,
  IHeaderFragmentResult,
} from './fragments';

interface IMainPageSendKeys {}

interface IMainPageClick {
  header?: IHeaderFragmentClick;
  dialogWindow?: IDialogWindowFragmentClick;
}

interface IMainPageGetData {}

interface IMainPageWaitForPageState {
  dialogWindow?: boolean;
}

interface IMainPageResult {
  header: IHeaderFragmentResult
}

interface IMainPageIsVisible {
  header?: IHeaderFragmentIsVisible
}

export interface IMainPage {
  sendKeys(data: IMainPageSendKeys): Promise<void>;
  clickOn(data: IMainPageClick): Promise<void>;
  getData(data: IMainPageGetData): Promise<IMainPageResult>;
  isVisible(data: IMainPageIsVisible): Promise<IMainPageResult>;
  waitForPageState(data: IMainPageWaitForPageState): Promise<void>;
}

export class MainPage extends BasePage implements IMainPage {
  private header: IHeaderFragment;
  // private mainContent: IMainContentFragment;
  // private footer: IFooterFragment;
  private dialogWindow: IDialogWindowFragment;
  private scrollToTopButton: IButtonElement;

  constructor() {
    super('body', 'Main Douglas page');
    this.header = this.initChild(HeaderFragment, 'header.header', 'Header Fragment');
    // this.mainContent = this.initChild(MainContentFragment, 'main.content', 'Main Content Fragment');
    // this.footer = this.initChild(FooterFragment, 'footer.footer', 'Footer Fragment');
    this.dialogWindow = this.initChild(DialogWindowFragment, 'div[role="dialog"]', 'Privacy Settings Dialog Window');
    this.scrollToTopButton = this.initChild(ButtonElement, 'button.scroll-to-top-button svg', 'Scroll To Top Button');
  }
}
