import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFireFunctions } from '@angular/fire/functions';
import { map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { FunctionResponse } from './../../../functions/src/index';
import { BugReport, EEventType, IBugReport, IPostBugReport } from '../generics/log-item';
import { AngularFirestore } from '@angular/fire/firestore';
import { QUERY_PATHS } from './api-helpers';
import { LoggerService } from '../generic/logger.service';
import { AuthService } from '../auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class BugReportService {

  constructor(
    private snackbar: MatSnackBar,
    private functions: AngularFireFunctions,
    private angularFire: AngularFirestore,
    private loggerService: LoggerService,
    private authService: AuthService) {
  }

/**
 * Send a bug report to the server.
 * @param {IPostBugReport} bugReport - IPostBugReport
 * @returns The response from the server.
 */
  submitBugReport(bugReport: IPostBugReport): Observable<FunctionResponse> {
    return this.sendRequest(bugReport).pipe(
      tap(_response => this.checkForSuccessFromServer(_response)),
    );
  }

 /**
  * *This function will remove a bug report from the bug report list.*
  * @param {string} id - string
  * @returns The function is returning the bug report that was removed.
  */
  dismissBugReport(id: string) : Observable<Promise<void>>{
    return this.removeBugReport(id);
  }

 /* Extracting the data from the result object and mapping it to a new object with the id as the key
 and the data as the value. */
  extractData = (result) => result.map(x => ({id: x.id, ...x.data}));

/**
 * Cannot generate summary
 * @returns The entire array of bug reports.
 */
  grabBugReport(): Observable<IBugReport[]>{
    return this.retrieveBugReports().pipe(map(x => this.extractData(x) as IBugReport[]));
  }

 /**
  * `sendRequest` is a function that takes in a `bugReport` object and returns an `Observable` of a
  * `FunctionResponse` object.
  * @param {IPostBugReport} bugReport - IPostBugReport
  * @returns The function response.
  */
  private sendRequest(bugReport: IPostBugReport): Observable<FunctionResponse> {
    return this.functions
      .httpsCallable('submitBugReport')(
        bugReport as IPostBugReport
      );
  }

 /**
  * Cannot generate summary
  * @returns The map function is returning an array of objects. Each object is a bug report.
  */
  private retrieveBugReports() : Observable<any>{
   return this.angularFire.collection(QUERY_PATHS.BUG_REPORT).get()
   .pipe(
     map(
       x => x.docs.map(y =>
        {
        const data = y.data() as IPostBugReport;
        const id = y.id;
        return { id, ...data } as IBugReport;
        }
    )));
  }

/**
 * Cannot generate summary
 * @param {string} id - string - The id of the bug report to delete.
 * @returns The observable of the bug report.
 */
  private removeBugReport(id: string) : Observable<Promise<void>>{
    return of(this.deleteBugReport(id));

  }



/**
 * Delete a bug report from the database.
 * @param {string} id - string - The id of the bug report to dismiss.
 * @returns The result of the delete operation.
 */
  private deleteBugReport(id: string) : Promise<void> {
    return this.angularFire.doc(QUERY_PATHS.BUG_REPORT + `/${id}`).delete()
    .then(result => result
      )
      .catch(
        err => this.loggerService.logError(
          new Error(`Could not dismiss bug report:${err} `),
          this.authService.user(),
          EEventType.Server
        )
      );
  }


/**
 * Check if the server returned a success message. If it did, show a success snackbar. If it didn't,
 * show an error snackbar.
 * @param {any} result - any
 * @returns The result of the server call.
 */
  private checkForSuccessFromServer(result: any): void {

    if (!result.success) {
      this.showErrorSnackbar(`Something went wrong.`);
      return;
    }
    this.showSuccessSnackbar();


  }

/**
 * `This function shows a success snackbar when the form is submitted.`
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
  * `showErrorSnackbar` is a function that displays a snackbar with a message.
  * @param {string} message - string - The message to display in the snackbar.
  */
  private showErrorSnackbar(message: string): void {
    this.snackbar.open(
      `There was an error: ${message}`,
      'Okay!',
      {
        duration: 800,
        verticalPosition: 'bottom',
        horizontalPosition: 'center'
      }
    );
  }
}
