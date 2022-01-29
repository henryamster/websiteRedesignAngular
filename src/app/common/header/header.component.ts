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


/**
 * *This function toggles the side navigation panel.*
 */
  public togglePanel(){
    this["sideNavToggle"]["emit"](true)
  }


  /**
   * * Set the initial size of the component based on the window size.
   *
   * * Subscribe to the resize window size observable.
   *
   * * Set the size of the component to the window size.
   */
  private setResponsiveBehavior() {
    this["size"] = this["resize"]["initialSize"]();
    this["resize$"] = this["resize"]["resizeWindowSize$"]
      .subscribe(windowSize => {
        this["size"] = windowSize;
      });
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


  ngOnDestroy() {
    this["resize$"]["unsubscribe"]()

  }

}



