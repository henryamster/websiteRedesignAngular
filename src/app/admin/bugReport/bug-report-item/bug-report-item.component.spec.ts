import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BugReportItemComponent } from './bug-report-item.component';

describe('BugReportItemComponent', () => {
  let component: BugReportItemComponent;
  let fixture: ComponentFixture<BugReportItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BugReportItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BugReportItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
