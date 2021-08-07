import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-blog-post-composer',
  templateUrl: './blog-post-composer.component.html',
  styleUrls: ['./blog-post-composer.component.scss']
})
export class BlogPostComposerComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  commentForm: FormGroup;
  ngOnInit(): void {
    this["commentForm"] = this["fb"]["group"]({
      comment: ['', Validators.required]
    })


  }

}
