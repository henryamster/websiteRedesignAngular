import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BugReportService } from 'src/app/api/bug-report.service';
import { IBugReport, ILogItem } from 'src/app/generics/log-item';

@Component({
  selector: 'app-bug-report-item',
  templateUrl: './bug-report-item.component.html',
  styleUrls: ['./bug-report-item.component.scss']
})
export class BugReportItemComponent implements OnInit {

  constructor(private bugReportService:BugReportService) { }

  @Input('bugReport') bugReport: IBugReport
  @Output('deleteEvent') deleteEvent: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  ngOnInit(): void {
  }

  dismissBugReport(id:string){
    this.dismiss(id);
  }


  private dismiss(id: string) {
    this.bugReportService.dismissBugReport(id).subscribe(_=> this.deleteEvent.emit(true))
  }
}
