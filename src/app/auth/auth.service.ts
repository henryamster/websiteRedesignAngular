import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { from, Observable, pipe, Subject, Subscription, throwError } from 'rxjs';
import { ILogin } from '../generics/login';
import { IdTokenResult, User, UserCredential } from '@firebase/auth-types'
import { catchError, map, tap } from 'rxjs/operators';
import firebase from 'firebase/app';
import { LoggerService } from '../generic/logger.service';
import { EEventType } from '../generics/log-item';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private _user: User | null
  private _isAdmin: boolean = false
  public authEvent: Subject<boolean>
  private _claims: IdTokenResult["claims"][]


  constructor(private auth: AngularFireAuth,
    private logger:LoggerService,) {
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

    this["auth"]["authState"]["pipe"](tap( user=> <void>this["triggerAuthEvent"](!user?.["email"]===null)))
    .subscribe()
    this["watchAuthEvents"](auth);
  }



  public login(cred: ILogin) {
    this["attemptLogin"](cred)
  }

  private attemptLogin(cred: ILogin) {
    return from(this["auth"]["signInWithEmailAndPassword"](cred["email"], cred["password"])).subscribe(
      userCred=> {  this["triggerAuthEvent"](true); return userCred},
      err=> this["logger"]["logError"](new Error(`Unsuccessful Login Attempt: ${err}`), null, EEventType.Auth)
    )
  }

  public logout(): Observable<void> {
    this["triggerAuthEvent"](false)
    return from(
      this["auth"]["signOut"]()
    )
  }

  public popOutLogin(provider = 'google'){
    this["logger"]["logError"](new Error('Third Party Authentitcation has not yet been enabled.'), this._user, EEventType.Auth);

    const WHEN_IMPLEMENTED=false;

    if (WHEN_IMPLEMENTED){
      this["triggerAuthEvent"](true)
      if (provider=="google"){
        return from(this["auth"]["signInWithPopup"](new firebase.auth.GoogleAuthProvider()))
      }
      if (provider=="facebook"){
        return from(this["auth"]["signInWithPopup"](new firebase.auth.FacebookAuthProvider()))
      }
      if (provider=="twitter"){
        return from(this["auth"]["signInWithPopup"](new firebase.auth.TwitterAuthProvider()))
      }
      if (provider=="github"){
      return from(this["auth"]["signInWithPopup"](new firebase.auth.GithubAuthProvider()))
      }


      if (provider="phone"){
        return from(this["auth"]["signInWithPopup"](new firebase.auth.PhoneAuthProvider()))
      }
    }
    return from([])
  }

  public claims(): IdTokenResult["claims"][] {
    return this["_claims"]
  }

  public user(): User {
    return this["_user"] ?? null
  }

  public IS_ADMIN(): boolean{
    return this["_isAdmin"]
  }

  makeAdmin(){
    this["auth"]
    this["getUserTokenResult"](this._user).subscribe(
      token=> token.claims
    )

  }

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

  private triggerAuthEvent(loggedIn: boolean): void  {
    this["authEvent"]["next"](loggedIn);
  }

  private getCurrentUser(auth: AngularFireAuth): Observable<User> {
    return from(auth.currentUser);
  }

  private getUserTokenResult(user: User): Observable<IdTokenResult> {
    return !!user? from(user.getIdTokenResult()):from([]);
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


}
