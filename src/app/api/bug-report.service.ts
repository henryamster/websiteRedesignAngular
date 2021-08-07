import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFireFunctions } from '@angular/fire/functions';
import { map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { FunctionResponse } from './../../../functions/src/index';
import { BugReport, EEventType, IBugReport } from '../generics/log-item';
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
    private angularFire:AngularFirestore,
    private loggerService: LoggerService,
    private authService: AuthService) {
  }

  submitBugReport(bugReport): Observable<FunctionResponse> {
    return this.sendRequest(bugReport)["pipe"](
      tap(_response => this["checkForSuccessFromServer"](_response)),
    );
  }

  dismissBugReport(id:string){
    return this.removeBugReport(id)
  }

  extractData = (result) => result.map(x=>{ return {id:x.id, ...x.data}})

  grabBugReport() : Observable<IBugReport[]>{
    return this.retrieveBugReports().pipe(map(x=>this.extractData(x) as IBugReport[]))
  }

  private sendRequest(bugReportText: string): Observable<FunctionResponse> {
    return this.functions
      .httpsCallable('submitBugReport')(
        bugReportText as IBugReport
      );
  }

  private retrieveBugReports(){
   return this.angularFire.collection(QUERY_PATHS.BUG_REPORT).get()
   .pipe(
     map(
       x=>x.docs.map(y=>
        {
        const data = y.data() as IBugReport;
        const id = y.id;
        return { id, ...data } as IBugReport;
        }
    )))
  }

  private removeBugReport(id:string){
    return of(this.deleteBugReport(id));

  }



  private deleteBugReport(id: string) {
    return this.angularFire.doc(QUERY_PATHS.BUG_REPORT + `/${id}`).delete()
    .then(result => console.log(result)
      )
      .catch(
        err => this.loggerService.logError(
          new Error(`Could not dismiss bug report:${err} `),
          this.authService.user(),
          EEventType.Server
        )
      );
  }


  private checkForSuccessFromServer(result: any): void {
    debugger
    if (!result["success"]) {
      this["showErrorSnackbar"](`Something went wrong.`);
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

  private showErrorSnackbar(message:string): void {
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
