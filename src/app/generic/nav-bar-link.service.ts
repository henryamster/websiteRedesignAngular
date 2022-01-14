import { Injectable } from '@angular/core';
import { User } from '@firebase/auth-types';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { INavBarLink, NavBarLink } from '../generics/nav-bar-link';
import { LoggerService } from './logger.service';
import { ABOUT, CONTACT, BLOG, GALLERY, LOGIN, LOGOUT, POST, DASHBOARD } from './nav-link-list';
@Injectable({
  providedIn: 'root'
})
export class NavBarLinkService {
  private _user: User | null
  private _isAdmin: boolean = false;
  authEvent: Observable<boolean>
  availableLinks: NavBarLink[]
  _shadowLinks: NavBarLink[];


  constructor(private auth: AuthService, private logger: LoggerService) {
    // this["authEvent"] = this["auth"]["authEvent"]["asObservable"]()

    this["_isAdmin"] = this["auth"]["IS_ADMIN"]()

    this["watchAuthEvents"]();
  }

  links(): NavBarLink[] {
    this["getAvailableLinks"]()
    if (this["availableLinks"]["length"] == 0){
      this["logger"]["logError"](
        new Error('No links have loaded')
      )
    }
    return this["availableLinks"];
  }

  getAvailableLinks() {
    this["getLocalUser"]();
    this["_shadowLinks"] = this["navBarLinks"]
    console.log(this._isAdmin)
    if (!this["_isAdmin"]){
      this["conditionallyFilterLinks"](true, 'adminOnly', false)
     }
     else{
       console.log(
         [
           this.availableLinks,
           this._shadowLinks,
           this.navBarLinks
         ]
       )
       this.availableLinks = this.navBarLinks;

    }
    // this["conditionallyFilterLinks"](this["_user"]==null, 'anonymousAccess', false)
   // this["conditionallyFilterLinks"](this["_user"]?.["uid"]!=null, 'adminOnly', false)
  }

  private getLocalUser() {
    this["_user"] = this["auth"]["user"]();
  }

  private watchAuthEvents(): void {
    this["auth"]["authEvent"]["pipe"](tap(_loggedIn => {
    }))
    ["subscribe"](
      _=>{this["setLocalUserAndAdmin"]();
      this["getAvailableLinks"]()
    }
    );

  }

  private setLocalUserAndAdmin() {
    [this["_user"], this["_isAdmin"]] =
      [this["auth"]["user"](), this["auth"]["IS_ADMIN"]()];
  }

  private conditionallyFilterLinks(condition: boolean, prop: string, value: boolean): void {
    if (condition) this["availableLinks"] = this["navBarLinks"]["filter"](_links => _links[prop] === value)
  }

  navBarLinks =
    [
      ABOUT,
      CONTACT,
      BLOG,
      GALLERY,
      DASHBOARD
    ]
}


