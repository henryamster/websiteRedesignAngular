import { animate, state, style, transition, trigger } from '@angular/animations';
import { Route } from '@angular/compiler/src/core';
import { Component, HostBinding, OnInit } from '@angular/core';
import { from, interval } from 'rxjs';
import { map, pluck, reduce, take, timeout } from 'rxjs/operators';
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
  constructor(private router: RouterService,
    private logger: LoggerService) {
    this.stringUrl = this.router.getCurrentUrl()
    this.router.routerEvents$
      .pipe(
        pluck('url')
      )
      .subscribe(x => this.stringUrl = this.router.getCurrentUrl(<string>x))
  }

  stringUrl: string;
  loaded: boolean = false;

  ngOnInit(): void {
    interval(1000).pipe(take(1)).subscribe(x =>
      this.loaded=true
    )

    this["logger"]["logError"](new Error(`
    Invalid URL attempt: ${this.stringUrl}`), null, EEventType.Landing)


  }


}
