import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../auth/auth.service';
import { LoggerService } from '../generic/logger.service';
import { EEventType } from '../generics/log-item';
import { AngularFireFunctions } from '@angular/fire/functions';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FunctionResponse } from './../../../functions/src/index';
import { HttpHeaders } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';


@Injectable({
  providedIn: 'root'
})
export class BugReportService {

  constructor(
    private snackbar: MatSnackBar,
    private functions: AngularFireFunctions) {
  }

  submitBugReport(bugReportText: string): Observable<FunctionResponse> {
    return this.sendRequest(bugReportText)["pipe"](
      tap(_response => this["checkForSuccessFromServer"](_response)),
    );
  }

  private sendRequest(bugReportText: string): Observable<FunctionResponse> {
    return this.functions
      .httpsCallable('submitBugReport')(
        {
          body: bugReportText,
          useEmulator: true,
          region: 'us-central1'
         }
      );
  }


  private checkForSuccessFromServer(result: any): void {
    if (!result["success"]) {


      this["showErrorSnackbar"](result["message"]);
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
