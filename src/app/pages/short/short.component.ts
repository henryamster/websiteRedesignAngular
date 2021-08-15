import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShortService } from 'src/app/api/short.service';

@Component({
  selector: 'app-short',
  templateUrl: './short.component.html',
  styleUrls: ['./short.component.scss']
})
export class ShortComponent implements OnInit {

  constructor(private route:ActivatedRoute,
    private short: ShortService) { }


  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      this.short.shortLinkUrl(params.slug)
        .subscribe(url => window.location.href = url)
    })
  }

}
