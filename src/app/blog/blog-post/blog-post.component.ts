import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
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
  now: number;
  blogSingleUrl: string;
  tagSingleUrl:string;

  public hasNotReachedExpiryDate(){
    if (this.hasAnExpirationDate()) return this.asTrueWhenExpirationDateHasNotPassed()
    return true;
  }

  ngOnInit(): void {
    this["now"]=Date.now();
    this["host"]=`http://localhost:4200/post/${this.blogPost.slug}`
    this["tagSingleUrl"]=`http://localhost:4200/post/tagged/`
  }

  public generateTagUrl(tag:string){
    return this["tagSingleUrl"] + tag
  }

  public postBodySanitized(){
    return this.sanitizer.bypassSecurityTrustHtml(this.blogPost.body)
  }

  private asTrueWhenExpirationDateHasNotPassed() : boolean {
    return Date.parse(this["blogPost"]["expiryDate"].toString()) > Date.now();
  }

  private hasAnExpirationDate() : boolean {
    return !!this.blogPost.expiryDate;
  }





}
