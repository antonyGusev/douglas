import { provider } from '../framework';

const test = provider.test;

const { Actor } = provider.actor;
const { browser, EmailTypes } = provider.packages;
const { Users } = provider.users;

const { email, password } = Users.anton.credentials;
const { name, surename } = Users.anton.personal;

const newPassword = '!qWerty0000';

test.beforeEach('Open main page', async () => {
  await browser.goTo(process.env.RUN_ENV!);
});

let user: InstanceType<typeof Actor>;

test('DTC_002_Should_Reset_Password', async ({}, testInfo) => {
  user = new Actor({ name, surename, password, email, testInfo });

  await user.onMainPage.selectCookies('All');
  await user.onMainPage.goToLoginPage();
  await user.onLoginPage.resetPasswordFor(email);

  const resetPassLink =
  await user.onEmail.getResetPasswordLink(EmailTypes.antonGmail);
  await user.onEmail.openAssignNewPasswordPage(resetPassLink);

  await user.onNewPasswordPage.selectCookies('Required');
  await user.onNewPasswordPage.setUpNewPassword(newPassword);

  await user.onUserAccountPage.verifyPageTitle('Anton Husiev');

  await user.onUserAccountPage.logOut();
  await user.onLoginPage.enterUserCredentials({ optionToStay: 'notStayLogged', email, password: newPassword });

  await user.onUserAccountPage.verifyPageTitle('Anton Husiev');
});

test.afterEach(async ({}, testInfo) => {
  await user.onUserAccountPage.goTo('myData', 'usingLeftMenu');
  await user.onUserAccountDataPage.goToEdit('password');
  await user.onChangePasswordPage.setUpNewPassword(newPassword, password);

  await browser.saveVideo(testInfo);
  await browser.close();
});
