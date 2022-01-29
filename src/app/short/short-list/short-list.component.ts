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
  /**
   * This function grabs the short link list from the database and displays it in the short link list
   * table.
   * @param event - The event object that is passed to the function.
   */
  newShortLink(event){
    this.grabShortLinkList()
  }

  ngOnInit(): void {
    this.grabShortLinkList();
  }

 /**
  * `grabShortLinkList()`:
  *
  * This function grabs the list of short links from the database and stores it in the `shortLinks`
  * property.
  */
  private grabShortLinkList() {
    this.short.list().subscribe(shortLinkList => this.shortLinks = shortLinkList);
  }

  /**
   * Delete a short link from the database.
   * @param {string} slug - the slug of the short link to delete
   */
  async delete(slug:string){
    await this.short.delete(slug)
    this.grabShortLinkList()
  }

}
