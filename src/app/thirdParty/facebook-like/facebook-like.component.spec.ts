import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacebookLikeComponent } from './facebook-like.component';

describe('FacebookLikeComponent', () => {
  let component: FacebookLikeComponent;
  let fixture: ComponentFixture<FacebookLikeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacebookLikeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacebookLikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
