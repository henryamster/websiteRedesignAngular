import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { ResponsiveService } from 'src/app/generic/responsive.service';
import { IWindowSize } from 'src/app/generics/window-size';

@Component({
  selector: 'app-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.scss']
})
export class ProfileMenuComponent implements OnInit {

  constructor(private resize: ResponsiveService,
    private auth: AuthService) {

  }


  size: IWindowSize;
  resize$: Subscription
  userProfileImage: string | boolean;
  authEvents$: Subscription
  loggedIn: boolean;
  name: string;


  ngOnInit(): void {
    this["setResponsiveBehavior"]()
    this["watchAuthEvents"]()
    this["setUserInfo"]()
    this["setProfileImage"]()



  }
  private setProfileImage() {
    this["userProfileImage"] = (this.retrieveUser()?.["photoURL"] != undefined) ? this["auth"]["user"]()?.["photoURL"] : false;
  }

  private retrieveUser() {
    return this["auth"]["user"]();
  }

  private setUserInfo() {
    this["user"] = this["retrieveUser"]()
  }

  private setResponsiveBehavior() {
    this["size"] = this["resize"]["initialSize"]();
    this["resize$"] = this["resize"]["resizeWindowSize$"]
      .subscribe(windowSize => {
        this["size"] = windowSize;
      });
  }

  private watchAuthEvents() {

    this["authEvents$"] = this["auth"]["authEvent"]["pipe"](
      tap(event => {
        const USER_IS_LOGGED_IN = this["auth"]["user"]() == undefined ? false : true;
        this["setProfileImage"]();
        this["setUserInfo"]();
        this["loggedIn"] = USER_IS_LOGGED_IN
      }),
    )["subscribe"]()

  }


  public logOut() {
    this["auth"]["logout"]()["subscribe"]()
    this["userProfileImage"] = null

  }

}
