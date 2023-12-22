import { ITestInfo, pwLogging } from '../../lib';
import { TPassword } from '../../test.data';
import { ChangePasswordPage, IChangePasswordPage } from '../pages/change.password.page';
import { BaseActions } from './base.actions';

const changePasswordPage: IChangePasswordPage = new ChangePasswordPage();

export interface IChangePasswordPageActions {
  setUpNewPassword: (currentPass: TPassword, newPass: TPassword) => Promise<void>;
}

export class ChangePasswordPageActions extends BaseActions implements IChangePasswordPageActions {
  
  constructor(testInfo: ITestInfo) {
    super(testInfo);
  }

  @pwLogging
  async setUpNewPassword(currentPass: TPassword, newPass: TPassword) {
    await changePasswordPage.sendKeys({ mainContent: { currentPasswordField: currentPass } });
    await changePasswordPage.sendKeys({ mainContent: { newPasswordField: newPass } });
    await changePasswordPage.clickOn({ mainContent: { saveChangesButton: null } });
  }
}
