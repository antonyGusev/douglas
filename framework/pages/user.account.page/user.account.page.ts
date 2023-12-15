import { BasePage, ButtonElement, IButtonElement } from '../../../lib';
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

interface IUserAccountPageSendKeys {
  mainContent?: IMainContentFragmentSendKeys
}

interface IUserAccountPageClick {
  header?: IHeaderFragmentClick;
  mainContent?: IMainContentFragmentClick
}

interface IUserAccountPageGetData {
  mainContent?: IMainContentFragmentGetData
}

interface IUserAccountPageWaitForPageState {
  mainContent?: IMainContentFragmentIsVisible
}

interface IUserAccountPageResult {
  header: IHeaderFragmentResult;
  mainContent: IMainContentFragmentResult
}

interface IUserAccountPageIsVisible {
  header?: IHeaderFragmentIsVisible
  mainContent?: IMainContentFragmentIsVisible
}

export interface IUserAccountPage {
  sendKeys(data: IUserAccountPageSendKeys): Promise<void>;
  clickOn(data: IUserAccountPageClick): Promise<void>;
  getData(data: IUserAccountPageGetData): Promise<IUserAccountPageResult>;
  isVisible(data: IUserAccountPageIsVisible): Promise<IUserAccountPageResult>;
  waitForPageState(data: IUserAccountPageWaitForPageState): Promise<void>;
}

export class UserAccountPage extends BasePage implements IUserAccountPage {
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
