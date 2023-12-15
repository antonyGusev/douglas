export type TLoginDetails = {
  readonly email: TEmail;
  readonly password: TPassword;
}

export type TEmail = 'a.husiev.test@gmail.com' | string;
export type TPassword = '!qWerty1986' | string;

export type ExistingUsers = 'anton';

export type TUsersLogin = {
  [T in ExistingUsers]: TLoginDetails
}

export const UsersLoginDetails: TUsersLogin = {
  anton: {
    email: 'a.husiev.test@gmail.com',
    password: '!qWerty1986'
  }
}
