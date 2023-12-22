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

test('DTC_004_Should_Display_Error_Message_On_Wrong_Password', async ({}, testInfo) => {
  const user = new Actor({name, surename, password, email, testInfo});

  await user.onMainPage.selectCookies('Required');
  await user.onMainPage.goToLoginPage();
  await user.onLoginPage.enterUserCredentials({ email: email, password: 'Wrong!' });

  await user.onLoginPage.verifyErrorMessage('Falsche Zugangsdaten');
});

test.afterEach(async ({}, testInfo) => {
  await browser.saveVideo(testInfo);
  await browser.close();
});
