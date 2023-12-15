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

// interface Actor
//   extends MainPageActions,
//     LoginPageActions,
//     EmailActions,
//     NewPasswordPageActions,
//     UserAccountPageActions,
//     UserAccountDataPageActions,
//     ChangePasswordPageActions {}

// class Actor {}

class Actor {
  public onMainPage: IMainPageActions = new MainPageActions();
  public onLoginPage: ILoginPageActions = new LoginPageActions();
  public onChangePasswordPage: IChangePasswordPageActions = new ChangePasswordPageActions();
  public onEmail: IEmailActions = new EmailActions();
  public onNewPasswordPage: INewPasswordPageActions = new NewPasswordPageActions();
  public onUserAccountPage: IUserAccountPageActions = new UserAccountPageActions();
  public onUserAccountDataPage: IUserAccountDataPageActions = new UserAccountDataPageActions();
}

// applyMixins(Actor, [
//   MainPageActions,
//   LoginPageActions,
//   EmailActions,
//   NewPasswordPageActions,
//   UserAccountPageActions,
//   UserAccountDataPageActions,
//   ChangePasswordPageActions,
// ]);

const I = new Actor();

export { I };