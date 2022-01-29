import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { LoggerService } from 'src/app/generic/logger.service';
import { EEventType } from 'src/app/generics/log-item';
import { LoginForm, ILogin } from 'src/app/generics/login';
import { AuthService ,AUTH_PROVIDERS} from '../auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginFormComponent implements OnInit {

  loginForm: FormGroup;
  formValues$: Subscription;
  _loginValues: LoginForm = { email: '', password: '' };
  AUTH_PROVIDERS=AUTH_PROVIDERS;

  constructor(private _formBuilder: FormBuilder,
    public auth: AuthService, private logger: LoggerService) {

  }


 /**
  * Generate the login form and watch for changes in the form.
  */
  ngOnInit(): void {
    this.generateLoginForm()
    this.watchLoginForm()
  }

  /**
   * attempt to login with the form values.
   * @returns The login method is returning a promise.
   */
  public attemptLogin(): void {
    if (!this["loginForm"]["valid"]){
      this["loginForm"]["markAllAsTouched"]()
      return
    }
    const cred = {
      email: this["loginForm"]["get"]("email")["value"],
      password: this["loginForm"]["get"]("password")["value"]
    }

    this.login(cred)
  }

/**
 * Clear the login form.
 */
  public clearLoginForm() {
    this.loginForm.setValue({
      email: '',
      password: ''
    })
  }

 /**
  * `public popOutLogin(provider:AUTH_PROVIDERS)`
  *
  * This function is used to pop out a login window from the current window.
  * @param {AUTH_PROVIDERS} provider - The provider to log out of.
  */
  public popOutLogin(provider:AUTH_PROVIDERS) {
    this["auth"]["popOutLogin"](provider)
  }

/**
 * Create a form group with the email and password fields.
 */
  private generateLoginForm() {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.minLength(3)]],
      password: ['', Validators.minLength(8)]
    });
  }

  private watchLoginForm() {
    this.formValues$ = this.loginForm
      .valueChanges.pipe(
        map(login => {
          [this._loginValues["email"], this._loginValues["password"]]
            = [login["email"], login["password"]]
        })
      )
      .subscribe();
  }


  /**
   * login
   * @param {ILogin} cred - ILogin
   * @returns The token
   */
  private login(cred: ILogin) {
    return this.auth.login(
      cred
    )
  }

}
