import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrobblerComponent } from './scrobbler.component';

describe('ScrobblerComponent', () => {
  let component: ScrobblerComponent;
  let fixture: ComponentFixture<ScrobblerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScrobblerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrobblerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
