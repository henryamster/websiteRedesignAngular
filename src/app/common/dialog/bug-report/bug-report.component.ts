import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';
import { delay, tap, timeout } from 'rxjs/operators';
import { BugReportService } from 'src/app/api/bug-report.service';
import { BugReport, ILogItem, PostBugReport } from 'src/app/generics/log-item';
import { MatQuill } from 'src/app/mat-quill/mat-quill';

@Component({
  selector: 'app-bug-report',
  templateUrl: './bug-report.component.html',
  styleUrls: ['./bug-report.component.scss']
})
export class BugReportComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ILogItem,
    public dialogRef: MatDialogRef<BugReportComponent>,
    private formBuilder: FormBuilder,
    private bugReportService: BugReportService
  ) { }
  notClosing: boolean = true;
  submitted: boolean = false;
  logItem: ILogItem
  bugReportForm: FormGroup;
  @ViewChild('bugReportEditor', {
    static: true
  }) bugtext: MatQuill



  ngOnInit(): void {
    this["logItem"] = this["data"]
    this.createFormGroup();
  }
  private createFormGroup() {
    this["bugReportForm"] = this["formBuilder"]["group"]({
      bugReportText: ['', Validators.required]
    });
  }

 /**
  * *When the user clicks the close button, the dialog will close after 1600 milliseconds.*
  */
  close() {
    of(true).pipe(
      tap(_ => this["notClosing"] = !_),
      delay(1600),
      tap(_ => this["dialogRef"]["close"]())
    )["subscribe"]()



  }

  /**
   * Submit a bug report to the bug report service.
   */
  submitBugReport() {
    debugger
    this["bugReportService"]["submitBugReport"](
      new PostBugReport(this["logItem"],this["bugReportForm"]["get"]('bugReportText').value)
       )
    ["pipe"](
      tap(
        response => {
          if (!!response["success"]) {
            this["submitted"] = true
          }
        }),
      delay(1600),
      tap(_ => this["dialogRef"]["close"]()
      )
    )["subscribe"]();

  }

}

