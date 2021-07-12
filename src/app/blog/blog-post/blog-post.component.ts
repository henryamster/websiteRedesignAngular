import { Component, Input, OnInit } from '@angular/core';
import { RouterService } from 'src/app/generic/router.service';
import { IBlogPost } from 'src/app/models/blogPost';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss']
})
export class BlogPostComponent implements OnInit {

  constructor() { }
  @Input('blogPost') blogPost:IBlogPost
  now: number;
  blogSingleUrl: string;
  tagSingleUrl:string;

  public hasNotReachedExpiryDate(){
    if (this.hasAnExpirationDate()) return this.asTrueWhenExpirationDateHasNotPassed()
    return false;
  }

  ngOnInit(): void {
    this["now"]=Date.now();
    this["host"]=`http://localhost:4200/blog/${this.blogPost.slug}`
    this["tagSingleUrl"]=`http://localhost:4200/blog/tagged/`
  }

  public generateTagUrl(tag:string){
    return this["tagSingleUrl"] + tag
  }

  private asTrueWhenExpirationDateHasNotPassed() : boolean {
    return Date.parse(this["blogPost"]["expiryDate"].toString()) > Date.now();
  }

  private hasAnExpirationDate() : boolean {
    return !!this.blogPost.expiryDate;
  }



}
