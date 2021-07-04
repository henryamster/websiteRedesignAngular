import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';
import { delay, tap, timeout } from 'rxjs/operators';
import { BugReportService } from 'src/app/api/bug-report.service';
import { ILogItem } from 'src/app/generics/log-item';
import { MatQuill } from 'src/app/mat-quill/mat-quill';

@Component({
  selector: 'app-bug-report',
  templateUrl: './bug-report.component.html',
  styleUrls: ['./bug-report.component.scss']
})
export class BugReportComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:ILogItem,
    public dialogRef: MatDialogRef<BugReportComponent>,
    private formBuilder: FormBuilder,
    private bugReportService: BugReportService
  ) { }
  notClosing:boolean = true;
  submitted:boolean = false;
  logItem: ILogItem
  bugReportForm:FormGroup;
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

  close(){
    of(true).pipe(
      tap(_=> this["notClosing"] =!_),
      delay(1600),
      tap(_=>this["dialogRef"]["close"]())
    )["subscribe"]()



  }

  submitBugReport(){
    debugger
    this["bugReportService"]["submitBugReport"](
      [JSON.stringify(this["logItem"]), this["bugReportForm"]["get"]('bugReportText').value].join('\n -- MESSAGE -- \n')
    )
    ["pipe"](
      tap(
      response => {
        if (!!response["_path"]["segments"]){
        this["submitted"]=true
        }
      }),
      delay(1600),
      tap(_=>this["dialogRef"]["close"]()
      )
    )["subscribe"]();

  }

}


