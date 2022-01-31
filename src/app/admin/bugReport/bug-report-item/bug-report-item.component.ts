import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BugReportService } from 'src/app/api/bug-report.service';
import { IBugReport, ILogItem } from 'src/app/generics/log-item';

@Component({
  selector: 'app-bug-report-item',
  templateUrl: './bug-report-item.component.html',
  styleUrls: ['./bug-report-item.component.scss']
})
export class BugReportItemComponent implements OnInit {

  constructor(private bugReportService: BugReportService) { }

  @Input() bugReport: IBugReport;
  @Output() deleteEvent: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  ngOnInit(): void {
  }

/**
 * *Dismiss a bug report by id.*
 * @param {string} id - string - The id of the bug report to dismiss.
 */
  dismissBugReport(id: string){
    this.dismiss(id);
  }


 /**
  * `dismiss(id: string)`
  *
  * This function is used to dismiss a bug report. It takes in a string parameter `id` and uses it to
  * call the `dismissBugReport` function of the `BugReportService` class. It then emits a boolean value
  * to the `deleteEvent` event.
  * @param {string} id - string - The id of the bug report to dismiss.
  */
  private dismiss(id: string) {
    this.bugReportService.dismissBugReport(id).subscribe(_ => this.deleteEvent.emit(true));
  }
}
