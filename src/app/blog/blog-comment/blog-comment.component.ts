import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { IBlogComment } from 'src/app/models/blogPost';

@Component({
  selector: 'app-blog-comment',
  templateUrl: './blog-comment.component.html',
  styleUrls: ['./blog-comment.component.scss']
})
export class BlogCommentComponent implements OnInit {

  constructor(private sanitizer: DomSanitizer) { }

  @Input('comment') comment: IBlogComment;
  ngOnInit(): void {
  }

  public commentBodySanitized(){
   return this.sanitizer.bypassSecurityTrustHtml(this.comment.commentBody)
  }

}
