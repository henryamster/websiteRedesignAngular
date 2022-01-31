import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { debug } from 'console';
import { BlogService } from 'src/app/api/blog.service';
import { AuthService } from 'src/app/auth/auth.service';
import { ResponsiveService } from 'src/app/generic/responsive.service';
import { BlogComment, IBlogComment, IBlogPost } from 'src/app/models/blogPost';

@Component({
  selector: 'app-blog-comment',
  templateUrl: './blog-comment.component.html',
  styleUrls: ['./blog-comment.component.scss']
})
export class BlogCommentComponent  {

  constructor(private sanitizer: DomSanitizer,
              private size: ResponsiveService,
              private auth: AuthService,
              private blog: BlogService,
              private snackbar: MatSnackBar
    ) { }

  @Input() comment: IBlogComment;
  @Input() blogPostRef?: string;
  CONTENT_PAD_SIZE = 30;

  // public commentBodySanitized(){
  //  return this.sanitizer.bypassSecurityTrustHtml(this.comment.commentBody)
  // }

  maxWidth: number = this.size.initialSize().width - this.CONTENT_PAD_SIZE ;
  maxHeight: number = this.size.initialSize().height - this.CONTENT_PAD_SIZE;

  styleSheet = `
  <style>
  .body img{
    max-width:${this.maxWidth}px;
    max-height:${this.maxHeight}px;
    width:auto;
    height:auto;
  }
  .body{
    text-align:center;
    padding:2em;
  }
  </style>
  `;



  /**
   * Returns true if the current user is an administrator.
   * @returns The function isAdmin() is returning a boolean value.
   */
  isAdmin(){
    return this.checkAdmin();
  }

  private checkAdmin() {
    return this.auth.IS_ADMIN();
  }

 /**
  * * Combine the style sheet and the comment body into one string.
  * @returns The sanitized html.
  */
  public commentBodySanitized(){

    return this.sanitizer.bypassSecurityTrustHtml(this.combineStyleSheetAndCommentBody());
  }

  /**
   * Combine the comment body and the style sheet.
   * @returns The style sheet and the comment body.
   */
  private combineStyleSheetAndCommentBody(): string {
    return this.comment.commentBody + this.styleSheet;
  }

  approveComment(){
    this.blog.approveComment(this.blogPostRef, this.comment)
      .subscribe(_ => {this.comment.approved = true;

                       this.snackbar.open(`Approved comment by ${this.comment.displayName}!`, 'ok', {duration: 2000});
      });
  }

  deleteComment(){
    this.blog.deleteComment(this.blogPostRef, this.comment)
    .subscribe(_ => {
      this.comment = new BlogComment('Deleted', new Date(), 'Comment deleted.', true, 'deleted', );
      this.snackbar.open(`Deleted comment by ${this.comment.displayName}!`, 'ok', {duration: 2000});
    });
  }

}
