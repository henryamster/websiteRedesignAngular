import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ResponsiveService } from 'src/app/generic/responsive.service';
import { IBlogComment } from 'src/app/models/blogPost';

@Component({
  selector: 'app-blog-comment',
  templateUrl: './blog-comment.component.html',
  styleUrls: ['./blog-comment.component.scss']
})
export class BlogCommentComponent implements OnInit {

  constructor(private sanitizer: DomSanitizer,
    private size:ResponsiveService,
    ) { }

  @Input('comment') comment: IBlogComment;
  CONTENT_PAD_SIZE=30

  ngOnInit(): void {
  }

  // public commentBodySanitized(){
  //  return this.sanitizer.bypassSecurityTrustHtml(this.comment.commentBody)
  // }

  maxWidth:number=this.size.initialSize().width - this.CONTENT_PAD_SIZE ;
  maxHeight:number= this.size.initialSize().height- this.CONTENT_PAD_SIZE;

  public commentBodySanitized(){
    console.log(this.combineStyleSheetAndCommentBody())
    return this.sanitizer.bypassSecurityTrustHtml(this.combineStyleSheetAndCommentBody())
  }

  styleSheet= `
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
  `

  private combineStyleSheetAndCommentBody(): string {
    return this.comment.commentBody + this.styleSheet;
  }

}
