import { pwLogging } from '../../lib';
import { TPassword } from '../../test.data';
import { ChangePasswordPage, IChangePasswordPage } from '../pages/change.password.page';

const changePasswordPage: IChangePasswordPage = new ChangePasswordPage();

export interface IChangePasswordPageActions {
  setUpNewPassword: (currentPass: TPassword, newPass: TPassword) => Promise<void>;
}

export class ChangePasswordPageActions {
  constructor() {}

  @pwLogging
  async setUpNewPassword(currentPass: TPassword, newPass: TPassword) {
    await changePasswordPage.sendKeys({ mainContent: { currentPasswordField: currentPass } });
    await changePasswordPage.sendKeys({ mainContent: { newPasswordField: newPass } });
    await changePasswordPage.clickOn({ mainContent: { saveChangesButton: null } });
  }
}
