import { ViewportScroller } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { from, Observable } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { BlogService } from 'src/app/api/blog.service';
import { AuthService } from 'src/app/auth/auth.service';
import { ResponsiveService } from 'src/app/generic/responsive.service';
import { BlogComment, IBlogPost } from 'src/app/models/blogPost';

@Component({
  selector: 'app-blog-comment-composer',
  templateUrl: './blog-comment-composer.component.html',
  styleUrls: ['./blog-comment-composer.component.scss']
})
export class BlogCommentComposerComponent implements OnInit {

  constructor(private blog: BlogService,
    private auth:AuthService,
    private fb:FormBuilder,
    private scroller:ViewportScroller,

    ) { }
  commentForm: FormGroup;
  displayCommentForm:boolean=true;
  @Input('blogPost') blogPost:IBlogPost
  ngOnInit(): void {
    this.createForm();
  }

/**
 * *Submit the comment to the database and then hide the form and reset it.*
 */
  submitComment(){

    this.addBlogComment();
    this.hideAndResetForm();
  }

 /**
  * Hide the form and reset it.
  */
  private hideAndResetForm() {
    this.displayCommentForm = false;
    this.commentForm.reset();
  }
/**
 * Open the composer and focus on the subject line.
 */

  openComposer(){
    this.openComposerAndFocus()
  }

  /**
   * *Open the comment form and focus the composer.*
   */
  private openComposerAndFocus(){
    this["displayCommentForm"]=!this["displayCommentForm"]
    from([true]).pipe(delay(1000),tap(_=>this.focusComposer())).subscribe()
  }

  /**
   * `scrollToAnchor` scrolls the scroller to the anchor with the given id.
   */
  private focusComposer() {
    this["scroller"]["scrollToAnchor"](`${this.blogPost.id}+'_composer'`);
  }

  /**
   * Create a form group with a comment form control.
   */
  private createForm() {
    this["commentForm"] = this["fb"]["group"]({
      comment: ['', Validators.required]
    });
  }


  /**
   * If the user is logged in, add the comment to the blog post. If the user is not logged in, add the
   * comment to the blog post as an anonymous user.
   */
  private addBlogComment() {
    if(this.auth.user() != null){
    this.blog.addComment(this.blogPost, new BlogComment(
      this.auth.user().displayName,
      new Date(),
      this["commentForm"].controls.comment.value,
      false,
      this.auth.user().email,
      this.auth.user().photoURL),
      ).subscribe(_=>this.refreshBlogPost())
    }
    else {
      this.blog.addComment(
        this.blogPost,
        new BlogComment(
          'Anonymous User',
          new Date(),
          this["commentForm"].controls.comment.value,
          false,
          'Posting Anonymously',
          null
        )
      ).subscribe(_=>this.refreshBlogPost())
    }
  }

  private refreshBlogPost() {
    this.blog.getPost(this.blogPost.slug).subscribe(
      blogPost => this["blogPost"] = blogPost[0]
    );

  }
}
