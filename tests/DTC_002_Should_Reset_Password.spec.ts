import { provider } from '../framework';

const { I } = provider.actor;
const test = provider.test;
const { browser, EmailTypes } = provider.packages;
const { UsersLoginDetails } = provider.users;

const newPassword = '!qWerty0000';
const {email, password} = UsersLoginDetails.anton;

test.beforeEach('Open main page', async () => {
  await browser.goTo(process.env.RUN_ENV!);
});

test('DTC_002_Should_Reset_Password', async () => {
  await I.onMainPage.selectCookies('All');
  await I.onMainPage.goToLoginPage();
  await I.onLoginPage.resetPasswordFor(email);

  const resetPassLink = 
  await I.onEmail.getResetPasswordLink(EmailTypes.antonGmail);
  await I.onEmail.openAssignNewPasswordPage(resetPassLink);

  await I.onNewPasswordPage.selectCookies('Required');
  await I.onNewPasswordPage.setUpNewPassword(newPassword);

  await I.onUserAccountPage.verifyPageTitle('Anton Husiev');

  await I.onUserAccountPage.logOut();
  await I.onLoginPage.enterUserCredentials({optionToStay: 'notStayLogged', email, password: newPassword});

  await I.onUserAccountPage.verifyPageTitle('Anton Husiev');
});

test.afterEach(async ({}, testInfo) => {
  await I.onUserAccountPage.goTo('myData', 'usingLeftMenu');
  await I.onUserAccountDataPage.goToEdit('password');
  await I.onChangePasswordPage.setUpNewPassword(newPassword, password);

  await browser.saveVideo(testInfo);
  await browser.close();
});
