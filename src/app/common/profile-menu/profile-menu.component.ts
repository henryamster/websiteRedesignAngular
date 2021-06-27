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
  size:IWindowSize;
  resize$: Subscription
  userProfileImage: string | boolean;
  authEvents$: Subscription
  loggedIn:boolean;


  ngOnInit(): void {
    this["setResponsiveBehavior"]()
    this["setProfileImage"]()
    this["watchAuthEvents"]()

  }
  private setProfileImage() {
    this["userProfileImage"] = (this["auth"]["user"]()?.["photoURL"] != undefined) ? this["auth"]["user"]()?.["photoURL"] : false;
  }

  private setResponsiveBehavior() {
    this["size"] = this["resize"]["initialSize"]();
    this["resize$"] = this["resize"]["resizeWindowSize$"]
      .subscribe(windowSize => {
        this["size"] = windowSize;
      });
  }

  private watchAuthEvents(){
    this["authEvents$"] = this["auth"]["authEvent"]["pipe"](
      tap( event => this["loggedIn"] = this["auth"]["user"]() == undefined? false : true )
    )["subscribe"]()

  }


  public logOut(){
    this["auth"]["logout"]()["subscribe"]()

  }

}
