import { BaseFragment, ButtonElement, IButtonElement, IInputElement, ITextElement, InputElement, TextElement } from '../../../../lib';

export interface IMainContentFragmentSendKeys {
  currentPasswordField?: string;
  newPasswordField?: string;
}

export interface IMainContentFragmentClick {
  showCurrentPasswordButton?: null;
  showNewPasswordButton?: null;
  saveChangesButton?: null;
  backToMyDataButton?: null;
}

export interface IMainContentFragmentGetData {
  pageTitle?: null;
  currentPasswordField?: null;
  showCurrentPasswordButton?: null;
  newPasswordField?: null;
  showNewPasswordButton?: null;
  passwordHints?: null;
  saveChangesButton?: null;
  backToMyDataButton?: null;
}

export interface IMainContentFragmentIsVisible {
  pageTitle?: boolean;
  currentPasswordField?: boolean;
  showCurrentPasswordButton?: boolean;
  newPasswordField?: boolean;
  showNewPasswordButton?: boolean;
  passwordHints?: boolean;
  saveChangesButton?: boolean;
  backToMyDataButton?: boolean;
}

export interface IMainContentFragmentResult {
  pageTitle: boolean | string;
  currentPasswordField: boolean | string;
  showCurrentPasswordButton: boolean | string;
  newPasswordField: boolean | string;
  showNewPasswordButton: boolean | string;
  passwordHints: boolean | string;
  saveChangesButton: boolean | string;
  backToMyDataButton: boolean | string;
}

export interface IMainContentFragment {
  sendKeys(data: IMainContentFragmentSendKeys): Promise<void>;
  clickOn(data: IMainContentFragmentClick): Promise<void>;
  getData(data: IMainContentFragmentGetData): Promise<IMainContentFragmentResult>;
  isVisible(data: IMainContentFragmentIsVisible): Promise<IMainContentFragmentResult>;
}

export class MainContentFragment extends BaseFragment implements IMainContentFragment {
  private pageTitle: ITextElement;
  private currentPasswordField: IInputElement;
  private showCurrentPasswordButton: IButtonElement;
  private newPasswordField: IInputElement;
  private showNewPasswordButton: IButtonElement;
  private passwordHints: ITextElement;
  private saveChangesButton: IButtonElement;
  private backToMyDataButton: IButtonElement;

  constructor(selector: string, name: string) {
    super(selector, name);

    this.pageTitle = this.initChild(TextElement, 'div.change-password h2', 'Change Password Page Title');
    this.currentPasswordField = this.initChild(InputElement, 'div[class$="current"] input', 'Current Password Field');
    this.showCurrentPasswordButton = this.initChild(ButtonElement, 'div[class$="current"] button', 'Show Current Password Button');
    this.newPasswordField = this.initChild(InputElement, 'div[class$="new"] input', 'New Password Field');
    this.showNewPasswordButton = this.initChild(ButtonElement, 'div[class$="new"] button', 'Show New Password Button');
    this.passwordHints = this.initChild(TextElement, 'span.input__hint', 'Password Hints');
    this.saveChangesButton = this.initChild(ButtonElement, 'button[class$="submit"]', 'Save Changes Button');
    this.backToMyDataButton = this.initChild(ButtonElement, 'a[class*="back"]', 'Back To My Data Button');
  }
}
