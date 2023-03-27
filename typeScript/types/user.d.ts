export interface userSchema {
  _id: string;
  name: string;
  surname: string;
  password: string;
  email: string;
  roles: Array<string>;
}

export interface loginSchema {
  password: string;
  email: string;
}

export interface uirshus {
  surname: string;
  password: string;
  roles: Array<string>;
  email?: string;
}
