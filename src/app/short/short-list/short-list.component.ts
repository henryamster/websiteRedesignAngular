import { Component, OnInit } from '@angular/core';
import { ShortService } from 'src/app/api/short.service';
import { IShortLink } from 'src/app/generics/short-link';

@Component({
  selector: 'app-short-list',
  templateUrl: './short-list.component.html',
  styleUrls: ['./short-list.component.scss']
})
export class ShortListComponent implements OnInit {

  constructor(private short: ShortService) { }
  shortLinks: IShortLink[];
  newShortLink(event){
    this.grabShortLinkList()
  }

  ngOnInit(): void {
    this.grabShortLinkList();
  }

  private grabShortLinkList() {
    this.short.list().subscribe(shortLinkList => this.shortLinks = shortLinkList);
  }

  async delete(slug:string){
    await this.short.delete(slug)
    this.grabShortLinkList()
  }

}
