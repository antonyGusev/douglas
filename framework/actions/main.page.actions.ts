import { assert, browser, pwLogging } from '../../lib';
import { allCookies, requiredCookies } from '../../test.data';
import { IMainPage, MainPage } from '../pages/main.page';

const {COOKIE_SET_TIMOUT} = process.env

const mainPage: IMainPage = new MainPage();

export interface IMainPageActions {
  selectCookies: (cookies: TCookies) => Promise<void>;
  goToLoginPage: () => Promise<void>;
  shouldBeAuthorizedAs: (name: string) => Promise<void>;
  verifyCookiesIs: (cookies: TCookies) => Promise<void>;
  shouldBeRemembered: (optionToStay: TOptionToStay) => Promise<void>;
}

type TCookies = 'All' | 'Required';
type TOptionToStay = 'true' | 'false';

const remeberMeToBool = (str: string | undefined) => (str === 'true' ? true : false);

export class MainPageActions implements IMainPageActions {
  constructor() {}

  @pwLogging
  async goToLoginPage() {
    await mainPage.clickOn({ header: { accountButton: null } });
  }

  @pwLogging
  async selectCookies(cookies: TCookies) {
    if (cookies === 'All') {
      await mainPage.clickOn({ dialogWindow: { allowAll: null } });
    } else {
      await mainPage.clickOn({ dialogWindow: { strictlyRequired: null } });
    }
  }

  /**
   *
   *     Assertion methods
   */

  @pwLogging
  async verifyCookiesIs(cookies: TCookies) {
    /**
     *  Need to sleep to wait until cookies will be set.
     *  Running in parallel mode increase this value in .env file to avoid flakynes.
     */
    if (cookies === 'All') {
      const sleepTime = () => COOKIE_SET_TIMOUT ? +COOKIE_SET_TIMOUT : 2500;
      
      await browser.sleep(sleepTime());
    }

    const cookie = await browser.getCoockies();

    if (cookies === 'All') {
      assert(cookie.map((coo) => coo.name)).stringArraysEqual(allCookies);
    } else {
      assert(cookie.map((coo) => coo.name)).stringArraysEqual(requiredCookies);
    }
  }

  @pwLogging
  async shouldBeAuthorizedAs(name: string) {
    const {
      header: { searchField },
    } = await mainPage.getData({ header: { searchField: 'placeholder' } });
    const {
      header: { accountStatusIcon },
    } = await mainPage.isVisible({ header: { accountStatusIcon: true } });

    assert(searchField).stringContains(name);
    assert(accountStatusIcon).isTrue;
  }

  @pwLogging
  async shouldBeRemembered(optionToStay: TOptionToStay) {
    /** Need to sleep to wait until cookies will be set */
    await browser.sleep(1000);

    const { origins } = await browser.getLocalStorage();
    const origin = origins.find((entity) => entity.origin === 'https://www.douglas.de.');
    const isRemembered = origin?.localStorage.find((entity) => entity.name === 'rememberMe');

    /**
     *  When user should not be remembered, "rememberMe" option returns undefined
     */
    const isRememberedValue = (value: string | undefined) => value ? value : 'false';
    const value = isRememberedValue(isRemembered?.value);

    assert(value).isEqual(optionToStay);
  }
}
