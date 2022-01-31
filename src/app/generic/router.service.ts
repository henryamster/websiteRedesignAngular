import { Injectable } from '@angular/core';
import { Router, Event, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RouterService {

  routerEvents$: Observable<Event>;
  constructor(private router: Router,
              private activated: ActivatedRoute) {
    this.setUpRouterObservable();
  }

  /**
   * `getCurrentUrl` returns the current url.
   * @param {string} [pre] - string - the prefix to the current url
   * @returns The current url of the application.
   */
  getCurrentUrl(pre?: string): string {
    return pre ? ((environment.location) as string) + ((pre.substr(1)) as string)
    : ((environment.location) as string) + ((this.router.url.substr(1)) as string);
  }

  private setUpRouterObservable() {
    this.routerEvents$ = this.router.events;
    this.routerEvents$
    .subscribe();
  }


}
