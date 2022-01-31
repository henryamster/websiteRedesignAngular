import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BlogService } from 'src/app/api/blog.service';
import {LoggerService } from 'src/app/generic/logger.service';
import { EEventType } from 'src/app/generics/log-item';
// import {v4} from 'uuid';
import {IBlogPost, BlogPost, PostType} from './../../models/blogPost';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit, OnDestroy {

  constructor(
    private blogService: BlogService,
    private loggerService: LoggerService
  ) { }
loading = true;
  posts: IBlogPost[] = [];
  blogPost$: Subscription;

  ngOnInit(): void {
  this.blogService.clearLastDoc();
    this.blogPost$ = this.blogService.getPaginatedBlogs(6).subscribe(
      blogPosts => {

        this.posts = blogPosts;
        this.loading = false;
      },
      () => this.loggerService.logError(new Error('Error getting blog posts'), null, EEventType.Server, {serverMessage: 'Error getting blog posts'})
    );

  }
  ngOnDestroy(): void {
    this.blogService.clearLastDoc();
  }

  next(){
    this.loading = true;
    this.blogService.next(6)
    .subscribe(
      blogPosts => {
        this.posts = blogPosts;
        this.loading = false;
      },
      () => this.loggerService.logError(new Error('Error getting blog posts'), null, EEventType.Server, {serverMessage: 'Error getting blog posts'})
    );
  }

  previous(){
    this.loading = true;
    this.blogService.back(6)
    .subscribe(
      blogPosts => {
        this.posts = blogPosts;
        this.loading = false;
      },
      () => this.loggerService.logError(new Error('Error getting blog posts'), null, EEventType.Server, {serverMessage: 'Error getting blog posts'})
    );
  }


}
