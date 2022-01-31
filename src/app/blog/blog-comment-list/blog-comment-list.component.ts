import { Component, Input, OnInit } from '@angular/core';
import { IBlogComment } from './../../models/blogPost';

@Component({
  selector: 'app-blog-comment-list',
  templateUrl: './blog-comment-list.component.html',
  styleUrls: ['./blog-comment-list.component.scss']
})
export class BlogCommentListComponent implements OnInit {

  constructor() { }
  @Input() comments: IBlogComment[];
  @Input() showComments = false;
  @Input() blogPostRef?: string;
  ngOnInit(): void {
  }

}
