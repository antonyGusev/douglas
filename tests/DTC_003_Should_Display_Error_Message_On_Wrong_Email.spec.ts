import { provider } from '../framework';

const { I } = provider.actor;
const test = provider.test;
const { browser } = provider.packages;
const { UsersLoginDetails } = provider.users;

const user = UsersLoginDetails.anton;

test.beforeEach('Open main page', async () => {
  await browser.goTo(process.env.RUN_ENV!);
});

test('DTC_004_Should_Display_Error_Message_On_Wrong_Email', async () => {
  await I.onMainPage.selectCookies('Required');
  await I.onMainPage.goToLoginPage();
  await I.onLoginPage.enterUserCredentials({ email: 'wrong.email@gmail.com', password: user.password });

  await I.onLoginPage.verifyErrorMessage('Falsche Zugangsdaten');
});

test.afterEach(async ({}, testInfo) => {
  await browser.saveVideo(testInfo);
  await browser.close();
});
