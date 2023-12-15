import {
  BaseFragment,
  BaseFragmentValues,
  IButtonElement,
  ButtonElement,
  ITextElement,
  TextElement,
  ISVGElement,
  SVGElement,
} from '../../../../lib';

export interface IConfirmationWindowFragmentSendKeys {
}

export interface IConfirmationWindowFragmentClick {
  submitButton?: null;
}

export interface IConfirmationWindowFragmentGetData {
  icon?: null;
  titleHeading?: null;
  message?: null;
  submitButton?: null;
}

export interface IConfirmationWindowFragmentResult {
  icon?: string;
  titleHeading?: string;
  message?: string;
  submitButton?: string;
}

export interface IConfirmationWindowFragmentIsVisible {
  icon?: boolean;
  titleHeading?: boolean;
  message?: boolean;
  submitButton?: boolean;
}

export interface IConfirmationWindowFragment {
  sendKeys(data: BaseFragmentValues): Promise<void>;
  clickOn(data: BaseFragmentValues): Promise<void>;
  getData(data: BaseFragmentValues): Promise<IConfirmationWindowFragmentResult>;
  isVisible(data: BaseFragmentValues): Promise<IConfirmationWindowFragmentIsVisible>;
}

export class ConfirmationWindowFragment extends BaseFragment implements IConfirmationWindowFragment {
  private icon: ISVGElement;
  private titleHeading: ITextElement;
  private message: ITextElement;
  private submitButton: IButtonElement;

  constructor(selector: string, name: string) {
    super(selector, name);

    this.icon = this.initChild(SVGElement, 'div[class$="__confirmation"] svg', 'Confirmation Window Icon');
    this.titleHeading = this.initChild(TextElement, 'div[class$="__confirmation"] h2', 'Confirmation Window Heading Title');
    this.message = this.initChild(TextElement, 'div[class$="__messages"]', 'Confirmation Window Message');
    this.submitButton = this.initChild(ButtonElement, 'button:text("Schliessen")', 'Confirmation Button');
  }
}
