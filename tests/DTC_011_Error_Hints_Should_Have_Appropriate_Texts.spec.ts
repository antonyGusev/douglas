import { provider } from '../framework';

const { I } = provider.actor;
const test = provider.test;
const { browser } = provider.packages;

test.beforeEach('Open main page', async () => {
  await browser.goTo(process.env.RUN_ENV!);
});

test('DTC_011_Error_Hints_Should_Have_Appropriate_Texts', async () => {
  await I.onMainPage.selectCookies('Required');
  await I.onMainPage.goToLoginPage();

  await I.onLoginPage.enterUserCredentials({email: '', password: ''});
  await I.onLoginPage.verifyHintsTexts({hint: 'All', email: '* Pflichtfeld', password: '* Pflichtfeld'});

  await I.onLoginPage.enterUserCredentials({email: 'any_mail@gmail.c'})
  await I.onLoginPage.verifyHintsTexts({hint: 'Email', email: 'Ungültige E-Mail-Adresse'});

  await I.onLoginPage.enterUserCredentials({password: '1234'});
  await I.onLoginPage.verifyHintsTexts({hint: 'Password', password: 'Dein Passwort muss mindestens 6 Zeichen enthalten.'})
});

test.afterEach(async ({}, testInfo) => {
  await browser.saveVideo(testInfo);
  await browser.close();
});
