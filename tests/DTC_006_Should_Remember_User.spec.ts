import { provider } from '../framework';

const { I } = provider.actor;
const test = provider.test;
const { browser } = provider.packages;
const { email, password } = provider.users.UsersLoginDetails.anton;

test.beforeEach('Open main page', async () => {
  await browser.goTo(process.env.RUN_ENV!);
});

test('DTC_006_Should_Remember_User', async () => {
  await I.onMainPage.selectCookies('Required');
  await I.onMainPage.goToLoginPage();
  await I.onLoginPage.enterUserCredentials({ optionToStay: 'stayLogged', email, password });

  await I.onMainPage.shouldBeRemembered('true');
});

test.afterEach(async ({}, testInfo) => {
  await browser.saveVideo(testInfo);
  await browser.close();
});
