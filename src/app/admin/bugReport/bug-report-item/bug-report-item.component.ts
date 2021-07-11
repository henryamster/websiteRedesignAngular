import { Component, Input, OnInit } from '@angular/core';
import { ILogItem } from 'src/app/generics/log-item';

@Component({
  selector: 'app-bug-report-item',
  templateUrl: './bug-report-item.component.html',
  styleUrls: ['./bug-report-item.component.scss']
})
export class BugReportItemComponent implements OnInit {

  constructor() { }

  @Input('bugReportItem') bugReport:ILogItem
  ngOnInit(): void {
  }

}
