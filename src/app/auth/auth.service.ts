import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { from, Observable, pipe, Subject, Subscription, throwError } from 'rxjs';
import { ILogin } from '../generics/login';
import { IdTokenResult, User, UserCredential } from '@firebase/auth-types'
import { catchError, map, tap } from 'rxjs/operators';
import firebase from 'firebase/app';
import { LoggerService } from '../generic/logger.service';
import { EEventType } from '../generics/log-item';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private _user: User | null
  private _isAdmin: boolean = false
  public authEvent: Subject<boolean>
  private _claims: IdTokenResult["claims"]

  /**
   * init auth service
   * @param {AngularFireAuth} auth - AngularFireAuth
   * @param {LoggerService} logger - LoggerService
   * @param {Router} router - Router
   */
  constructor(private auth: AngularFireAuth,
    private logger: LoggerService,
    private router: Router) {

      // Trying to work around https://github.com/angular/angularfire/issues/2656

      // if(environment.useEmulators){
      //   const indexOfOldPort = environment.location.indexOf(':4200/');
      //   const host = environment.location.split('').splice(indexOfOldPort,5)
      //   const emu = `http://${host}:9099/`
      //   this.auth.useEmulator(emu)
      // }

    this["authEvent"] = new Subject();
    this["getCurrentUser"](auth)
    ["pipe"](
      tap((user: User) => {
        <Observable<IdTokenResult>>this["gatherClaims"](user)
      }
      ),
      catchError(err => {
        throw 'Could not retrieve user.' + err;
      }),
    )
    ["subscribe"](
      user=> this["_user"]=user
    )

    this["auth"]["authState"]["pipe"](tap(user => <void>this["triggerAuthEvent"](!user?.["email"] === null)))
      .subscribe()
    this["watchAuthEvents"](auth);

    this.auth.onAuthStateChanged(user => {

      this["_user"] = user;
      this["gatherClaims"](user).subscribe(_=>{
        this["_isAdmin"] = _.claims.admin;
        this["_claims"] = _.claims;
        this["triggerAuthEvent"](true)


      })
    })

  }



  /**
   * attempt login
   * @param {ILogin} cred - ILogin
   */
  public login(cred: ILogin): void {
    this["attemptLogin"](cred)
  }





 /**
  * Logs the user out and redirects them to the login page.
  * @returns A void observable.
  */
  public logout(): Observable<void> {
    return from(
      this["auth"]["signOut"]()
    )["pipe"](tap(_ => {
      this["triggerAuthEvent"](false)
      this["vacateUser"]()
      this["redirectToLogin"]()
    }
    )
    )
  }


 /**
  * *This function is called when the user clicks the login button. It will call the
  * getThirdPartyUserCredential function to get the user's credentials. If the user's credentials are
  * successfully retrieved, the user will be logged in. Otherwise, an error will be thrown.*
  * @param provider - The provider to use for authentication.
  */
  public popOutLogin(provider = AUTH_PROVIDERS.GOOGLE) {

    const WHEN_IMPLEMENTED = false;

    WHEN_IMPLEMENTED ? this.getThirdPartyUserCredential(provider) :
     this["logger"]["logError"](
       new Error('Third Party Authentication has not yet been enabled.'),
       this._user, EEventType.Auth);
  }

/**
 * get 3rd party user credentials
 * @param {AUTH_PROVIDERS} provider - AUTH_PROVIDERS
 * @returns A UserCredential object.
 */
  private getThirdPartyUserCredential(provider: AUTH_PROVIDERS) : Observable<UserCredential>{
    return from(this["auth"]["signInWithPopup"](this.selectProvider(provider)))["pipe"](tap((userCred: UserCredential) => {
      this["_user"] = userCred.user;
      this["gatherClaims"](this["_user"])["subscribe"]();
      this["triggerAuthEvent"](true);
      //this["redirectToBlog"]();
    },
      err => this["logger"]["logError"](new Error(`Unsuccessful Login Attempt: ${err}`), null, EEventType.Auth)
    ));
  }

