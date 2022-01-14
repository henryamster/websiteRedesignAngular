import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InquiryItemComponent } from './inquiry-item.component';

describe('InquiryItemComponent', () => {
  let component: InquiryItemComponent;
  let fixture: ComponentFixture<InquiryItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InquiryItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InquiryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
