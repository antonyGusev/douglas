import {
  BaseFragment,
  BaseFragmentValues,
  IButtonElement,
  ButtonElement,
  IInputElement,
  InputElement,
  ITextElement,
  CheckBoxElement,
  ICheckBoxElement,
  TextElement,
  ISVGElement,
  SVGElement,
  TInputGetData,
} from '../../../../../lib';

export interface ILoginFormComponentSendKeys {
  emailField?: string;
  passwordField?: string;
}

export interface ILoginFormComponentClick {
  loginButton?: null;
  stayLoggedInCheckBox?: boolean;
  forgotPasswordButton?: null;
  showPasswordButton?: null;
}

export interface ILoginFormComponentGetData {
  detailsAlert?: null;
  detailsAlertIcon?: null;
  emailAlertHint?: null;
  passwordAlertHint?: null;
  passwordField?: TInputGetData;
}

export interface ILoginFormComponentResult {
  detailsAlert: string | boolean;
  detailsAlertIcon: string | boolean;
  emailAlertHint: string | boolean;
  passwordAlertHint: string | boolean;
  passwordField: string | boolean;
}

export interface ILoginFormComponentIsVisible {
  loginButton?: boolean;
  emailAlertHint?: boolean;
  passwordAlertHint?: boolean;
}

export interface ILoginFormComponent {
  sendKeys(data: BaseFragmentValues): Promise<void>;
  clickOn(data: BaseFragmentValues): Promise<void>;
  getData(data: BaseFragmentValues): Promise<ILoginFormComponentResult>;
  isVisible(data: BaseFragmentValues): Promise<ILoginFormComponentIsVisible>;
}

export class LoginFormComponent extends BaseFragment implements ILoginFormComponent {
  private detailsAlert: ITextElement;
  private detailsAlertIcon: ISVGElement;
  private emailField: IInputElement;
  private emailExclamationPoint: ISVGElement;
  private emailAlertHint: ITextElement;
  private passwordField: IInputElement;
  private showPasswordButton: IButtonElement;
  private passwordAlertHint: ITextElement;
  private stayLoggedInCheckBox: ICheckBoxElement;
  private forgotPasswordButton: IButtonElement;
  private loginButton: IButtonElement;

  constructor(selector: string, name: string) {
    super(selector, name);

    this.detailsAlert = this.initChild(TextElement, 'div[class*="login"] div.alert--error', 'Check Your Details Alert');
    this.detailsAlertIcon = this.initChild(SVGElement, 'div[class*="login"] div.alert--error svg', 'Alert Exclamation Point');
    this.emailField = this.initChild(InputElement, 'form.login input[name="email"]', 'Email field');
    this.emailExclamationPoint = this.initChild(SVGElement, 'div.login__email svg', 'Email Exclamation Point');
    this.emailAlertHint = this.initChild(TextElement, 'div.login__email div.input__error', 'Email Required Alert');
    this.passwordField = this.initChild(InputElement, 'form.login input[name="password"]', 'Password field');
    this.showPasswordButton = this.initChild(ButtonElement, 'div.login__password button', 'Show Password Button');
    this.passwordAlertHint = this.initChild(TextElement, 'div.login__password div.input__error', 'Password Required Alert');
    this.stayLoggedInCheckBox = this.initChild(CheckBoxElement, 'input#remember-me', 'Stay Logged In Checkbox');
    this.forgotPasswordButton = this.initChild(ButtonElement, 'div.login__link', 'Forgot Password Button');
    this.loginButton = this.initChild(ButtonElement, 'button.login__button', 'Login Button');
  }
}
