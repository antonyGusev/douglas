import {
  BaseFragment,
  ButtonElement,
  IButtonElement,
  IInputElement,
  ISVGElement,
  ITextElement,
  InputElement,
  SVGElement,
  TextElement,
} from '../../../../lib';

export interface IMainContentFragmentSendKeys {
  passwordField?: string;
}

export interface IMainContentFragmentClick {
  showPasswordButton?: null;
  savePasswordButton?: null;
}

export interface IMainContentFragmentGetData {
  pageTitle?: null;
  pageDescription?: null;
  preDefinedEmail?: null;
  checkedIcon?: null;
  passwordField?: null;
  showPasswordButton?: null;
  passwordHints?: null;
  savePasswordButton?: null;
}

export interface IMainContentFragmentIsVisible {
  pageTitle?: boolean;
  pageDescription?: boolean;
  preDefinedEmail?: boolean;
  checkedIcon?: boolean;
  passwordField?: boolean;
  showPasswordButton?: boolean;
  passwordHints?: boolean;
  savePasswordButton?: boolean;
}

export interface IMainContentFragmentResult {
  pageTitle?: boolean | string | string;
  pageDescription?: boolean | string;
  preDefinedEmail?: boolean | string;
  checkedIcon?: boolean | string;
  passwordField?: boolean | string;
  showPasswordButton?: boolean | string;
  passwordHints?: boolean | string;
  savePasswordButton?: boolean | string;
}

export interface IMainContentFragment {
  sendKeys(data: IMainContentFragmentSendKeys): Promise<void>;
  clickOn(data: IMainContentFragmentClick): Promise<void>;
  getData(data: IMainContentFragmentGetData): Promise<IMainContentFragmentResult>;
  isVisible(data: IMainContentFragmentIsVisible): Promise<IMainContentFragmentResult>;
}

export class MainContentFragment extends BaseFragment implements IMainContentFragment {
  private pageTitle: ITextElement;
  private pageDescription: ITextElement;
  private preDefinedEmail: ITextElement;
  private checkedIcon: ISVGElement;
  private passwordField: IInputElement;
  private showPasswordButton: IButtonElement;
  private passwordHints: ITextElement;
  private savePasswordButton: IButtonElement;

  constructor(selector: string, name: string) {
    super(selector, name);

    this.pageTitle = this.initChild(TextElement, 'h2.headline-bold', 'New Password Page Title');
    this.pageDescription = this.initChild(TextElement, 'span.[class$="description"]', 'New Password Page Description');
    this.preDefinedEmail = this.initChild(TextElement, 'div.new-password__email', 'Predefined Email Field');
    this.checkedIcon = this.initChild(SVGElement, 'div.new-password__email svg', 'Checked Email Icon');
    this.passwordField = this.initChild(InputElement, 'input[name="newPassword"]', 'New Password Field');
    this.showPasswordButton = this.initChild(ButtonElement, 'button.input__element--right', 'Show Password Button');
    this.passwordHints = this.initChild(TextElement, 'span.input__hint', 'Password Input Hints');
    this.savePasswordButton = this.initChild(ButtonElement, 'button.new-password__button', 'Save Password Button');
  }
}
