import { animate, state, style, transition, trigger } from '@angular/animations';
import { Route } from '@angular/compiler/src/core';
import { Component, HostBinding, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { from, interval, noop } from 'rxjs';
import { map, pluck, reduce, startWith, take, tap, timeout } from 'rxjs/operators';
import { LoggerService } from 'src/app/generic/logger.service';
import { RouterService } from 'src/app/generic/router.service';
import { EEventType } from 'src/app/generics/log-item';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent implements OnInit {
  constructor(private routerService: RouterService,
    private logger: LoggerService, private router:Router) {
    this.stringUrl = this.routerService.getCurrentUrl()
    this.routerService.routerEvents$
      .pipe(
        pluck('url')
      )
      .subscribe(x => this.stringUrl = this.routerService.getCurrentUrl(<string>x))
  }

  stringUrl: string;
  loaded: boolean = false;
  COUNTDOWN_SECONDS = 5;
  countdown: number;

  secondsTimer$ = interval(1000)["pipe"](
    take(this["COUNTDOWN_SECONDS"]),
    map((sec) => (this["COUNTDOWN_SECONDS"]-1)-sec
  ))


  ngOnInit(): void {
    interval(1000).pipe(take(1)).subscribe(x =>
      this.loaded=true
    )

    this["secondsTimer$"]["pipe"](
      startWith(this["COUNTDOWN_SECONDS"]),
     tap(count => (count == 0) ? this.router.navigateByUrl('/about'): noop)
    )["subscribe"](
      secondsRemaining => this.countdown = secondsRemaining
    )

    this["logger"]["logError"](new Error(`
    Invalid URL attempt: ${this.stringUrl}`), null, EEventType.Landing)


  }


}
