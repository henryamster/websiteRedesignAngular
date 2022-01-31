import { Component, Input, OnInit } from '@angular/core';
import { IBlogPost } from 'src/app/models/blogPost';

@Component({
  selector: 'app-blog-post-list',
  templateUrl: './blog-post-list.component.html',
  styleUrls: ['./blog-post-list.component.scss']
})
export class BlogPostListComponent implements OnInit {

  constructor() { }

  @Input() blogPosts: IBlogPost[];
  @Input() displayCommentComposer = false;
  @Input() showComments = false;
  ngOnInit(): void {

  }
}
