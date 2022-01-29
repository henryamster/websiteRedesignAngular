import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

import { User, UserCredential } from '@firebase/auth-types'
import { interval, noop, Subscription } from 'rxjs';
import { map, startWith, take, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  COUNTDOWN_SECONDS = 5;
  countdown: number;
  redirectCountdown$: Subscription;

  secondsTimer$ = interval(1000)["pipe"](
    take(this["COUNTDOWN_SECONDS"]),
    map((sec) => (this["COUNTDOWN_SECONDS"] - 1) - sec
    ))

  user: User = null
  constructor(private auth: AuthService, private router: Router) {

  }

 /**
  * `loggedIn` returns `true` if the user is logged in, `false` otherwise.
  * @returns The loggedIn() method is returning a boolean value.
  */
  public loggedIn() {
    return this.isUserNotNull() ? true : false;
  }

  /**
   * Cannot generate summary
   * @returns The user object.
   */
  private isUserNotNull() {
    return (this.getUser() != null);
  }

 /**
  * Get the current user.
  * @returns The user object.
  */
  private getUser() {
    return this["auth"]["user"]();
  }

  ngOnInit() {

    this["user"] = this["getUser"]()

    if (this.isUserNotNull()) {
      this["redirectCountdown$"] = this["secondsTimer$"]["pipe"](
        startWith(this["COUNTDOWN_SECONDS"]),
        tap(count => (count == 0) ? this.router.navigateByUrl('/blog') : noop)
      )["subscribe"](
        secondsRemaining => this.countdown = secondsRemaining
      )


    }
  }

  ngOnDestroy(): void {
    this["redirectCountdown$"]?.["unsubscribe"]()
  }

}
