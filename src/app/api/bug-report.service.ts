import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as functions from "firebase/functions";
import { AuthService } from '../auth/auth.service';
import { LoggerService } from '../generic/logger.service';
import { EEventType } from '../generics/log-item';

@Injectable({
  providedIn: 'root'
})
export class BugReportService {

  private functions;
  constructor(
    private logger: LoggerService,
    private auth: AuthService,
    private snackbar: MatSnackBar) {
    this.functions = this.functions.getFunctions()
  }

  submitBugReport(bugReportText: string) {
    this.functions
      .httpsCallable(this.functions, 'submitBugReport')(
       {body:bugReportText}
      )
      .then((result) => {
        this.checkForSuccessFromServer(result);
        this.showSuccessSnackbar()
      })
      .catch(err=>{
            this.logErrorFromServer(err);
      })
  }

  private logErrorFromServer(err: any): void {
    this.logger.logError(
      err,
      this["auth"]["user"](),
      EEventType.Server
    );
  }

  private checkForSuccessFromServer(result: any): void {
    if (!result["success"]) {
      this.logger.logError(
        result["error"],
        this["auth"]["user"](),
        EEventType.Server,
        { serverMessage: result["message"] }
      );
    }
  }

  private showSuccessSnackbar(): void {
    this.snackbar.open(
      `Bug report successfully submitted!`,
      'Okay!',
      {
        duration: 800,
        verticalPosition: 'bottom',
        horizontalPosition: 'center'
      }
    );
  }
}


