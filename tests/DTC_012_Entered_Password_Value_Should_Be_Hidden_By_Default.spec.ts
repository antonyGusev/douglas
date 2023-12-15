import { provider } from '../framework';

const { I } = provider.actor;
const test = provider.test;
const { browser } = provider.packages;
const { UsersLoginDetails } = provider.users;
const { password } = UsersLoginDetails.anton;

test.beforeEach('Open main page', async () => {
  await browser.goTo(process.env.RUN_ENV!);
});

test('DTC_012_Show_Password_Button_Should_Unmask_By_Default_Masked_Password', async () => {
  await I.onMainPage.selectCookies('Required');
  await I.onMainPage.goToLoginPage();

  await I.onLoginPage.enterUserCredentials({password});
  await I.onLoginPage.verifyPasswordValue('default');
  
  await I.onLoginPage.unmaskPassword();
  await I.onLoginPage.verifyPasswordValue('unMasked');
});

test.afterEach(async ({}, testInfo) => {
  await browser.saveVideo(testInfo);
  await browser.close();
});
