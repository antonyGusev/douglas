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

test('DTC_008_Should_Set_All_Cookies', async ({}, testInfo) => {
  const user = new Actor({name, surename, password, email, testInfo});

  await user.onMainPage.selectCookies('All');
  await user.onMainPage.verifyCookiesIs('All');
});

test.afterEach(async ({}, testInfo) => {
  await browser.saveVideo(testInfo);
  await browser.close();
});
