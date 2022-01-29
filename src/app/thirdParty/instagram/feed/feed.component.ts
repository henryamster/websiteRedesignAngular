import { Component, OnInit } from '@angular/core';
import { LoggerService } from 'src/app/generic/logger.service';
import { EEventType } from 'src/app/generics/log-item';
import {IInstagramPost, IInstagramPaging, InstagramService} from './../instagram.service'
@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  constructor(private ig:InstagramService,
    private loggerService: LoggerService) { }

  feed:IInstagramPost[];
  paging:IInstagramPaging;

  ngOnInit(): void {
    this.ig.instagramFeed().subscribe( feed =>{
      [this.feed,this.paging]= [feed.data,feed.paging]
    }),
    ()=>this.loggerService.logError(new Error("Error getting gallery posts"), null, EEventType.Server, {serverMessage: "Error getting gallery posts"})
    }
  }
