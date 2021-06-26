import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LogTemplateComponent } from '../common/snackBar/log-template/log-template.component';
import { ILogItem, LogErrorItem } from '../generics/log-item';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor(private snackBar: MatSnackBar, ) {
    this["logItemPost$"] = new Subject()

    this["logItemPost$"]["pipe"](
      tap(logItem =>
        // mock LogService
        console.log(`MOCK HTTP REQUEST TO POST ${console.log(this["logItems"][this.logItems["length"] - 1])}`)
      )
    )

  }

  public logError(err: Error) {
    const logItem = new LogErrorItem(err)
    this["logItems"]["push"](logItem)
    this["consLog"](logItem)
    this["displaySnackbar"](logItem)
    this["logItemPost$"]["next"](logItem)
  }

  private logItems: ILogItem[] = [];
  logItemPost$: Subject<ILogItem>;

  private consLog(logItem: ILogItem) {
    console.log(
      `%c [Logging Service] :
                \n%c Something went wrong${logItem["error"]? ': ' + logItem["error"] :'.'}
                \n%c Submitting information to logging service with incident Id: ${logItem["id"]}
                \n${JSON.stringify(logItem, null, 4)}`,
                ' padding:2px; font-weight:600; border-radius:18px; color:#C33;; font-family: Arial;font-size: 2.4em; display:grid; place-content:center; width:100%',
                ' margin-left:2em;color:#BBB; font-family: monospace;font-size: 1em; display:grid; place-content:center;',
                'margin-left:3em; color:#999; font-family: Arial;font-size: .8em; display:grid; place-content:center;'
              )
  }

  private displaySnackbar(logItem: ILogItem){
    this["snackBar"]["openFromComponent"](LogTemplateComponent, {
      data:logItem,
      duration: 4000,
      verticalPosition:'bottom',
      horizontalPosition:'right',
    })

  }



}


