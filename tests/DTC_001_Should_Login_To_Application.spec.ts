import { provider } from '../framework';

const test = provider.test;

const { Actor } = provider.actor;
const { browser } = provider.packages;
const { Users } = provider.users;

const { email, password } = Users.anton.credentials;
const { name, surename } = Users.anton.personal;

test.beforeEach('Open main page', async () => {
  await browser.goTo(process.env.RUN_ENV!);
});

test('DTC_001_Should_Login_To_Application_With_Anton_Husiev_User', async ({}, testInfo) => {
  const user = new Actor({name, surename, password, email, testInfo});

  await user.onMainPage.selectCookies('All');
  await user.onMainPage.goToLoginPage();
  await user.onLoginPage.enterUserCredentials({ optionToStay: 'notStayLogged', email, password });

  await user.onMainPage.shouldBeAuthorizedAs('Anton');
});

test.afterEach(async ({}, testInfo) => {
  await browser.saveVideo(testInfo);
  await browser.close();
});
