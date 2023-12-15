import { provider } from '../framework';

const { I } = provider.actor;
const test = provider.test;
const { browser } = provider.packages;
const { UsersLoginDetails } = provider.users;
const { email, password } = UsersLoginDetails.anton;

test.beforeEach('Open main page', async () => {
  await browser.goTo(process.env.RUN_ENV!);
});

test.only('DTC_001_Should_Login_To_Application_With_Anton_Husiev_User', async () => {
  await I.onMainPage.selectCookies('All');
  await I.onMainPage.goToLoginPage();
  await I.onLoginPage.enterUserCredentials({ optionToStay: 'notStayLogged', email, password });

  await I.onMainPage.shouldBeAuthorizedAs('Anton');
});

test.afterEach(async ({}, testInfo) => {
  await browser.saveVideo(testInfo);
  await browser.close();
});
