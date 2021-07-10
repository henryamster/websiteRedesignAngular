import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/api/blog.service';
//import {v4} from 'uuid';
import {IBlogPost, BlogPost, PostType} from './../../models/blogPost';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  constructor(
    private blogService: BlogService
  ) { }

  posts: IBlogPost[]=[];

  ngOnInit(): void {

    this["blogService"]["getPaginatedBlogs"](6).subscribe(
      blogPosts=>
     this["posts"]=blogPosts
    )

    // this["posts"]["push"](
    //   new BlogPost(
    //     v4(),
    //     `Hello`,
    //     'lol ',
    //     '<p>test</p>',
    //     PostType.SHORT_POST,
    //     new Date(),
    //     'Henry Fritz (henryamsterfritz@gmail.com)',
    //     [],
    //     [],
    //     [],
    //     ['https://henryfritz.xyz']
    //   )
    // )

  }

}
