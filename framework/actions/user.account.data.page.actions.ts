import { assert, pwLogging } from '../../lib';
import { IUserAccountDataPage, UserAccountDataPage } from '../pages/user.account.data.page.ts';

const userAccountDataPage: IUserAccountDataPage = new UserAccountDataPage();

export interface IUserAccountDataPageActions {
  goToEdit: (option: TOptToEdit) => Promise<void>;
  verifyPageTitle: () => Promise<void>
}

enum OPTIONS_TO_EDIT {
  password = 'editPasswordButton'
}
type TOptToEdit = Partial<keyof typeof OPTIONS_TO_EDIT>

export class UserAccountDataPageActions implements IUserAccountDataPageActions {
  constructor() {}

  @pwLogging
  async goToEdit(option: TOptToEdit) {
    await userAccountDataPage.clickOn({mainContent: {[OPTIONS_TO_EDIT[option]]: null}})
  }

  /**
   *
   *     Assertion methods
   */

  @pwLogging
  async verifyPageTitle() {
    await userAccountDataPage.waitForLoaded('domcontentloaded')
    const {mainContent: {pageTitle}} = await userAccountDataPage.getData({mainContent: {pageTitle: null}})

    assert(pageTitle).isEqual('Meine Daten')
  }
}
