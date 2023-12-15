import { BasePage, ButtonElement, IButtonElement, StateType } from '../../../lib';
import {
  HeaderFragment,
  IHeaderFragment,
  IHeaderFragmentClick,
  IHeaderFragmentIsVisible,
  IHeaderFragmentResult,
  IMainContentFragment,
  IMainContentFragmentClick,
  IMainContentFragmentGetData,
  IMainContentFragmentIsVisible,
  IMainContentFragmentResult,
  IMainContentFragmentSendKeys,
  MainContentFragment,
} from './fragments';

interface IUserAccountDataPageSendKeys {
  mainContent?: IMainContentFragmentSendKeys
}

interface IUserAccountDataPageClick {
  header?: IHeaderFragmentClick;
  mainContent?: IMainContentFragmentClick
}

interface IUserAccountDataPageGetData {
  mainContent?: IMainContentFragmentGetData
}

interface IUserAccountDataPageWaitForPageState {
  mainContent?: IMainContentFragmentIsVisible
}

interface IUserAccountDataPageResult {
  header: IHeaderFragmentResult;
  mainContent: IMainContentFragmentResult
}

interface IUserAccountDataPageIsVisible {
  header?: IHeaderFragmentIsVisible
  mainContent?: IMainContentFragmentIsVisible
}

export interface IUserAccountDataPage {
  sendKeys(data: IUserAccountDataPageSendKeys): Promise<void>;
  clickOn(data: IUserAccountDataPageClick): Promise<void>;
  getData(data: IUserAccountDataPageGetData): Promise<IUserAccountDataPageResult>;
  isVisible(data: IUserAccountDataPageIsVisible): Promise<IUserAccountDataPageResult>;
  waitForLoaded(data?: StateType): Promise<void>;
  waitForPageState(data: IUserAccountDataPageWaitForPageState): Promise<void>;
}

export class UserAccountDataPage extends BasePage implements IUserAccountDataPage {
  private header: IHeaderFragment;
  private mainContent: IMainContentFragment;
  // private footer: TFooterFragment;
  private scrollToTopButton: IButtonElement;

  constructor() {
    super('body', 'Main Douglas page');
    this.header = this.initChild(HeaderFragment, 'header.header', 'Header Fragment');
    this.mainContent = this.initChild(MainContentFragment, 'div.account-page', 'Main Content Fragment');
    // this.footer = this.initChild(FooterFragment, 'footer.footer', 'Footer Fragment');
    this.scrollToTopButton = this.initChild(ButtonElement, 'button.scroll-to-top-button svg', 'Scroll To Top Button');
  }
}
