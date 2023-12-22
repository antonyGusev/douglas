import { ITestInfo } from '../lib';
import {
  IMainPageActions,
  MainPageActions,
  LoginPageActions,
  EmailActions,
  NewPasswordPageActions,
  UserAccountPageActions,
  UserAccountDataPageActions,
  ChangePasswordPageActions,
  ILoginPageActions,
  IChangePasswordPageActions,
  IEmailActions,
  INewPasswordPageActions,
  IUserAccountPageActions,
  IUserAccountDataPageActions,
} from './actions';

interface IActorParams {
  name: string;
  surename: string;
  email: string;
  password: string;
  testInfo: ITestInfo;
}

interface IActor {
  onMainPage: IMainPageActions;
  onLoginPage: ILoginPageActions;
  onChangePasswordPage: IChangePasswordPageActions;
  onNewPasswordPage: INewPasswordPageActions;
  onUserAccountPage: IUserAccountPageActions;
  onUserAccountDataPage: IUserAccountDataPageActions;
}

class Actor implements IActor {
  public name: string;
  public surename: string;
  public email: string;
  public password: string;

  public testInfo: ITestInfo;

  public onMainPage: IMainPageActions;
  public onLoginPage: ILoginPageActions;
  public onChangePasswordPage: IChangePasswordPageActions;
  public onNewPasswordPage: INewPasswordPageActions;
  public onUserAccountPage: IUserAccountPageActions;
  public onUserAccountDataPage: IUserAccountDataPageActions;

  public onEmail: IEmailActions;

  constructor({ name, surename, email, password, testInfo }: IActorParams) {
    this.name = name;
    this.surename = surename;
    this.email = email;
    this.password = password;
    this.testInfo = testInfo;

    this.onMainPage = new MainPageActions(this.testInfo);
    this.onLoginPage = new LoginPageActions(this.testInfo);
    this.onChangePasswordPage = new ChangePasswordPageActions(this.testInfo);
    this.onNewPasswordPage = new NewPasswordPageActions(this.testInfo);
    this.onUserAccountPage = new UserAccountPageActions(this.testInfo);
    this.onUserAccountDataPage = new UserAccountDataPageActions(this.testInfo);
    this.onEmail = new EmailActions(this.testInfo)
  }
}

export { Actor, IActor };
