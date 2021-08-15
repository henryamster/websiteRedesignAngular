import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogTaggedComponent } from './blog-tagged.component';

describe('BlogTaggedComponent', () => {
  let component: BlogTaggedComponent;
  let fixture: ComponentFixture<BlogTaggedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogTaggedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogTaggedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
