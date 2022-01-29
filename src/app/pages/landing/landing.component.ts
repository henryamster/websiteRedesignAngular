import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/api/blog.service';
import { IBlogPost } from 'src/app/models/blogPost';

@Component({
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor(private blogService: BlogService) { }
  posts: IBlogPost[];
  ngOnInit(): void {
    this.blogService.getPaginatedBlogs(2).subscribe(posts => {
      this.posts = posts;
    }
    );
  }

}
