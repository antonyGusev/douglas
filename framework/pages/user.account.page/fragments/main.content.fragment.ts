import {
  BaseFragment,
  ITextElement,
  IULElement,
  TextElement,
  ULElement,
} from '../../../../lib';

export type TAccountLeftMenu = {
  myDouglas?: null
  myOrders?: null
  myData?: null
  myDeliveryAddresses?: null
  myBeautyCard?: null
  myMessages?: null
  myBeautyProfie?: null
  myReviews?: null
}

type TAccountLeftMenuResult = {
  myDouglas: string | boolean;
  myOrders: string | boolean;
  myData: string | boolean;
  myDeliveryAddresses: string | boolean;
  myBeautyCard: string | boolean;
  myMessages: string | boolean;
  myBeautyProfie: string | boolean;
  myReviews: string | boolean;
}

export interface IMainContentFragmentSendKeys {
  
}

export interface IMainContentFragmentClick {
  accountLeftMenu?: TAccountLeftMenu
}

export interface IMainContentFragmentGetData {
  pageTitle?: null;
  pageDescription?: null;
  accountLeftMenu?: TAccountLeftMenu
}

export interface IMainContentFragmentIsVisible {
  pageTitle?: boolean;
  pageDescription?: boolean;
  accountLeftMenu?: boolean;
}

export interface IMainContentFragmentResult {
  pageTitle: boolean | string;
  pageDescription: boolean | string;
  accountLeftMenu: TAccountLeftMenuResult
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
  private accountLeftMenu: IULElement

  constructor(selector: string, name: string) {
    super(selector, name);

    this.pageTitle = this.initChild(TextElement, 'div.account-overview h2', 'Account Page Title');
    this.pageDescription = this.initChild(TextElement, 'div.account-overview-head', 'Account Page Description');
    this.accountLeftMenu = this.initChild(ULElement, 'div[class*="menu-column"]', 'Account Left Navigation Menu');
  }
}
