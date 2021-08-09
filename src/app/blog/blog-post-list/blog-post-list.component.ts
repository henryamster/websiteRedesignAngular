import { Component, Input, OnInit } from '@angular/core';
import { IBlogPost } from 'src/app/models/blogPost';

@Component({
  selector: 'app-blog-post-list',
  templateUrl: './blog-post-list.component.html',
  styleUrls: ['./blog-post-list.component.scss']
})
export class BlogPostListComponent implements OnInit {

  constructor() { }

  @Input('blogPosts') blogPosts: IBlogPost[];
  @Input('displayCommentComposer') displayCommentComposer:boolean=false;
  @Input('showComments') showComments:boolean=false;
  ngOnInit(): void {

  }
}
