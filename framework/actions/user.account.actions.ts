import { assert,  pwLogging } from '../../lib';
import { IUserAccountPage, UserAccountPage } from '../pages/user.account.page';

const userAccountPage: IUserAccountPage = new UserAccountPage();

export interface IUserAccountPageActions {
  logOut: () => Promise<void>;
  goTo: (destination: TDestinationLeftMenu, method: TGoToMethod) => Promise<void>;
  verifyPageTitle: (fullName: string) => Promise<void>
}

type TDestinationLeftMenu =
  | 'myDouglas'
  | 'myOrders'
  | 'myData'
  | 'myDeliveryAddresses'
  | 'myBeautyCard'
  | 'myMessages'
  | 'myBeautyProfie'
  | 'myReviews';

enum GO_TO_METHOD {
  usingLeftMenu = 'accountLeftMenu',
  usingDropdown = 'accountButtonDropdown'
}

type TGoToMethod = Partial<keyof typeof GO_TO_METHOD>;

export class UserAccountPageActions implements IUserAccountPageActions{
  constructor() {}

  @pwLogging
  async logOut() {
    await userAccountPage.clickOn({ header: { accountButtonDropdown: { logOut: null } } });
  }

  @pwLogging
  async goTo(destination: TDestinationLeftMenu, method: TGoToMethod) {
    if (method === 'usingLeftMenu') {
      await userAccountPage.clickOn({ mainContent: { accountLeftMenu: { [destination]: null } } });
    } else {
      await userAccountPage.clickOn({ header: { accountButtonDropdown: { [destination]: null } } });
    }
  }

  /**
   *
   *     Assertion methods
   */

  @pwLogging
  async verifyPageTitle(fullName: string) {
    const {
      mainContent: { pageTitle },
    } = await userAccountPage.getData({ mainContent: { pageTitle: null } });

    assert(pageTitle).isEqual(`Hallo ${fullName},`);
  }
}
