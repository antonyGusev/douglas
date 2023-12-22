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

test('DTC_012_Show_Password_Button_Should_Unmask_By_Default_Masked_Password', async ({}, testInfo) => {
  const user = new Actor({name, surename, password, email, testInfo});

  await user.onMainPage.selectCookies('Required');
  await user.onMainPage.goToLoginPage();

  await user.onLoginPage.enterUserCredentials({password});
  await user.onLoginPage.verifyPasswordValue('default');
  
  await user.onLoginPage.unmaskPassword();
  await user.onLoginPage.verifyPasswordValue('unMasked');
});

test.afterEach(async ({}, testInfo) => {
  await browser.saveVideo(testInfo);
  await browser.close();
});
