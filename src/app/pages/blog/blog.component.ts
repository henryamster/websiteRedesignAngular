import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BlogService } from 'src/app/api/blog.service';
//import {v4} from 'uuid';
import {IBlogPost, BlogPost, PostType} from './../../models/blogPost';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit, OnDestroy {

  constructor(
    private blogService: BlogService
  ) { }
loading:boolean=true;
  posts: IBlogPost[]=[];
  blogPost$:Subscription;

  ngOnInit(): void {

    this["blogPost$"]=this["blogService"]["getPaginatedBlogs"](6).subscribe(
      blogPosts=>{
     this["posts"]=blogPosts
     this["loading"]=false;
      }
    )

  }
  ngOnDestroy(): void {
    this["blogService"]["clearLastDoc"]()
  }

}
