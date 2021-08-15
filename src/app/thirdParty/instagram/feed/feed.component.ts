import { Component, OnInit } from '@angular/core';
import {IInstagramPost, IInstagramPaging, InstagramService} from './../instagram.service'
@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  constructor(private ig:InstagramService) { }

  feed:IInstagramPost[];
  paging:IInstagramPaging;

  ngOnInit(): void {
    this.ig.instagramFeed().subscribe( feed =>{
      [this.feed,this.paging]= [feed.data,feed.paging]
    })
  }

}
