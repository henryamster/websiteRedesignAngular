import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FunctionResponse } from 'functions/src';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/internal/operators/tap';
import { AuthService } from '../auth/auth.service';
import { LoggerService } from '../generic/logger.service';
import { EEventType } from '../generics/log-item';
import { ContactModel, IContactModel } from '../models/contact';

@Injectable({
  providedIn: 'root'
})
export class InquiryService {

  constructor(
    private snackbar: MatSnackBar,
    private logger: LoggerService,
    private functions: AngularFireFunctions,
    private auth: AuthService

  ) { }

  public submitContact(contact: ContactModel): Observable<FunctionResponse> {
    return this.sendRequest(contact)["pipe"](
      tap(_response => this["checkForSuccessFromServer"](_response)),
    );
  }

  private sendRequest(contact: IContactModel): Observable<FunctionResponse> {
    return this.functions
      .httpsCallable('submitInquiry')(
        {
          body: contact,
          useEmulator: true,
          region: 'us-central1'
        }
      );
  }

  private checkForSuccessFromServer(result: any): void {
    debugger
    if (!result["_path"]["segments"]) {
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
      {serverMessage}
    )

  }
}
