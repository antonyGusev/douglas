export type TUsers = {
  [T in ExistingUsers]: {
    credentials: TCredentials;
    personal: TPersonalDetails;
  };
};

export type TName = 'Anton' | string;
export type TSurename = 'Husiev' | string;

export type TEmail = 'a.husiev.test@gmail.com' | string;
export type TPassword = '!qWerty1986' | string;

export type ExistingUsers = 'anton';

export type TCredentials = {
  readonly email: TEmail;
  readonly password: TPassword;
};

export type TPersonalDetails = {
  readonly name: TName;
  readonly surename: TSurename;
};

export const Users: TUsers = {
  anton: {
    credentials: {
      email: 'a.husiev.test@gmail.com',
      password: '!qWerty1986',
    },
    personal: {
      name: 'Anton',
      surename: 'Husiev',
    },
  },
};
