import { provider } from '../framework';

const { I } = provider.actor;
const test = provider.test;
const { browser } = provider.packages;

test.beforeEach('Open main page', async () => {
  await browser.goTo(process.env.RUN_ENV!);
});

test('DTC_005_Should_Display_Error_Message_On_Empty_Credentials', async () => {
  await I.onMainPage.selectCookies('Required');
  await I.onMainPage.goToLoginPage();
  await I.onLoginPage.enterUserCredentials({ email: '', password: '' });

  await I.onLoginPage.verifyErrorMessage('Bitte überprüfe deine Angaben');
});

test.afterEach(async ({}, testInfo) => {
  await browser.saveVideo(testInfo);
  await browser.close();
});
