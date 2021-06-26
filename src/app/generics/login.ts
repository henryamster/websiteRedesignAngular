export interface ILogin {
  email:string;
  password:string;
}

export class LoginForm implements ILogin {
  email: string;
  password: string;
  constructor(email, password) {
    [this["email"], this["password"]] = [email, password]
  }
}
