import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { pipe } from 'rxjs';
import { ResponsiveService } from 'src/app/generic/responsive.service';
import { ILogItem } from 'src/app/generics/log-item';
import { EEventType } from 'src/app/generics/log-item';
import { IWindowSize } from 'src/app/generics/window-size';
import { BugReportComponent } from '../../dialog/bug-report/bug-report.component';

@Component({
  selector: 'app-log-template',
  templateUrl: './log-template.component.html',
  styleUrls: ['./log-template.component.scss']
})
export class LogTemplateComponent implements OnInit, OnDestroy {
  public get eventType() {
    return EEventType;
  };
  constructor(@Inject(MAT_SNACK_BAR_DATA) public logItem: ILogItem,
              private dialog: MatDialog,
              private resize: ResponsiveService
  ) { }
  LogItem: ILogItem
  bugReportModal: MatDialogRef<BugReportComponent>
  windowSize: IWindowSize;

  ngOnInit(): void {
    this["windowSize"]= this["resize"]["initialSize"]()
  }

  ngOnDestroy(): void {

  }

  openBugReport(){
    this["bugReportModal"] = this["dialog"]["open"](
      BugReportComponent,
      {
        autoFocus: true,
        maxHeight:'800px',
        backdropClass:['glassBlur'],
        data: this["logItem"],
      }
    )
  }


  private mobile() {
    return this["windowSize"]["width"] < 600;
  }
}