/**
 * Cannot select auth provider.
 * @param {AUTH_PROVIDERS} provider - The provider to use.
 * @returns The provider object.
 */
  private selectProvider(provider: AUTH_PROVIDERS): firebase.auth.AuthProvider {
    return (provider == AUTH_PROVIDERS["GOOGLE"].toString()) ? new firebase.auth.GoogleAuthProvider() :
      (provider == AUTH_PROVIDERS["FACEBOOK"].toString()) ? new firebase.auth.FacebookAuthProvider() :
        new firebase.auth.TwitterAuthProvider();
  }

  /**
   * `claims` returns the claims of the token.
   * @returns The claims object.
   */
  public claims(): IdTokenResult["claims"] {
    return this["_claims"]

  }

 /**
  * Returns the user object for the current user.
  * @returns The user object.
  */
  public user(): User {
    return this["_user"] ?? null

  }

 /**
  * returns whether the user is an admin
  * @returns The value of the private variable _isAdmin.
  */
  public IS_ADMIN(): boolean {
   return this["_isAdmin"]

  }

  private makeAdmin() {
    this["auth"]
    this["getUserTokenResult"](this._user).subscribe(
      token => token.claims
    )

  }

 /**
  * `redirectToBlog` is a function that redirects the user to the blog page.
  */
  private redirectToBlog() {
    this["router"]["navigateByUrl"]('/blog');
  }

/**
 * Redirects the user to the login page.
 */
  private redirectToLogin() {
    this["router"]["navigateByUrl"]('/login');
  }


  private attemptLogin(cred: ILogin): Subscription {

    return from(this["auth"]["signInWithEmailAndPassword"](cred["email"], cred["password"])).subscribe(
      userCred => {
        this["_user"] = userCred.user;
        this["gatherClaims"](this["_user"]).subscribe(_=>{
          this["triggerAuthEvent"](true)
          this["redirectToBlog"]()
          return userCred
        }
          )

      },
      err => this["logger"]["logError"](new Error(`Unsuccessful Login Attempt: ${err}`), null, EEventType.Auth)
    )
  }


 /**
  * Gathers the claims from the token and stores them in the _claims property.
  * @param {User} user - User
  * @returns A token.
  */
  private gatherClaims(user: User) {
    return this["getUserTokenResult"](user)
      .pipe(
        tap(token => {

          this["_isAdmin"] = this["checkAdminRoleInClaims"](token)
          this["_claims"] = this["getClaims"](token)
          this["_user"] = user

        }
        ),
        catchError(err => {
          throw 'Could not retrieve claims.' + err;
        }),
      )
  }

  private watchAuthEvents(auth: AngularFireAuth) {
    this["authEvent"]["pipe"](
      tap(
        loggedIn => loggedIn ?
          this["getCurrentUser"](auth)
            .pipe(tap((user: User) => this["gatherClaims"](user))) :
          [this["_user"], this["_claims"], this["_isAdmin"]] = [null, [], false]
      )
    );
  }

 /**
  * Trigger an event that tells subscribers that the user has logged in or logged out.
  * @param {boolean} loggedIn - boolean
  */
  private triggerAuthEvent(loggedIn: boolean): void {
    this["authEvent"]["next"](loggedIn);
  }

 /**
  * `getCurrentUser` returns an `Observable` of the current user.
  * @param {AngularFireAuth} auth - AngularFireAuth
  * @returns The current user.
  */
  private getCurrentUser(auth: AngularFireAuth): Observable<User> {
    return from(auth.currentUser);
  }

/**
 * `getUserTokenResult` returns an `Observable` of `IdTokenResult` for the current user.
 * @param {User} user - The user whose token you want to get.
 * @returns The user's token result.
 */
  private getUserTokenResult(user: User): Observable<IdTokenResult> {
    return !!user ? from(user.getIdTokenResult()) : from([]);
  }

 /**
  * Cannot generate summary
  * @param {IdTokenResult} token - The IdTokenResult object returned from the login method.
  * @returns The boolean value of the checkRoleInClaims function.
  */
  private checkAdminRoleInClaims(token: IdTokenResult): boolean {
    return this["checkRoleInClaims"]('admin', token);
  }

/**
 * Check if the user has the role specified in the claim.
 * @param {string} claim - The claim to check for.
 * @param {IdTokenResult} token - The token to check.
 * @returns The boolean value of the claim.
 */
  private checkRoleInClaims(claim: string, token: IdTokenResult): boolean {
    return (!!token["claims"][claim])
  }


/**
 * get user claims
 * @param {IdTokenResult} token - The token to parse.
 * @returns The claims of the token.
 */
  private getClaims(token: IdTokenResult): IdTokenResult["claims"][] {
    return [token["claims"]]
  }

/**
 * *Vacate the user.*
 *
 * The `vacateUser` function is used to remove the current user from the `_user` and `_claims`
 * properties.
 */
  private vacateUser() {
    [this["IS_ADMIN"], this["_user"], this["_claims"]] =
      [() => false, null, null]
  }
}


/* Defining a type for the authentication providers */
export enum AUTH_PROVIDERS{
  FACEBOOK="facebook",
  GOOGLE="google",
  TWITTER="twitter"
}
