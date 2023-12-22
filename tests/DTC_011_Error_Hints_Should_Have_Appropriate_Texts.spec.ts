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

test('DTC_011_Error_Hints_Should_Have_Appropriate_Texts', async ({}, testInfo) => {
  const user = new Actor({name, surename, password, email, testInfo});

  await user.onMainPage.selectCookies('Required');
  await user.onMainPage.goToLoginPage();

  await user.onLoginPage.enterUserCredentials({email: '', password: ''});
  await user.onLoginPage.verifyHintsTexts({hint: 'All', email: '* Pflichtfeld', password: '* Pflichtfeld'});

  await user.onLoginPage.enterUserCredentials({email: 'any_mail@gmail.c'})
  await user.onLoginPage.verifyHintsTexts({hint: 'Email', email: 'Ungültige E-Mail-Adresse'});

  await user.onLoginPage.enterUserCredentials({password: '1234'});
  await user.onLoginPage.verifyHintsTexts({hint: 'Password', password: 'Dein Passwort muss mindestens 6 Zeichen enthalten.'})
});

test.afterEach(async ({}, testInfo) => {
  await browser.saveVideo(testInfo);
  await browser.close();
});
