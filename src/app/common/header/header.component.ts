import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { NavBarLinkService } from 'src/app/generic/nav-bar-link.service';
import { ResponsiveService } from 'src/app/generic/responsive.service';
import { NavBarLink } from 'src/app/generics/nav-bar-link';
import { IWindowSize } from 'src/app/generics/window-size';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})



export class HeaderComponent implements OnInit {

  constructor(private resize: ResponsiveService,
    private navbar:NavBarLinkService, private auth:AuthService) { }
  @Output() sideNavToggle:EventEmitter<boolean> = new EventEmitter();
  resize$: Subscription
  size:IWindowSize;
  navList: NavBarLink[] = [];
  ngOnInit(): void {
    this["setResponsiveBehavior"]();
    this["refreshNavList"]()
    this["watchAuthEvents"]()
  }


  public togglePanel(){
    this["sideNavToggle"]["emit"](true)
  }


  private setResponsiveBehavior() {
    this["size"] = this["resize"]["initialSize"]();
    this["resize$"] = this["resize"]["resizeWindowSize$"]
      .subscribe(windowSize => {
        this["size"] = windowSize;
      });
  }

  private refreshNavList() {
    this["navList"] = this["navbar"]["links"]();
    console.log(this.navList)
  }

  private watchAuthEvents() {
    this["auth"]["authEvent"]["pipe"](
      tap(_ => {this["refreshNavList"]
    console.log(_)
    })
    )
    ["subscribe"]()
  }

  ngOnDestroy() {
    this["resize$"]["unsubscribe"]()

  }

}



