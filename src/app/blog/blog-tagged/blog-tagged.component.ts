import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { BlogService } from 'src/app/api/blog.service';
import { IBlogPost } from 'src/app/models/blogPost';

@Component({
  selector: 'app-blog-tagged',
  templateUrl: './blog-tagged.component.html',
  styleUrls: ['./blog-tagged.component.scss']
})
export class BlogTaggedComponent implements OnInit {

  constructor(private blog: BlogService,
    private route: ActivatedRoute,
    private router: Router) { }
  posts: IBlogPost[];
  tag: string;
  loading: boolean = true;
  TWO_SECONDS_IN_MS=2000
  ngOnInit(): void {
    this.route.params.subscribe(
      snap => {
        this.tag = snap.tag;
        this.getPosts()
      }
    )
  }


  getPosts() {
    this.blog.tagged(
      decodeURI(this.tag)
    ).subscribe(blogPosts => {
      this.posts = blogPosts
      if (this.posts.length<1){
        this.returnToBlog()
      }
      this.loading = false
    }
    )
  }

  returnToBlog(){
    of([]).pipe(delay(this.TWO_SECONDS_IN_MS),
    tap(_=>this.router.navigateByUrl('blog'))).subscribe()
  }
}
