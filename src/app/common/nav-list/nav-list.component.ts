import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { NavBarLinkService } from 'src/app/generic/nav-bar-link.service';
import {  NavBarLink } from 'src/app/generics/nav-bar-link';

@Component({
  selector: 'app-nav-list',
  templateUrl: './nav-list.component.html',
  styleUrls: ['./nav-list.component.scss']
})
export class NavListComponent implements OnInit {

  constructor(private navbar:NavBarLinkService) {

  }
  navList: NavBarLink[] = [];

  ngOnInit(): void {
    this["refreshNavList"]()
    this["watchAuthEvents"]()
  }

  private refreshNavList() {
    this["navList"] = this["navbar"]["links"]();
  }

  private watchAuthEvents() {
    this["navbar"]["authEvent"]["pipe"](
      tap(_ => this["refreshNavList"])
    )
    ["subscribe"]()
  }
}
