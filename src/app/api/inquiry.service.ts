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

  /**
   * Send a PostContactModel to the server and return the response.
   * @param {PostContactModel} contact - PostContactModel
   * @returns The response from the server.
   */
  public submitContact(contact: PostContactModel): Observable<FunctionResponse> {
    return this.sendRequest(contact)["pipe"](
      tap(_response => this["checkForSuccessFromServer"](_response)),
    );
  }

  /**
   * `sendRequest` is a function that takes in a `contact` object and returns an `Observable` of a
   * `FunctionResponse`.
   * @param {IPostContactModel} contact - IPostContactModel
   * @returns The function response.
   */
  private sendRequest(contact: IPostContactModel): Observable<FunctionResponse> {
    return this.functions
      .httpsCallable('submitInquiry')(
        contact
      );
  }
 /* Extracting the data from the result object and mapping it to a new object with the id as the key
 and the data as the value. */
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

/**
 * `dismissInquiry` is a function that removes an inquiry from the database.
 * @param {string} id - string - The id of the inquiry to be removed.
 * @returns The function is returning the observable.
 */
  dismissInquiry(id:string){
    return this.removeInquiry(id)
  }

 /**
  * `removeInquiry` is a function that takes in an `id` and returns an `Observable` of `Inquiry` that
  * emits the deleted `Inquiry` object.
  * @param {string} id - string - The id of the inquiry to be deleted.
  * @returns The observable of the deleted inquiry.
  */
  private removeInquiry(id:string){
    return of(this.deleteInquiry(id))
  }

 /**
  * `deleteInquiry` is a function that deletes an inquiry from the database.
  * @param {string} id - string - The id of the inquiry to delete.
  * @returns The result of the delete operation.
  */
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

/**
 * If the server returns a success message, show a success snackbar.
 * @param {any} result - the result of the server call
 * @returns The result of the server call.
 */
  private checkForSuccessFromServer(result: any): void {
    if (!result["success"]) {
      this["throwServerError"](result);
      return;
    }
    this["showSuccessSnackbar"]()
  }

 /**
  * `This function shows a success snackbar.`
  */
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

/**
 * `throwServerError` logs an error and throws an error.
 * @param {any} result - the result of the HTTP request
 */
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
