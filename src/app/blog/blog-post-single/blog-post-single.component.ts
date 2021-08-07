import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { BlogService } from 'src/app/api/blog.service';
import { RouterService } from 'src/app/generic/router.service';
import { IBlogPost } from 'src/app/models/blogPost';

const TWO_SECONDS = 2000;
@Component({
  selector: 'app-blog-post-single',
  templateUrl: './blog-post-single.component.html',
  styleUrls: ['./blog-post-single.component.scss']
})
export class BlogPostSingleComponent implements OnInit, OnDestroy {

  constructor(private route:ActivatedRoute,
     private blogService:BlogService,
     private router: Router) { }
  @Input() blogPost:IBlogPost;
  notFound:boolean=false;
  loading:boolean=true;
  grabPost$:Subscription;
  ngOnInit(): void {
    this["grabPost$"]= this["route"].params.pipe(tap(params =>
      this["blogService"]["getThePostWithSlug"](params["slug"])
      ["subscribe"](blogPost => this.blogPost = blogPost[0] ??  null)
    ))["subscribe"]( _=>{

      this.loading = false;
      if (this["blogPost"]==null) {
        this["notFound"]=true
        of(()=>this["router"]["navigateByUrl"]('/blog')).pipe(delay(TWO_SECONDS)).subscribe();
      }
    })

  }
  ngOnDestroy(): void {
   this["grabPost$"]["unsubscribe"]()
  }


}
