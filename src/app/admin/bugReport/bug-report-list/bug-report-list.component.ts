import { Component, Input, OnInit } from '@angular/core';
import { BugReportService } from 'src/app/api/bug-report.service';
import { IBugReport, ILogItem } from 'src/app/generics/log-item';

@Component({
  selector: 'app-bug-report-list',
  templateUrl: './bug-report-list.component.html',
  styleUrls: ['./bug-report-list.component.scss']
})
export class BugReportListComponent implements OnInit {

  constructor(private bugReportService: BugReportService) { }
  bugReports:IBugReport[];
  loading: boolean=true;
  // @Input() bugReports: ILogItem
  ngOnInit(): void {
    this.grabBugReport();
  }
  deleteEvent(reload:boolean=true){
    if (reload) this.grabBugReport();
  }

  private grabBugReport() {
    this.bugReportService.grabBugReport()
      .subscribe(bugReports => this["bugReports"] = bugReports)
      .add(_ => { this["loading"] = false; });
  }



}
