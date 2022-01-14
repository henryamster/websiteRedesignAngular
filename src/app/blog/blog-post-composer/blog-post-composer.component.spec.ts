import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogPostComposerComponent } from './blog-post-composer.component';

describe('BlogPostComposerComponent', () => {
  let component: BlogPostComposerComponent;
  let fixture: ComponentFixture<BlogPostComposerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogPostComposerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogPostComposerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
