import { Component, Input, OnInit } from '@angular/core';
import { IInstagramPost,INSTAGRAM_MEDIA_TYPES } from '../instagram.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input('post') post: IInstagramPost
  constructor() { }
  INSTAGRAM_MEDIA_TYPES=INSTAGRAM_MEDIA_TYPES;
  ngOnInit(): void {

  }

}
