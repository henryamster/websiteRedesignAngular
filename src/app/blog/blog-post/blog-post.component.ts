import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Timestamp } from '@google-cloud/firestore';
import { ResponsiveService } from 'src/app/generic/responsive.service';
import { IBlogPost } from 'src/app/models/blogPost';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss']
})
export class BlogPostComponent implements OnInit {

  constructor(private sanitizer: DomSanitizer,
    private size:ResponsiveService) { }
  @Input('blogPost') blogPost:IBlogPost
  @Input('displayCommentComposer') displayCommentComposer:boolean=false
  @Input('showComments') showComments:boolean=false;

  now: number;
  blogSingleUrl: string;
  tagSingleUrl:string;
  // responsiveBodyContent$:Subscription;
  CONTENT_PAD_SIZE=30


  public hasNotReachedExpiryDate(){
    if (this.hasAnExpirationDate()) return this.asTrueWhenExpirationDateHasNotPassed()
    return true;
  }

  ngOnInit(): void {
    this["now"]=Date.now();
    this["host"]=`${environment.location}post/${this.blogPost.slug}`;
    this["tagSingleUrl"]=`${environment.location}post/tagged/`;
    // this["responsiveBodyContent$"]=this.watchWindowSizeForBodyContent().subscribe()
  }

  ngOnDestroy(): void {
    // this["responsiveBodyContent$"].unsubscribe()
  }

  // private watchWindowSizeForBodyContent() {
  //   return this.size.resizeWindowSize$
  //   .pipe(
  //     map(size =>
  //       [this.maxWidth, this.maxHeight] =
  //        [size.width- this.CONTENT_PAD_SIZE,
  //         size.height- this.CONTENT_PAD_SIZE]
  //         ),
  //     tap(_=>this.blogPost.body=<string>this.postBodySanitized()));

  // }

  public generateTagUrl(tag:string){
    return this["tagSingleUrl"] + tag
  }




  maxWidth:number=this.size.initialSize().width - this.CONTENT_PAD_SIZE ;
  maxHeight:number= this.size.initialSize().height- this.CONTENT_PAD_SIZE;

  public postBodySanitized(){
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
  }
  </style>
  `

  private combineStyleSheetAndCommentBody(): string {
    return this.blogPost.body + this.styleSheet;
  }

  private asTrueWhenExpirationDateHasNotPassed() : boolean {
    if (this["blogPost"]["expiryDate"] instanceof Date){
      return (this["blogPost"]["expiryDate"]as Date) < new Date()
    }
 console.log((this["blogPost"]["expiryDate"] as Timestamp).seconds*1000,new Date().getTime()*1000)
    return (this["blogPost"]["expiryDate"] as Timestamp).seconds*1000<new Date().getTime()*1000
  }

  private hasAnExpirationDate() : boolean {
    return !!this.blogPost.expiryDate;
  }





}
