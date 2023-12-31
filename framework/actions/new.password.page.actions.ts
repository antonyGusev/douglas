import { ITestInfo, pwLogging } from '../../lib';
import { TPassword } from '../../test.data';
import { INewPasswordPage, NewPasswordPage } from '../pages/new.password.page';
import { BaseActions } from './base.actions';

const newPasswordPage: INewPasswordPage = new NewPasswordPage();

export interface INewPasswordPageActions {
  selectCookies: (cookies: TCookies) => Promise<void>;
  setUpNewPassword: (password: TPassword) => Promise<void>;
}

type TCookies = 'All' | 'Required';

export class NewPasswordPageActions extends BaseActions implements INewPasswordPageActions {
  
  constructor(testInfo: ITestInfo) {
    super(testInfo);
  }

  @pwLogging
  async selectCookies(cookies: TCookies) {
    if (cookies === 'All') {
      await newPasswordPage.waitForPageState({ dialogWindow: { allowAll: true } });
      await newPasswordPage.clickOn({ dialogWindow: { allowAll: null } });
    } else {
      await newPasswordPage.waitForPageState({ dialogWindow: { strictlyRequired: true } });
      await newPasswordPage.clickOn({ dialogWindow: { strictlyRequired: null } });
    }
  }

  @pwLogging
  async setUpNewPassword(password: TPassword) {
    await newPasswordPage.sendKeys({ mainContent: { passwordField: password } });
    await newPasswordPage.clickOn({ mainContent: { savePasswordButton: null } });
  }
}
