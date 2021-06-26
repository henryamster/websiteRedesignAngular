import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
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
  _loginValues: LoginForm;

  constructor(private _formBuilder: FormBuilder,
    public auth: AuthService) {

  }

  ngOnInit(): void {
    this.generateLoginForm()
    this.watchLoginForm()
  }

  public attemptLogin(cred?: ILogin): void {
    this.login(cred).pipe(
      tap(profile =>
        console.log(profile["user"])
      )
    )
  }

  public clearLoginForm() {
    this.loginForm.setValue({
      email: '',
      password: ''
    })
  }

  private generateLoginForm() {
    this.loginForm = this._formBuilder.group({
      email: ['', Validators.required, Validators.email, Validators.minLength(3)],
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
      cred ?? this._loginValues
    );
  }
}
