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

interface IChangePasswordPageSendKeys {
  mainContent?: IMainContentFragmentSendKeys
}

interface IChangePasswordPageClick {
  header?: IHeaderFragmentClick;
  mainContent?: IMainContentFragmentClick
}

interface IChangePasswordPageGetData {
  mainContent?: IMainContentFragmentGetData
}

interface IChangePasswordPageWaitForPageState {
  mainContent?: IMainContentFragmentIsVisible
}

interface IChangePasswordPageResult {
  header: IHeaderFragmentResult;
  mainContent: IMainContentFragmentResult
}

interface IChangePasswordPageIsVisible {
  header?: IHeaderFragmentIsVisible
  mainContent?: IMainContentFragmentIsVisible
}

export interface IChangePasswordPage {
  sendKeys(data: IChangePasswordPageSendKeys): Promise<void>;
  clickOn(data: IChangePasswordPageClick): Promise<void>;
  getData(data: IChangePasswordPageGetData): Promise<IChangePasswordPageResult>;
  isVisible(data: IChangePasswordPageIsVisible): Promise<IChangePasswordPageResult>;
  waitForLoaded(data?: StateType): Promise<void>;
  waitForPageState(data: IChangePasswordPageWaitForPageState): Promise<void>;
}

export class ChangePasswordPage extends BasePage implements IChangePasswordPage {
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
