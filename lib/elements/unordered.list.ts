import { TAccountLeftMenu } from '../../framework/pages/user.account.page/fragments';
import { BaseElement, CanClick, CanGetData } from '../base.elements';
import { applyMixins, logger } from '../helpers';
import { pwLogging } from '../reporter';

enum ACCOUNT_LIST_OPTIONS {
  myDouglas = '/de/account',
  myOrders = '/de/account/orders',
  myData = '/de/account/data',
  myDeliveryAddresses = '/de/account/addresses',
  myBeautyCard = '/de/account/beauty-card',
  myMessages = '/de/account/notifications',
  myBeautyProfie = '/de/account/beauty-profile',
  myReviews = '/de/account/reviews',
}

type TListOpts = Partial<keyof typeof ACCOUNT_LIST_OPTIONS>;
type TListClick = TAccountLeftMenu;

export interface IULElement {
  clickOn(data: Record<string, null>): Promise<void>;
  getData(data: any): Promise<string>;
}

export interface ULElement extends CanGetData, CanClick {}

export class ULElement extends BaseElement implements IULElement {
  constructor(selector: string, name: string) {
    super(selector, name);
  }

  @pwLogging
  async clickOn(data: TListClick) {
    const optionToSelect = Object.keys(data)[0] as unknown as TListOpts;

    logger.technical(`${this._name} element selector: ${this._selector} clicking: ${optionToSelect}`);

    await this.clickOption(optionToSelect);
    await this.page!.waitForLoadState('networkidle');

    logger.technical(`${this._name} element selector: ${this._selector} was successfully clicked: ${optionToSelect}`);
  }

  /**
   *
   * @private_service_methods
   */

  private async clickOption(option: TListOpts) {
    const currentElement = this.currentElement ?? (await this.initElement()).currentElement;
    const optionElems = await currentElement.getByRole('link').all();

    for (const elemOpt of optionElems) {
      const linkValue = await elemOpt.getAttribute('href');

      if (linkValue === ACCOUNT_LIST_OPTIONS[option]) {
        await elemOpt.click();
      }
    }
  }
}

applyMixins(ULElement, [CanGetData, CanClick]);
