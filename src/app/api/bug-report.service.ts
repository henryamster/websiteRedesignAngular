import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFireFunctions } from '@angular/fire/functions';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FunctionResponse } from './../../../functions/src/index';
import { BugReport, IBugReport } from '../generics/log-item';
import { AngularFirestore } from '@angular/fire/firestore';
import { QUERY_PATHS } from './api-helpers';


@Injectable({
  providedIn: 'root'
})
export class BugReportService {

  constructor(
    private snackbar: MatSnackBar,
    private functions: AngularFireFunctions,
    private a:AngularFirestore) {
  }

  submitBugReport(bugReport): Observable<FunctionResponse> {
    return this.sendRequest(bugReport)["pipe"](
      tap(_response => this["checkForSuccessFromServer"](_response)),
    );
  }

  extractData = (result) => result.map(x=>x.data)

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
   return this.a.collection(QUERY_PATHS.BUG_REPORT).get().pipe(map(x=>x.docs.map(y=>y.data()
    )))
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
