import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { NavBarLinkService } from 'src/app/generic/nav-bar-link.service';
import {  NavBarLink } from 'src/app/generics/nav-bar-link';

@Component({
  selector: 'app-nav-list',
  templateUrl: './nav-list.component.html',
  styleUrls: ['./nav-list.component.scss']
})
export class NavListComponent implements OnInit {

  constructor(private navbar:NavBarLinkService, private auth: AuthService) {

  }
  navList: NavBarLink[] = [];

  ngOnInit(): void {
    this["refreshNavList"]()
    this["watchAuthEvents"]()
  }

  /**
   * Refresh the navList property with the navbar's links.
   */
  private refreshNavList() {
    this["navList"] = this["navbar"]["links"]();
  }

  /**
   * `watchAuthEvents` subscribes to the `authEvent` observable and calls `refreshNavList` when it
   * receives a new event.
   */
  private watchAuthEvents() {
    this["auth"]["authEvent"]["pipe"](
      tap(_ => this["refreshNavList"]())
    )
    ["subscribe"](x=>
   {})
  }
}
