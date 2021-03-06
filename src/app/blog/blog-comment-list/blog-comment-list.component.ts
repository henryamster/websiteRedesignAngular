import { Component, Input, OnInit } from '@angular/core';
import { IBlogComment } from './../../models/blogPost';

@Component({
  selector: 'app-blog-comment-list',
  templateUrl: './blog-comment-list.component.html',
  styleUrls: ['./blog-comment-list.component.scss']
})
export class BlogCommentListComponent implements OnInit {

  constructor() { }
  @Input('comments') comments : IBlogComment[];
  @Input('showComments') showComments:boolean=false;
  @Input('blogPostRef') blogPostRef?:string;
  ngOnInit(): void {

  }

}
