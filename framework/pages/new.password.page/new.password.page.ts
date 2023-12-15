import { BasePage } from '../../../lib';
import {
  DialogWindowFragment,
  IDialogWindowFragment,
  IDialogWindowFragmentClick,
  IDialogWindowFragmentSendKeys,
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
  IDialogWindowFragmentIsVisible,
} from './fragments';

interface INewPasswordPageSendKeys {
  mainContent?: IMainContentFragmentSendKeys
  dialogWindow?: IDialogWindowFragmentSendKeys
}

interface INewPasswordPageClick {
  header?: IHeaderFragmentClick;
  mainContent?: IMainContentFragmentClick
  dialogWindow?: IDialogWindowFragmentClick
}

interface INewPasswordPageGetData {
  mainContent?: IMainContentFragmentGetData
}

interface INewPasswordPageWaitForPageState {
  mainContent?: IMainContentFragmentIsVisible
  dialogWindow?: IDialogWindowFragmentIsVisible | boolean
}

interface INewPasswordPageResult {
  header: IHeaderFragmentResult;
  mainContent?: IMainContentFragmentResult
}

interface INewPasswordPageIsVisible {
  header?: IHeaderFragmentIsVisible
  mainContent?: IMainContentFragmentIsVisible
}

export interface INewPasswordPage {
  sendKeys(data: INewPasswordPageSendKeys): Promise<void>;
  clickOn(data: INewPasswordPageClick): Promise<void>;
  getData(data: INewPasswordPageGetData): Promise<INewPasswordPageResult>;
  isVisible(data: INewPasswordPageIsVisible): Promise<INewPasswordPageResult>;
  waitForPageState(data: INewPasswordPageWaitForPageState): Promise<void>;
}

export class NewPasswordPage extends BasePage implements INewPasswordPage {
  private header: IHeaderFragment;
  private mainContent: IMainContentFragment;
  // private footer: TFooterFragment;
  private dialogWindow: IDialogWindowFragment;

  constructor() {
    super('body', 'Main Douglas page');
    this.header = this.initChild(HeaderFragment, 'header.header', 'Header Fragment');
    this.mainContent = this.initChild(MainContentFragment, 'main.content', 'Main Content Fragment');
    // this.footer = this.initChild(FooterFragment, 'footer.footer', 'Footer Fragment');
    this.dialogWindow = this.initChild(DialogWindowFragment, 'div[role="dialog"]', 'Privacy Settings Dialog Window');
  }
}
