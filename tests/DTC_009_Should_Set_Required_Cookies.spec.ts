import { provider } from '../framework';

const { I } = provider.actor;
const test = provider.test;
const { browser } = provider.packages;

test.beforeEach('Open main page', async () => {
  await browser.goTo(process.env.RUN_ENV!);
});

test('DTC_009_Should_Set_Required_Cookies', async () => {
  await I.onMainPage.selectCookies('Required');
  await I.onMainPage.verifyCookiesIs('Required');
});

test.afterEach(async ({}, testInfo) => {
  await browser.saveVideo(testInfo);
  await browser.close();
});
