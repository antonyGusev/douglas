import {
  BaseFragment,
  BaseFragmentValues,
  IButtonElement,
  ButtonElement,
  ITextElement,
  IInputElement,
  TextElement,
  ISVGElement,
  InputElement,
  SVGElement,
} from '../../../../lib';

export interface IForgotPasswordWindowFragmentSendKeys {
  emailField?: string;
}

export interface IForgotPasswordWindowFragmentClick {
  closeCross?: null;
  closeButton?: null;
  submitButton?: null;
}

export interface IForgotPasswordWindowFragmentGetData {
  title?: null;
  subTitle?: null;
  emailField?: null;
  emailExclamationPoint?: null;
  emailRequiredAlert?: null;
  closeButton?: null;
  submitButton?: null;
}

export interface IForgotPasswordWindowFragmentResult {
  title?: string;
  subTitle?: string;
  emailField?: string;
  emailExclamationPoint?: string;
  emailRequiredAlert?: string;
  closeButton?: string;
  submitButton?: string;
}

export interface IForgotPasswordWindowFragmentIsVisible {
  title?: boolean;
  closeCross?: boolean;
  subTitle?: boolean;
  emailField?: boolean;
  emailExclamationPoint?: boolean;
  emailRequiredAlert?: boolean;
  closeButton?: boolean;
  submitButton?: boolean;
}

export interface IForgotPasswordWindowFragment {
  sendKeys(data: BaseFragmentValues): Promise<void>;
  clickOn(data: BaseFragmentValues): Promise<void>;
  getData(data: BaseFragmentValues): Promise<IForgotPasswordWindowFragmentResult>;
  isVisible(data: BaseFragmentValues): Promise<IForgotPasswordWindowFragmentIsVisible>;
}

export class ForgotPasswordWindowFragment extends BaseFragment implements IForgotPasswordWindowFragment {
  private title: ITextElement;
  private closeCross: IButtonElement;
  private subTitle: ITextElement;
  private emailField: IInputElement;
  private emailExclamationPoint: ISVGElement;
  private emailRequiredAlert: ITextElement;
  private closeButton: IButtonElement;
  private submitButton: IButtonElement;

  constructor(selector: string, name: string) {
    super(selector, name);

    this.title = this.initChild(TextElement, 'div.modal-header__title', 'Forgot Password Window Title');
    this.closeCross = this.initChild(ButtonElement, 'button.modal-header__close', 'Forgot Password Window Close Cross');
    this.subTitle = this.initChild(TextElement, 'div.modal-header__subtitle', 'Forgot Password Window Subtitle');
    this.emailField = this.initChild(InputElement, 'input[name="forgotPasswordEmail"]', 'Forgot Password Email Field');
    this.emailExclamationPoint = this.initChild(SVGElement, 'div.forgot-password__email svg', 'Email Exclamation Point');
    this.emailRequiredAlert = this.initChild(TextElement, 'div.input__error', 'Email Required Alert');
    this.closeButton = this.initChild(ButtonElement, 'button :text-is("Schliessen")', 'Forgot Password Window Close Button');
    this.submitButton = this.initChild(ButtonElement, 'button:has-text("absenden")', 'Forgot Password Window Submit Button');
  }
}
