import {
  BaseFragment,
  BaseFragmentValues,
  IButtonElement,
  ButtonElement,
} from '../../../../lib';

export interface IDialogWindowFragmentSendKeys {}

export interface IDialogWindowFragmentClick {
  strictlyRequired?: null;
  moreInformation?: null;
  allowAll?: null;
  allowSelection?: null;
}

export interface IDialogWindowFragmentGetData {}

export interface IDialogWindowFragmentResult {}

export interface IDialogWindowFragmentIsVisible {
  strictlyRequired?: boolean;
  moreInformation?: boolean;
  allowAll?: boolean;
  allowSelection?: boolean;
}

export interface IDialogWindowFragment {
  sendKeys(data: BaseFragmentValues): Promise<void>;
  clickOn(data: BaseFragmentValues): Promise<void>;
  getData(data: BaseFragmentValues): Promise<IDialogWindowFragmentResult>;
  isVisible(data: BaseFragmentValues): Promise<IDialogWindowFragmentIsVisible>;
};

export class DialogWindowFragment extends BaseFragment implements IDialogWindowFragment {
  private strictlyRequired: IButtonElement;
  private moreInformation: IButtonElement;
  private allowAll: IButtonElement;
  private allowSelection: IButtonElement;

  constructor(selector: string, name: string) {
    super(selector, name);

    this.strictlyRequired = this.initChild(ButtonElement, 'button[class$="deny-all"]', 'Only Strictly Required');
    this.moreInformation = this.initChild(ButtonElement, 'button[class$="more-information"]', 'More Information')
    this.allowAll = this.initChild(ButtonElement, 'button[class$="accept-all"]', 'Account Button');
    this.allowSelection = this.initChild(ButtonElement, 'button[class$="__save-settings"]', 'Allow Selection');
  }
}
