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

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private _user: User | null
  private _isAdmin: boolean = false
  public authEvent: Subject<boolean>
  private _claims: IdTokenResult["claims"][]




  constructor(private auth: AngularFireAuth,
    private logger: LoggerService,
    private router: Router) {
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
    ["subscribe"]()

    this["auth"]["authState"]["pipe"](tap(user => <void>this["triggerAuthEvent"](!user?.["email"] === null)))
      .subscribe()
    this["watchAuthEvents"](auth);
  }



  public login(cred: ILogin): void {
    this["attemptLogin"](cred)
  }





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


  public popOutLogin(provider = AUTH_PROVIDERS.GOOGLE) {

    const WHEN_IMPLEMENTED = false;

    WHEN_IMPLEMENTED ? this.getThirdPartyUserCredential(provider) :
     this["logger"]["logError"](
       new Error('Third Party Authentication has not yet been enabled.'),
       this._user, EEventType.Auth);
  }

  private getThirdPartyUserCredential(provider: AUTH_PROVIDERS) : Observable<UserCredential>{
    return from(this["auth"]["signInWithPopup"](this.selectProvider(provider)))["pipe"](tap((userCred: UserCredential) => {
      console.log(userCred);
      this["_user"] = userCred.user;
      this["gatherClaims"](this["_user"]);
      this["triggerAuthEvent"](true);
      this["redirectToDashboard"]();
    },
      err => this["logger"]["logError"](new Error(`Unsuccessful Login Attempt: ${err}`), null, EEventType.Auth)
    ));
  }

  private selectProvider(provider: AUTH_PROVIDERS): firebase.auth.AuthProvider {
    return (provider == AUTH_PROVIDERS["GOOGLE"].toString()) ? new firebase.auth.GoogleAuthProvider() :
      (provider == AUTH_PROVIDERS["FACEBOOK"].toString()) ? new firebase.auth.FacebookAuthProvider() :
        new firebase.auth.TwitterAuthProvider();
  }

  public claims(): IdTokenResult["claims"][] {
    return this["_claims"]
  }

  public user(): User {
    return this["_user"] ?? null
  }

  public IS_ADMIN(): boolean {
    return this["_isAdmin"]
  }

  private makeAdmin() {
    this["auth"]
    this["getUserTokenResult"](this._user).subscribe(
      token => token.claims
    )

  }

  private redirectToDashboard() {
    this["router"]["navigateByUrl"]('/dashboard');
  }

  private redirectToLogin() {
    this["router"]["navigateByUrl"]('/login');
  }


  private attemptLogin(cred: ILogin): Subscription {

    return from(this["auth"]["signInWithEmailAndPassword"](cred["email"], cred["password"])).subscribe(
      userCred => {
        this["_user"] = userCred.user;
        this["gatherClaims"](this["_user"])
        this["triggerAuthEvent"](true)
        this["redirectToDashboard"]()
        return userCred
      },
      err => this["logger"]["logError"](new Error(`Unsuccessful Login Attempt: ${err}`), null, EEventType.Auth)
    )
  }


  private gatherClaims(user: User) {
    return this["getUserTokenResult"](user)
      .pipe(
        tap(token => {
          console.log(this["checkAdminRoleInClaims"](token))
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

  private triggerAuthEvent(loggedIn: boolean): void {
    this["authEvent"]["next"](loggedIn);
    console.log(this._user);
  }

  private getCurrentUser(auth: AngularFireAuth): Observable<User> {
    return from(auth.currentUser);
  }

  private getUserTokenResult(user: User): Observable<IdTokenResult> {
    return !!user ? from(user.getIdTokenResult()) : from([]);
  }

  private checkAdminRoleInClaims(token: IdTokenResult): boolean {
    return this["checkRoleInClaims"]('admin', token);
  }

  private checkRoleInClaims(claim: string, token: IdTokenResult): boolean {
    return (!!token["claims"][claim])
  }

  private getClaims(token: IdTokenResult): IdTokenResult["claims"][] {
    return [token["claims"]]
  }

  private vacateUser() {
    [this["IS_ADMIN"], this["_user"], this["_claims"]] =
      [() => false, null, null]
  }
}


export enum AUTH_PROVIDERS{
  FACEBOOK="facebook",
  GOOGLE="google",
  TWITTER="twitter"
}
