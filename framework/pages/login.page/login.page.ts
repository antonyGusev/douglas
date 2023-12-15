import { BasePage, ButtonElement, IButtonElement, StateType } from '../../../lib';
import {
  HeaderFragment,
  IHeaderFragment,
  IHeaderFragmentClick,
  IHeaderFragmentGetData,
  IHeaderFragmentIsVisible,
  IHeaderFragmentResult,
  IMainContentFragment,
  IMainContentFragmentClick,
  IMainContentFragmentGetData,
  IMainContentFragmentIsVisible,
  IMainContentFragmentResult,
  IMainContentFragmentSendKeys,
  MainContentFragment,
  ForgotPasswordWindowFragment,
  IForgotPasswordWindowFragment,
  IForgotPasswordWindowFragmentClick,
  IForgotPasswordWindowFragmentSendKeys,
  IForgotPasswordWindowFragmentGetData,
  IForgotPasswordWindowFragmentIsVisible,
  IForgotPasswordWindowFragmentResult,
  IConfirmationWindowFragment,
  ConfirmationWindowFragment,
  IConfirmationWindowFragmentClick,
  IConfirmationWindowFragmentGetData,
  IConfirmationWindowFragmentIsVisible,
  IConfirmationWindowFragmentResult,
} from './fragments';

interface ILoginPageSendKeys {
  mainContent?: IMainContentFragmentSendKeys;
  forgotPasswordWindow?: IForgotPasswordWindowFragmentSendKeys
}

interface ILoginPageClick {
  header?: IHeaderFragmentClick;
  mainContent?: IMainContentFragmentClick;
  forgotPasswordWindow?: IForgotPasswordWindowFragmentClick
  confirmWindow?: IConfirmationWindowFragmentClick
  scrollToTopButton?: null;
}

interface ILoginPageGetData {
  header?: IHeaderFragmentGetData;
  mainContent?: IMainContentFragmentGetData;
  forgotPasswordWindow?: IForgotPasswordWindowFragmentGetData
  confirmWindow?: IConfirmationWindowFragmentGetData
}

interface ILoginPageIsVisible {
  header?: IHeaderFragmentIsVisible;
  mainContent?: IMainContentFragmentIsVisible;
  forgotPasswordWindow?: IForgotPasswordWindowFragmentIsVisible
  confirmWindow?: IConfirmationWindowFragmentIsVisible
}

interface ILoginPageWaitForPageState {
  header?: IHeaderFragmentIsVisible | IHeaderFragmentGetData;
  mainContent?: IMainContentFragmentIsVisible | IMainContentFragmentGetData;
  forgotPasswordWindow?: IForgotPasswordWindowFragmentIsVisible | IForgotPasswordWindowFragmentGetData
  confirmWindow?: IConfirmationWindowFragmentIsVisible | IConfirmationWindowFragmentGetData
}

interface ILoginPageResult {
  header: IHeaderFragmentResult;
  mainContent: IMainContentFragmentResult;
  forgotPasswordWindow?: IForgotPasswordWindowFragmentResult
  confirmWindow?: IConfirmationWindowFragmentResult
}

export interface ILoginPage {
  sendKeys(data: ILoginPageSendKeys): Promise<void>;
  clickOn(data: ILoginPageClick): Promise<void>;
  getData(data: ILoginPageGetData): Promise<ILoginPageResult>;
  isVisible(data: ILoginPageIsVisible): Promise<ILoginPageResult>;
  waitForLoaded(data?: StateType): Promise<void>;
  waitForPageState(data: ILoginPageWaitForPageState): Promise<void>;
}

export class LoginPage extends BasePage implements ILoginPage {
  private header: IHeaderFragment;
  private mainContent: IMainContentFragment;
  // private footer: TFooterFragment;
  private forgotPasswordWindow: IForgotPasswordWindowFragment;
  private confirmWindow: IConfirmationWindowFragment
  private scrollToTopButton: IButtonElement;

  constructor() {
    super('body', 'Login page');
    this.header = this.initChild(HeaderFragment, 'header.header', 'Header Component');
    this.mainContent = this.initChild(MainContentFragment, 'main.content', 'Main Content Component');
    // this.footer = this.initChild(FooterFragment, 'footer.footer', 'Footer Component');
    this.forgotPasswordWindow = this.initChild(ForgotPasswordWindowFragment, 'div.forgot-password', 'Forgot Password Window');
    this.confirmWindow = this.initChild(ConfirmationWindowFragment, 'div.forgot-password__confirmation', 'Confirmation Window')
    this.scrollToTopButton = this.initChild(ButtonElement, 'button.scroll-to-top-button svg', 'Scroll To Top Button');
  }
}
