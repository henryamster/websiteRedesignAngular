import { Component, OnInit } from '@angular/core';
import {v4} from 'uuid';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  constructor() { }

  posts: IBlogPost[];

  ngOnInit(): void {

    this["posts"]["push"](
      new BlogPost(
        v4(),
        `Hello`,
        'lol ',
        'test',
        PostType.SHORT_POST,
        new Date(),
        'Henry Fritz (henryamsterfritz@gmail.com)',
        [],
        [],
        [],
        ['https://henryfritz.xyz']
      )
    )

  }

}
