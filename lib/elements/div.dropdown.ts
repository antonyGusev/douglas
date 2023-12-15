import { TAccountButtonDropdown } from '../../framework/pages/user.account.page/fragments';
import { BaseElement } from '../base.elements';
import { logger } from '../helpers';
import { pwLogging } from '../reporter';

export interface IDivDropdownGetData {
  displayedText?: boolean;
}

export interface IDivDropdownElement {
  clickOn(data: Record<string, null>): Promise<void>;
}

const accountButtonSelector = 'button.account-flyout__button--main';
const logOutButtonSelector = 'button[class*="logout"]';

enum ACCOUNT_DROPDOWN_OPTIONS {
  myDouglas = '/de/account',
  myOrders = '/de/account/orders',
  myData = '/de/account/data',
  myDeliveryAddresses = '/de/account/addresses',
  myBeautyCard = '/de/account/beauty-card',
  myMessages = '/de/account/notifications',
  myBeautyProfie = '/de/account/beauty-profile',
  myReviews = '/de/account/reviews',
  logOut = 'logOut',
}

type TDropDownOpts = Partial<keyof typeof ACCOUNT_DROPDOWN_OPTIONS>;

export class DivDropdownElement extends BaseElement implements IDivDropdownElement {
  constructor(selector: string, name: string) {
    super(selector, name);
  }

  @pwLogging
  async clickOn(data: Record<string, null>) {
    if (this._name === 'Account Button Dropdown') {
      await this.page!.locator(accountButtonSelector).hover();

      const currentElement = this.currentElement ?? (await this.initElement()).currentElement;
      await currentElement.waitFor({ state: 'visible' });
      await this.clickOption(data);
    }

    await this.page!.waitForLoadState('networkidle');
  }

  /**
   *
   * @private_service_methods
   */

  private async clickOption(data: TAccountButtonDropdown) {
    const optionToSelect = Object.keys(data)[0] as unknown as TDropDownOpts;
    logger.technical(`${this._name} element selector: ${this._selector} clicking: ${optionToSelect}`);

    if (optionToSelect === ACCOUNT_DROPDOWN_OPTIONS.logOut) {
      await this.currentElement!.locator(logOutButtonSelector).click();
    } else {
      const optionElems = await this.currentElement!.getByRole('link').all();

      for (const elemOpt of optionElems) {
        const linkValue = await elemOpt.getAttribute('href');

        if (linkValue === ACCOUNT_DROPDOWN_OPTIONS[optionToSelect]) {
          await elemOpt.click();
        }
      }
    }

    logger.technical(`${this._name} element selector: ${this._selector} was successfully clicked: ${optionToSelect}`);
  }
}
