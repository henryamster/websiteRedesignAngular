import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { from, Observable, pipe, Subject, throwError } from 'rxjs';
import { ILogin } from '../generics/login';
import { IdTokenResult, User, UserCredential } from '@firebase/auth-types'
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private _user: User
  private _isAdmin: boolean = false
  public authEvent: Subject<boolean>
  private _claims: IdTokenResult["claims"][]

  constructor(private auth: AngularFireAuth) {
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



  public login(cred: ILogin): Observable<UserCredential> {
    this["triggerAuthEvent"](true)
    return from(
      this["auth"]["signInWithEmailAndPassword"](
        cred["email"], cred["password"]
      )
    )
  }

  public logout(): Observable<void> {
    this["triggerAuthEvent"](false)
    return from(
      this["auth"]["signOut"]()
    )
  }

  public claims(): IdTokenResult["claims"][] {
    return this["_claims"]
  }

  public user(): User {
    return this["_user"]
  }

  public IS_ADMIN(): boolean{
    return this["_isAdmin"]
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
