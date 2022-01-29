import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-brand-logo',
  templateUrl: './brand-logo.component.html',
  styleUrls: ['./brand-logo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BrandLogoComponent implements OnInit {

  constructor() { }

  @Input() expandedLineHeight = false;
  ngOnInit(): void {
  }

}
