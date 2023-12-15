import {
  BaseFragment,
  BaseFragmentValues,
  IButtonElement,
  ButtonElement,
  IInputElement,
  InputElement,
  ISVGElement,
  SVGElement,
} from '../../../../lib';

export interface IHeaderFragmentSendKeys {}

export interface IHeaderFragmentClick {
  accountButton?: null;
}

export interface IHeaderFragmentGetData {
  searchField?: null | 'placeholder';
  accountButton?: null;
}

export interface IHeaderFragmentResult {
  searchField?: string;
  accountButton?: any;
  accountStatusIcon?: boolean;
}

export interface IHeaderFragmentIsVisible {
  accountStatusIcon?: boolean;
}

export interface IHeaderFragment {
  sendKeys(data: BaseFragmentValues): Promise<void>;
  clickOn(data: BaseFragmentValues): Promise<void>;
  getData(data: BaseFragmentValues): Promise<IHeaderFragmentResult>;
  isVisible(data: BaseFragmentValues): Promise<IHeaderFragmentIsVisible>;
}

export class HeaderFragment extends BaseFragment implements IHeaderFragment {
  private accountButton: IButtonElement;
  private searchField: IInputElement;
  private accountStatusIcon: ISVGElement;

  constructor(selector: string, name: string) {
    super(selector, name);

    this.searchField = this.initChild(InputElement, 'input#typeAhead-input', 'Search field');
    this.accountButton = this.initChild(ButtonElement, 'button[class*="account"]', 'Account Button');
    this.accountStatusIcon = this.initChild(SVGElement, 'svg.account-flyout__status', 'Account Status Icon');
  }
}
