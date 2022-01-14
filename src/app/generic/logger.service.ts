import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LogTemplateComponent } from '../common/snackBar/log-template/log-template.component';
import { EEventType, ILogItem, LogAuthItem, LogErrorItem, LogLandingItem, LogServerItem } from '../generics/log-item';
import { User } from '@firebase/auth-types';
@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor(private snackBar: MatSnackBar,) {
    this["logItemPost$"] = new Subject()

    this["logItemPost$"]["pipe"](
      tap(logItem =>logItem
      )
    )

  }

  public logError(err: Error, user?: User, type=EEventType.Error, ...additionalParams) {
    let logItem;
    switch (type){
      case EEventType.Auth:
        logItem = new LogAuthItem(err, user?? null)
        break;
      case EEventType.Landing:
        logItem = new LogLandingItem(user?user:null)
        break;
      case EEventType.Server:
        logItem = new LogServerItem(err, user ?? null, additionalParams["serverMessage"])
        break;
      default:
        logItem = new LogErrorItem(err, user?? null)
        break;
    }

    this["logItems"]["push"](logItem)
    this["consLog"](logItem)
    this["displaySnackbar"](logItem)
    this["logItemPost$"]["next"](logItem)
    this["writeToLocalStorage"](logItem)
  }

  private logItems: ILogItem[] = [];
  logItemPost$: Subject<ILogItem>;

  private consLog(logItem: ILogItem) {
    console.log(
      `%c [Logging Service] :
                \n%c Something went wrong${logItem["error"] ? ': ' + logItem["error"] : '.'}
                \n%c Submitting information to logging service with incident Id: ${logItem["id"]}
                \n${JSON.stringify(logItem, null, 4)}`,
      ' padding:2px; font-weight:600; border-radius:18px; color:#C33;; font-family: Arial;font-size: 2.4em; display:grid; place-content:center; width:100%',
      ' margin-left:2em;color:#BBB; font-family: monospace;font-size: 1em; display:grid; place-content:center;',
      'margin-left:3em; color:#999; font-family: Arial;font-size: .8em; display:grid; place-content:center;'
    )
  }


  private displaySnackbar(logItem: ILogItem) {
    this["snackBar"]["openFromComponent"](LogTemplateComponent, {
      data: logItem,
      duration: 4000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: ['snackbarBG'],
    })

  }

  private writeToLocalStorage(logItem: ILogItem) {
    const MAX_SAVED_LOCALSTORAGE_LOGS = 10
    let rehydratedLogItems: ILogItem[]
    const errorLog = localStorage["getItem"]("errorLogs_")
    try { rehydratedLogItems = JSON.parse(errorLog)
          rehydratedLogItems.push(logItem)}
    // Fail gracefully
    catch (error) { rehydratedLogItems = [] }
    if (rehydratedLogItems.length>MAX_SAVED_LOCALSTORAGE_LOGS){
      rehydratedLogItems = rehydratedLogItems.slice(0,MAX_SAVED_LOCALSTORAGE_LOGS)
    }
    localStorage["setItem"]("errorLogs_", JSON["stringify"](rehydratedLogItems, null, 4))
  }

}


