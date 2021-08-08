import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-blog-comment-composer',
  templateUrl: './blog-comment-composer.component.html',
  styleUrls: ['./blog-comment-composer.component.scss']
})
export class BlogCommentComposerComponent implements OnInit {

  constructor() { }
  commentForm: FormGroup;
  ngOnInit(): void {
    this["commentForm"] = this["fb"]["group"]({
      comment: ['', Validators.required]
    })
  }


}
