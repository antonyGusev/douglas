import { BaseFragment } from '../../../../lib';
import {
  ILoginFormComponent,
  ILoginFormComponentClick,
  ILoginFormComponentGetData,
  ILoginFormComponentIsVisible,
  ILoginFormComponentResult,
  ILoginFormComponentSendKeys,
  LoginFormComponent,
} from './components';

export interface IMainContentFragmentSendKeys {
  loginForm?: ILoginFormComponentSendKeys;
}

export interface IMainContentFragmentClick {
  loginForm?: ILoginFormComponentClick;
}

export interface IMainContentFragmentGetData {
  loginForm?: ILoginFormComponentGetData;
}

export interface IMainContentFragmentIsVisible {
  loginForm?: ILoginFormComponentIsVisible | ILoginFormComponentGetData
}

export interface IMainContentFragmentResult {
  loginForm: ILoginFormComponentResult
}

export interface IMainContentFragment {
  sendKeys(data: IMainContentFragmentSendKeys): Promise<void>;
  clickOn(data: IMainContentFragmentClick): Promise<void>;
  getData(data: IMainContentFragmentGetData): Promise<IMainContentFragmentResult>;
  isVisible(data: IMainContentFragmentIsVisible): Promise<IMainContentFragmentResult>;
}

export class MainContentFragment extends BaseFragment implements IMainContentFragment {
  private loginForm: ILoginFormComponent;
  // private registrationForm: IRegistrationFormComponent

  constructor(selector: string, name: string) {
    super(selector, name);

    this.loginForm = this.initChild(LoginFormComponent, 'div[class$="--login"]', 'Login Form');
    // this.registrationForm = this.initChild(RegistrationFormComponent, 'div[class$="--register"]', 'Registration Form');
  }
}
