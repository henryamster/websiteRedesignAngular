import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Timestamp } from '@google-cloud/firestore';
import { RouterService } from 'src/app/generic/router.service';
import { IBlogPost } from 'src/app/models/blogPost';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss']
})
export class BlogPostComponent implements OnInit {

  constructor(private sanitizer: DomSanitizer) { }
  @Input('blogPost') blogPost:IBlogPost
  @Input('displayCommentComposer') displayCommentComposer:boolean=false

  now: number;
  blogSingleUrl: string;
  tagSingleUrl:string;

  public hasNotReachedExpiryDate(){
    if (this.hasAnExpirationDate()) return this.asTrueWhenExpirationDateHasNotPassed()
    return true;
  }

  ngOnInit(): void {
    this["now"]=Date.now();
    this["host"]=`http://localhost:4200/post/${this.blogPost.slug}`;
    this["tagSingleUrl"]=`http://localhost:4200/post/tagged/`;
    console.log(this)
  }

  public generateTagUrl(tag:string){
    return this["tagSingleUrl"] + tag
  }

  public postBodySanitized(){
    return this.sanitizer.bypassSecurityTrustHtml(this.blogPost.body)
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
