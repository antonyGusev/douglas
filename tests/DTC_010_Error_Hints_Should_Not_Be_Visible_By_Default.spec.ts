import { provider } from '../framework';

const { I } = provider.actor;
const test = provider.test;
const { browser } = provider.packages;

test.beforeEach('Open main page', async () => {
  await browser.goTo(process.env.RUN_ENV!);
});

test('DTC_010_Error_Hints_Should_Not_Be_Visible_By_Default', async () => {
  await I.onMainPage.selectCookies('Required');
  await I.onMainPage.goToLoginPage();

  await I.onLoginPage.verifyHintsIsVisible(false);
});

test.afterEach(async ({}, testInfo) => {
  await browser.saveVideo(testInfo);
  await browser.close();
});
