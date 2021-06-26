import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { ILogItem } from 'src/app/generics/log-item';

@Component({
  selector: 'app-log-template',
  templateUrl: './log-template.component.html',
  styleUrls: ['./log-template.component.scss']
})
export class LogTemplateComponent implements OnInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public logItem: ILogItem) { }
  LogItem: ILogItem

  ngOnInit(): void {
  }

}
