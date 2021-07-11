import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { LoggerService } from 'src/app/generic/logger.service';
import { EEventType } from 'src/app/generics/log-item';
import { LoginForm, ILogin } from 'src/app/generics/login';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginFormComponent implements OnInit {

  loginForm: FormGroup;
  formValues$: Subscription;
  _loginValues: LoginForm = { email: '', password: '' };

  constructor(private _formBuilder: FormBuilder,
    public auth: AuthService, private logger: LoggerService) {

  }


  ngOnInit(): void {
    this.generateLoginForm()
    this.watchLoginForm()
  }

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

  public clearLoginForm() {
    this.loginForm.setValue({
      email: '',
      password: ''
    })
  }

  public popOutLogin() {
    this["auth"]["popOutLogin"]('facebook').subscribe(
      userCred=> console.log(userCred)
    )
  }

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


  private login(cred: ILogin) {
    return this.auth.login(
      cred
    )
  }

}
