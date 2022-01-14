import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FunctionResponse } from 'functions/src/index';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/internal/operators/tap';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { LoggerService } from '../generic/logger.service';
import { EEventType } from '../generics/log-item';
import { ContactModel, IContactModel, IPostContactModel, PostContactModel } from '../models/contact';
import { QUERY_PATHS } from './api-helpers';

@Injectable({
  providedIn: 'root'
})
export class InquiryService {


  constructor(
    private snackbar: MatSnackBar,
    private logger: LoggerService,
    private functions: AngularFireFunctions,
    private auth: AuthService,
    private angularFire: AngularFirestore

  ) { }

  public submitContact(contact: PostContactModel): Observable<FunctionResponse> {
    return this.sendRequest(contact)["pipe"](
      tap(_response => this["checkForSuccessFromServer"](_response)),
    );
  }

  private sendRequest(contact: IPostContactModel): Observable<FunctionResponse> {
    return this.functions
      .httpsCallable('submitInquiry')(
        contact
      );
  }
  extractData = (result) => result.map(x=>{ return {id:x.id, ...x.data}})

  grabInquiries() :Observable<IContactModel[]>{
    return this.retrieveInquiries().pipe(map(x=>this.extractData(x) as IContactModel[]))
  }

  private retrieveInquiries(){
    return this.angularFire.collection(QUERY_PATHS.INQUIRY).get()
    .pipe(map(
      x=>x.docs.map(y=>{
        const data = y.data() as IPostContactModel;
        const id = y.id;
        return {id, ...data} as IContactModel;
      }
    )))
  }

  dismissInquiry(id:string){
    return this.removeInquiry(id)
  }

  private removeInquiry(id:string){
    return of(this.deleteInquiry(id))
  }

  private deleteInquiry(id:string){
    return this.angularFire.doc(QUERY_PATHS.INQUIRY + `/${id}`).delete()
    .then(result => result
      )
      .catch(
        err => this.logger.logError(
          new Error(`Could not dismiss inquiry:${err} `),
          this.auth.user(),
          EEventType.Server
        )
      );
  }

  private checkForSuccessFromServer(result: any): void {
    if (!result["success"]) {
      this["throwServerError"](result);
      return;
    }
    this["showSuccessSnackbar"]()
  }

  private showSuccessSnackbar(): void {
    this.snackbar.open(
      `Successfully submitted!`,
      'Okay!',
      {
        duration: 800,
        verticalPosition: 'bottom',
        horizontalPosition: 'center'
      }
    );
  }

  private throwServerError(result: any): void {
    const serverMessage = result
    this.logger.logError(
      new Error('HTTP Error'),
      this["auth"]["user"](),
      EEventType.Server,
      { serverMessage }
    )

  }
}
