import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
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


/**
 * Returns true if the current date is before the expiration date.
 * @returns true
 */
  public hasNotReachedExpiryDate(){
    if (this.hasAnExpirationDate()) return this.asTrueWhenExpirationDateHasNotPassed()
    return true;
  }

/**
 * * The `ngOnInit()` function is called when the component is initialized.
 * * It is a good place to initialize variables that are used in the component.
 * * In this case, we initialize the `postBodySanitized` variable.
 * * The `postBodySanitized` variable is used to store the HTML content of the blog post.
 * * It is initialized by calling the `postBodySanitized()` function.
 * * The `postBodySanitized()` function is defined below.
 * * The `postBodySanitized` variable is used in the `postBodySanitized()` function.
 * * The `postBodySanitized()` function is used to sanitize the HTML content of the blog post.
 * * It is called in the `ngOnInit()` function.
 * * The `postBodySanitized()` function is defined below.
 * * The `
 */
  ngOnInit(): void {
    this["postBodySanitized"]();
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

  /**
   * Cannot generate summary
   * @param {string} tag - the tag to generate a url for
   * @returns The url for the tag.
   */
  public generateTagUrl(tag:string){
    return this["tagSingleUrl"] + tag
  }


  sanBody:SafeHtml;

  maxWidth:number=this.size.initialSize().width - this.CONTENT_PAD_SIZE ;
  maxHeight:number= this.size.initialSize().height- this.CONTENT_PAD_SIZE;

/**
 * * Combine the style sheet and comment body into one string.
 *
 * * Sanitize the combined string.
 *
 * * Set the sanitized string to the sanBody property.
 *
 * * Return the sanBody property.
 */
  public postBodySanitized(){
    this.sanBody =  this.sanitizer.bypassSecurityTrustHtml(this.combineStyleSheetAndCommentBody())
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
  .body iframe{
    max-width:${this.maxWidth}px;
    max-height:${this.maxHeight}px;
    width:auto;
    height:auto;
  }
  </style>
  `

  /**
   * Combine the body of the blog post with the style sheet.
   * @returns The combined body of the blog post and the style sheet.
   */
  private combineStyleSheetAndCommentBody(): string {
    return this.blogPost.body + this.styleSheet;
  }

 /* If the blog post has an expiration date, and that date is in the past, then return false.
 Otherwise, return true. */
  private asTrueWhenExpirationDateHasNotPassed() : boolean {
    if (this["blogPost"]["expiryDate"] instanceof Date){
      return (this["blogPost"]["expiryDate"]as Date) < new Date()
    }
// console.log((this["blogPost"]["expiryDate"] as Timestamp).seconds*1000,new Date().getTime()*1000)
    return (this["blogPost"]["expiryDate"] as Timestamp).seconds*1000<new Date().getTime()*1000
  }

 /**
  * "Does this blog post have an expiry date?"
  * @returns The boolean value of whether the blog post has an expiry date.
  */
  private hasAnExpirationDate() : boolean {
    return !!this.blogPost.expiryDate;
  }







}
