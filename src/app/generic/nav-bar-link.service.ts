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


  }

 /**
  * *This function is called when the component is initialized.
  * It checks to see if the user is an admin and sets the _isAdmin property accordingly.
  * It also calls the getAvailableLinks function to get the links that are available to the user.*
  */
  ngOnInit(){
    this["_isAdmin"] = this["auth"].IS_ADMIN()
    this["getAvailableLinks"]();
    this["watchAuthEvents"]();
  }
 /**
  * return links
  * @returns The links array.
  */
  links(): NavBarLink[] {
    this["getAvailableLinks"]()
    if (this["availableLinks"]["length"] == 0){
      this["logger"]["logError"](
        new Error('No links have loaded')
      )
    }
    return this["availableLinks"];
  }

  /**
   * * Get the user's information from the session storage.
   * * Get the links from the navBarLinks array.
   * * If the user is not logged in, filter out the adminOnly links.
   * * If the user is logged in, filter out the anonymousAccess links.
   * * If the user is an admin, filter out the adminOnly links.
   * * Return the available links.
   */
  getAvailableLinks() {

    this["getLocalUser"]();
    this["_shadowLinks"] = this["navBarLinks"]

    if (!this["_isAdmin"]){
      this["conditionallyFilterLinks"](true, 'adminOnly', false)
     }
     else{
       this.availableLinks = this.navBarLinks;

    }
    // this["conditionallyFilterLinks"](this["_user"]==null, 'anonymousAccess', false)
   // this["conditionallyFilterLinks"](this["_user"]?.["uid"]!=null, 'adminOnly', false)
  }

  /** get the user from the auth service */
  private getLocalUser() {
    this["_user"] = this["auth"]["user"]();
    this["_isAdmin"] = this["auth"]["IS_ADMIN"]();

  }

 /**
  * * Subscribe to the authEvent observable.
  * * When the authEvent observable emits, call the setLocalUserAndAdmin function.
  * * When the setLocalUserAndAdmin function is called, get the available links.
  */
  private watchAuthEvents(): void {

    this["auth"]["authEvent"]["pipe"](tap(_loggedIn => {
    }))
    ["subscribe"](
      _=>{this["setLocalUserAndAdmin"]();
      this["getAvailableLinks"]()
    }
    );


  }

 /**
  * * Set the local user and admin variables to the values of the user and admin properties of the auth
  * service.
  */
  private setLocalUserAndAdmin() {

    [this["_user"], this["_isAdmin"]] =
      [this["auth"]["user"](), this["auth"]["IS_ADMIN"]()];
  }

  /**
   * If the condition is true, then filter the links by the given property and value.
   * @param {boolean} condition - boolean
   * @param {string} prop - The property of the link object to filter on.
   * @param {boolean} value - boolean
   */
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


