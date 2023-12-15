import {
  BaseFragment,
  BaseFragmentValues,
  IButtonElement,
  ButtonElement,
  IInputElement,
  InputElement,
  ISVGElement,
  SVGElement,
  IDivDropdownElement,
  DivDropdownElement,
} from '../../../../lib';

export interface IHeaderFragmentSendKeys {}

export type TAccountButtonDropdown = {
  myDouglas?: null
  myOrders?: null
  myData?: null
  myDeliveryAddresses?: null
  myBeautyCard?: null
  myMessages?: null
  myBeautyProfie?: null
  myReviews?: null
  logOut?: null
}

export interface IHeaderFragmentClick {
  accountButton?: null;
  accountButtonDropdown?: TAccountButtonDropdown
}

export interface IHeaderFragmentGetData {
  searchField?: null | 'placeholder';
  accountButton?: null;
}

export interface IHeaderFragmentResult {
  searchField: string;
  accountButton: any;
  accountStatusIcon: boolean;
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
  private accountButtonDropdown: IDivDropdownElement

  constructor(selector: string, name: string) {
    super(selector, name);

    this.searchField = this.initChild(InputElement, 'input#typeAhead-input', 'Search field');
    this.accountButton = this.initChild(ButtonElement, 'button[class*="account"]', 'Account Button');
    this.accountStatusIcon = this.initChild(SVGElement, 'svg.account-flyout__status', 'Account Status Icon');
    this.accountButtonDropdown = this.initChild(DivDropdownElement, 'div.account-flyout__content', 'Account Button Dropdown')
  }
}
