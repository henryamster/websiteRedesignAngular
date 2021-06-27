import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';
import { delay, tap, timeout } from 'rxjs/operators';
import { ILogItem } from 'src/app/generics/log-item';

@Component({
  selector: 'app-bug-report',
  templateUrl: './bug-report.component.html',
  styleUrls: ['./bug-report.component.scss']
})
export class BugReportComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:ILogItem,
    public dialogRef: MatDialogRef<BugReportComponent>
  ) { }
  notClosing:boolean = true;
  logItem: ILogItem
  ngOnInit(): void {
    this["logItem"] = this["data"]
  }
  close(){
    of(true).pipe(
      tap(_=> this["notClosing"] =!_),
      delay(2000),
      tap(_=>this["dialogRef"]["close"]())
    )["subscribe"]()



  }

}


