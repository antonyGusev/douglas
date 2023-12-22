import { FS, ITestInfo, assert, pwLogging } from '../../lib';
import { TEmail, TPassword } from '../../test.data';
import { ILoginPage, LoginPage } from '../pages/login.page';

import { getComparator } from 'playwright-core/lib/utils';
import { BaseActions } from './base.actions';

const {MAX_DIFF_PIX} = process.env

const comparator = getComparator('image/png');

const loginPage: ILoginPage = new LoginPage();

export interface ILoginPageActions {
  enterUserCredentials: ({ optionToStay, email, password }: TEnterUserCredsArgs) => Promise<void>;
  resetPasswordFor: (email: TEmail) => Promise<void>;
  unmaskPassword: () => Promise<void>;
  verifyErrorMessage: (msg: TErrorMsg) => Promise<void>;
  verifyHintsTexts: ({ hint, email, password }: TCheckHintsArgs) => Promise<void>;
  verifyHintsIsVisible: (isVisible: boolean) => Promise<void>;
  verifyPasswordValue: (value: TPasswordValue) => Promise<void>;
}

type TEmailHints = 'Ungültige E-Mail-Adresse' | '* Pflichtfeld';
type TPasswordHints = 'Dein Passwort muss mindestens 6 Zeichen enthalten.' | '* Pflichtfeld';
type TCheckHintsArgs = { hint: 'All' | 'Email' | 'Password'; email?: TEmailHints; password?: TPasswordHints };
type TEnterUserCredsArgs = { optionToStay?: 'stayLogged' | 'notStayLogged'; email?: TEmail; password?: TPassword };
type TErrorMsg = 'Falsche Zugangsdaten' | 'Bitte überprüfe deine Angaben';
type TPasswordValue = 'default' | 'unMasked';

export class LoginPageActions extends BaseActions implements ILoginPageActions {

  constructor(testInfo: ITestInfo) {
    super(testInfo);
  }

  /** Providing argument "optionToStay", this method uses for log in purpose.
   *  Not providing "optionToStay" argument, method uses for testing login form.
   */
  @pwLogging
  async enterUserCredentials({ optionToStay, email, password }: TEnterUserCredsArgs) {
    if (email && password) {
      await loginPage.sendKeys({ mainContent: { loginForm: { emailField: email } } });
      await loginPage.sendKeys({ mainContent: { loginForm: { passwordField: password } } });
    } else if (email) {
      await loginPage.sendKeys({ mainContent: { loginForm: { emailField: email } } });
    } else if (password) {
      await loginPage.sendKeys({ mainContent: { loginForm: { passwordField: password } } });
    }

    if (optionToStay === 'stayLogged') {
      await loginPage.clickOn({ mainContent: { loginForm: { stayLoggedInCheckBox: true } } });
    }

    await loginPage.clickOn({ mainContent: { loginForm: { loginButton: null } } });

    if (optionToStay !== undefined) {
      await loginPage.waitForPageState({ mainContent: { loginForm: { loginButton: false } } });
    }
  }

  @pwLogging
  async resetPasswordFor(email: TEmail) {
    await loginPage.clickOn({ mainContent: { loginForm: { forgotPasswordButton: null } } });
    await loginPage.waitForPageState({ forgotPasswordWindow: { title: true } });
    await loginPage.sendKeys({ forgotPasswordWindow: { emailField: email } });
    await loginPage.clickOn({ forgotPasswordWindow: { submitButton: null } });
    await loginPage.waitForPageState({ confirmWindow: { titleHeading: true } });
    await loginPage.clickOn({ confirmWindow: { submitButton: null } });
  }

  @pwLogging
  async unmaskPassword() {
    await loginPage.clickOn({ mainContent: { loginForm: { showPasswordButton: null } } });
  }

  /**
   *
   *     Assertion methods
   */

  @pwLogging
  async verifyErrorMessage(msg: TErrorMsg) {
    const saveDetailsAlertSVG = `${this.testInfo.outputDir}/detailsAlertIcon.png`;
    const saveEmailAlertSVG = `${this.testInfo.outputDir}/emailExclamationPoint.png`;

    const { mainContent } = await loginPage.getData({
      mainContent: {
        loginForm: {
          detailsAlert: null,
          detailsAlertIcon: {type: 'image', path: saveDetailsAlertSVG},
          emailExclamationPoint: {type: 'image', path: saveEmailAlertSVG},
        },
      },
    });
    const { detailsAlert, detailsAlertIcon, emailExclamationPoint } = mainContent.loginForm;

    const emailAlertIconPath = 'test.data/benchmark.data.to.expect/svg.icons/email.alert.icon.png'
    const detailsAlertIconPath = 'test.data/benchmark.data.to.expect/svg.icons/details.alert.icon.png'
    const benchmarkEmailIcon = await FS.fileToBuffer(emailAlertIconPath);
    const benchmarkDetailsIcon = await FS.fileToBuffer(detailsAlertIconPath);

    const pixDiff = MAX_DIFF_PIX ? +MAX_DIFF_PIX : 70;

    assert(detailsAlert).isEqual(msg);
    assert(comparator(benchmarkDetailsIcon, detailsAlertIcon, { maxDiffPixels: pixDiff })).isEqual(null)
    assert(comparator(benchmarkEmailIcon, emailExclamationPoint, { maxDiffPixels: pixDiff })).isEqual(null)

    await this.attachScreenShot([
      {name: 'detailsAlertIcon', body: detailsAlertIcon as Buffer},
      {name: 'emailExclamationPoint', body: emailExclamationPoint as Buffer},
    ]);
  }

  @pwLogging
  async verifyHintsTexts({ hint, email, password }: TCheckHintsArgs) {
    if (hint === 'Email') {
      const { mainContent } = await loginPage.getData({ mainContent: { loginForm: { emailAlertHint: null } } });
      const { emailAlertHint } = mainContent.loginForm;

      assert(emailAlertHint).isEqual(email);
    } else if (hint === 'Password') {
      const { mainContent } = await loginPage.getData({ mainContent: { loginForm: { passwordAlertHint: null } } });
      const { passwordAlertHint } = mainContent.loginForm;

      assert(passwordAlertHint).isEqual(password);
    } else {
      const {
        mainContent: { loginForm },
      } = await loginPage.getData({ mainContent: { loginForm: { emailAlertHint: null } } });
      const { emailAlertHint } = loginForm;

      const { mainContent } = await loginPage.getData({ mainContent: { loginForm: { passwordAlertHint: null } } });
      const { passwordAlertHint } = mainContent.loginForm;

      assert(emailAlertHint).isEqual(email);
      assert(passwordAlertHint).isEqual(password);
    }
  }

  @pwLogging
  async verifyHintsIsVisible(isVisible: boolean) {
    const { mainContent } = await loginPage.isVisible({ mainContent: { loginForm: { emailAlertHint: isVisible } } });
    const { emailAlertHint } = mainContent.loginForm;

    const {
      mainContent: { loginForm },
    } = await loginPage.isVisible({ mainContent: { loginForm: { passwordAlertHint: isVisible } } });
    const { passwordAlertHint } = loginForm;

    assert(emailAlertHint).isEqual(isVisible);
    assert(passwordAlertHint).isEqual(isVisible);
  }

  @pwLogging
  async verifyPasswordValue(value: TPasswordValue) {
    const { mainContent } = await loginPage.getData({ mainContent: { loginForm: { passwordField: 'type' } } });
    const { passwordField } = mainContent.loginForm;

    if (value === 'default') {
      assert(passwordField).isEqual('password');
    } else {
      assert(passwordField).isEqual('text');
    }
  }
}
