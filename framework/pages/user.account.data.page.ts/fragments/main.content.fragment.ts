import {
  BaseFragment,
  ButtonElement,
  IButtonElement,
  ITextElement,
  TextElement,
} from '../../../../lib';

export interface IMainContentFragmentSendKeys {
  
}

export interface IMainContentFragmentClick {
  editPasswordButton?: null;
}

export interface IMainContentFragmentGetData {
  pageTitle?: null;
  pageDescription?: null;
  passwordSection?: null;
  editPasswordButton?: null;
}

export interface IMainContentFragmentIsVisible {
  pageTitle?: boolean;
  pageDescription?: boolean;
  passwordSection?: boolean;
  editPasswordButton?: boolean;
}

export interface IMainContentFragmentResult {
  pageTitle: boolean | string;
  pageDescription: boolean | string;
  passwordSection: boolean | string;
  editPasswordButton: boolean | string;
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
  private passwordSection: ITextElement;
  private editPasswordButton: IButtonElement;

  constructor(selector: string, name: string) {
    super(selector, name);

    this.pageTitle = this.initChild(TextElement, 'h2:text("Meine Daten")', 'Account Data Page Title');
    this.pageDescription = this.initChild(TextElement, 'div[class$="description"]', 'Account Data Page Description');
    this.passwordSection = this.initChild(TextElement, '//div[@class="account-data__info"]', 'Password Section');
    this.editPasswordButton = this.initChild(ButtonElement, 'a[href$="password"]', 'Edit Password Button')
  }
}
