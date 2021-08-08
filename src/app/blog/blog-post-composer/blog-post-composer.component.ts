import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlogPost, IBlogPost, PostType } from 'src/app/models/blogPost';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { BlogService } from 'src/app/api/blog.service';
@Component({
  selector: 'app-blog-post-composer',
  templateUrl: './blog-post-composer.component.html',
  styleUrls: ['./blog-post-composer.component.scss']
})
export class BlogPostComposerComponent implements OnInit {

  constructor(private fb: FormBuilder, private blog: BlogService) { }
  blogPost:IBlogPost;
  blogPostForm: FormGroup;
  blogPostInitialized=false;
removable:boolean=true;

  // for chip-lists
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  add(event: MatChipInputEvent, formControl:string): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      //this.blogPostForm.controls.tags.setValue([...this.blogPostForm.controls.tags.value, value]);
      this.blogPostForm.controls[formControl].value.push(value)
      this.blogPostForm.controls[formControl].updateValueAndValidity()
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(tag: string, formControl:string): void {
    const index = this.blogPostForm.controls[formControl].value.indexOf(tag);

    if (index >= 0) {
      this.blogPostForm.controls[formControl].value.splice(index, 1);
    }

    this.blogPostForm.controls[formControl].updateValueAndValidity()
  }


  ngOnInit(): void {
    this.blogPostForm= this.fb.group({

      slug: ['',Validators.required],
      title: ['',Validators.required],
      author:  [''],
      body: ['', Validators.required],
      imageLinks: [[]],
      codepenSlugs: [[]],
      youtubeLinks: [[]],
      links:  [[]],
      tags:  [[]],
      type: [PostType.FULL_BLOG_POST ],
      expiryDate: [null]
    })

    this.previewPost()
    this.blogPostInitialized=true;

    this.blogPostForm.valueChanges.subscribe(x=>this.previewPost())



  }
  postTypes = [
    { val: PostType.EXPIRING, text: PostType.EXPIRING },
    { val: PostType.FULL_BLOG_POST, text: PostType.FULL_BLOG_POST },
    { val: PostType.SHORT_POST, text: PostType.SHORT_POST},
    {val:PostType.SOCIAL_MEDIA, text: PostType.SOCIAL_MEDIA},
    {val: PostType.UNCATEGORIZED, text: PostType.UNCATEGORIZED}
  ]

  public submitBlogPost(){
    if (this.blogPostForm.valid){
      this.blog.post(this.blogPost)
    }

  }

  private previewPost(): void {
    this.blogPost = this.createMockPost();
  }

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
