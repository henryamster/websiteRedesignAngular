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
  private _user: (User | null)
  private _isAdmin: boolean = false;
  authEvent: Observable<boolean>
  availableLinks: NavBarLink[]
  _shadowLinks: NavBarLink[];


  constructor(private auth: AuthService, private logger: LoggerService) {
    this["authEvent"] = this["auth"]["authEvent"]["asObservable"]()
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

  getAvailableLinks(): void {
    this["_shadowLinks"] = this["navBarLinks"]


    this["conditionallyFilterLinks"]((this["_user"]==null|| this["_user"]?.["isAnonymous"]), 'anonymousAccess', true)
    this["conditionallyFilterLinks"](this["_isAdmin"], 'adminOnly', false)
  }

  private watchAuthEvents(): void {
    this["authEvent"]["pipe"](tap(_loggedIn => {
      [this["_user"], this["_isAdmin"]] =
        [this["auth"]["user"](), this["auth"]["IS_ADMIN"]()]
      this["getAvailableLinks"]()
    }))
    ["subscribe"]();

  }

  private conditionallyFilterLinks(condition: boolean, prop: string, value: boolean): void {
    if (condition) this["availableLinks"] = this["_shadowLinks"]["filter"](_links => _links[prop] === value)
  }

  navBarLinks =
    [
      ABOUT,
      CONTACT,
      BLOG,
      GALLERY,
      // LOGIN,
      LOGOUT,
      POST,
      DASHBOARD
    ]
}


