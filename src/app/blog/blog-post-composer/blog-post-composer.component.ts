import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlogPost, IBlogPost, PostType } from 'src/app/models/blogPost';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { BlogService } from 'src/app/api/blog.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-blog-post-composer',
  templateUrl: './blog-post-composer.component.html',
  styleUrls: ['./blog-post-composer.component.scss']
})
export class BlogPostComposerComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private blog: BlogService,
    private alert: MatSnackBar
  ) { }
  blogPost: IBlogPost;
  blogPostForm: FormGroup;
  blogPostInitialized = false;
  removable: boolean = true;
  hideComposer: boolean = true;
  @Input('editableBlogPost') editableBlogPost?: IBlogPost;
  editMode: boolean = false;
  // for chip-lists
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
 /**
  * Add a new tag to the list of tags.
  * @param {MatChipInputEvent} event - MatChipInputEvent
  * @param {string} formControl - string - The name of the form control that the chip input belongs to.
  */
  add(event: MatChipInputEvent, formControl: string): void {
    const value = (event.value || '').trim();


    if (value) {
      //this.blogPostForm.controls.tags.setValue([...this.blogPostForm.controls.tags.value, value]);
      this.blogPostForm.controls[formControl].value.push(value)
      this.blogPostForm.controls[formControl].updateValueAndValidity()
    }

    // Clear the input value
    event.chipInput!.clear();
  }

 /**
  * Remove a tag from a form control.
  * @param {string} tag - string - The tag to remove.
  * @param {string} formControl - string - The name of the form control that the tag should be removed
  * from.
  */
  remove(tag: string, formControl: string): void {
    const index = this.blogPostForm.controls[formControl].value.indexOf(tag);

    if (index >= 0) {
      this.blogPostForm.controls[formControl].value.splice(index, 1);
    }

    this.blogPostForm.controls[formControl].updateValueAndValidity()
  }

  ngOnInit(): void {

    if (!!this.editableBlogPost) {
      this.fillFormWithEditablePost();
      this.editMode = true
    }
    else {
      this.fillFormWithEmptyPost();
    }

    this.previewPost()
    this.blogPostInitialized = true;

    this.blogPostForm.valueChanges.subscribe(x => this.previewPost())



  }
  postTypes = [
    { val: PostType.EXPIRING, text: PostType.EXPIRING },
    { val: PostType.FULL_BLOG_POST, text: PostType.FULL_BLOG_POST },
    { val: PostType.SHORT_POST, text: PostType.SHORT_POST },
    { val: PostType.SOCIAL_MEDIA, text: PostType.SOCIAL_MEDIA },
    { val: PostType.UNCATEGORIZED, text: PostType.UNCATEGORIZED }
  ]

 /**
  * gen empty post
  */
  private fillFormWithEmptyPost() {
    this.blogPostForm = this.fb.group({
      slug: ['', Validators.required],
      title: ['', Validators.required],
      author: [''],
      body: ['', Validators.required],
      imageLinks: [[]],
      codepenSlugs: [[]],
      youtubeLinks: [[]],
      links: [[]],
      tags: [[]],
      type: [PostType.FULL_BLOG_POST],
      expiryDate: [null]
    });
  }

  /**
   * Fill the form with the data from the blog post that is being edited.
   */
  private fillFormWithEditablePost() {
    this.blogPostForm = this.fb.group(
      {
        slug: [this.editableBlogPost.slug, Validators.required],
        title: [this.editableBlogPost.title, Validators.required],
        author: [this.editableBlogPost.author],
        body: [this.editableBlogPost.body, Validators.required],
        imageLinks: [this.editableBlogPost.imageLinks],
        codepenSlugs: [this.editableBlogPost.codepenSlugs],
        youtubeLinks: [this.editableBlogPost.youtubeLinks],
        links: [this.editableBlogPost.links],
        tags: [this.editableBlogPost.tags],
        type: [PostType.FULL_BLOG_POST],
        expiryDate: [this.editableBlogPost.expiryDate]
      }
    );
  }

 /**
  * If the form is valid and we are not in edit mode, then submit the blog post. If the form is valid
  * and we are in edit mode, then update the blog post.
  */
  public submitBlogPost() {
    if (this.blogPostForm.valid && !this.editMode) {
      this.blog.post(this.blogPost)
      this.displaySuccessMesageAndCloseAndResetComposer();
    }

    if (this.blogPostForm.valid && this.editMode) {
      this.blog.update(this.blogPost)
      this.displaySuccessMesageAndCloseAndResetComposer();
    }

  }

  private displaySuccessMesageAndCloseAndResetComposer() {
    this.displaySuccessMessage();
    this.resetAndCloseComposer();
  }

  private displaySuccessMessage() {
    this.alert.open(`Successfully ${this.editMode ? 'edited ' : 'posted '} ${this.blogPost.title}!`, 'Okay');
  }

  /**
   * Reset the form and hide the composer.
   */
  private resetAndCloseComposer() {
    this.blogPostForm.reset();
    this.hideComposer = true;
  }

  private previewPost(): void {
    this.blogPost = this.createMockPost();
  }

  /**
   * Create a mock post from the form values.
   * @returns The blog post.
   */
  private createMockPost(): IBlogPost {
    return new BlogPost(
      this.blogPostForm.controls.slug.value ?? 'untitled',
      this.blogPostForm.controls.title.value ?? 'no title',
      this.blogPostForm.controls.body.value ?? 'no body',
      this.blogPostForm.controls.slug.value ?? ' no slug',
      this.blogPostForm.controls.type.value ?? PostType.FULL_BLOG_POST,
      new Date(),
      this.blogPostForm.controls.author.value ?? 'no author',
      this.blogPostForm.controls.imageLinks.value ?? [],
      this.blogPostForm.controls.codepenSlugs.value ?? [],
      this.blogPostForm.controls.youtubeLinks.value ?? [],
      this.blogPostForm.controls.links.value ?? [],
      this.blogPostForm.controls.tags.value ?? [],
      this.blogPostForm.controls.expiryDate.value ?? null,
      []
    );
  }
}
