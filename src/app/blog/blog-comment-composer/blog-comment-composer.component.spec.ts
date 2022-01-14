import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogCommentComposerComponent } from './blog-comment-composer.component';

describe('BlogCommentComposerComponent', () => {
  let component: BlogCommentComposerComponent;
  let fixture: ComponentFixture<BlogCommentComposerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogCommentComposerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogCommentComposerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
