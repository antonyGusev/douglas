import { provider } from '../framework';

const { I } = provider.actor;
const test = provider.test;
const { browser } = provider.packages;

test.beforeEach('Open main page', async () => {
  await browser.goTo(process.env.RUN_ENV!);
});

test('DTC_008_Should_Set_All_Cookies', async () => {
  await I.onMainPage.selectCookies('All');
  await I.onMainPage.verifyCookiesIs('All');
});

test.afterEach(async ({}, testInfo) => {
  await browser.saveVideo(testInfo);
  await browser.close();
});
