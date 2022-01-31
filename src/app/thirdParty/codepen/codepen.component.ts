import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponsiveService } from 'src/app/generic/responsive.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-codepen',
  templateUrl: './codepen.component.html',
  styleUrls: ['./codepen.component.scss']
})
export class CodepenComponent implements OnInit {

  constructor(private sanitizer: DomSanitizer, private size: ResponsiveService) { }
  @Input() slug: string;
  CODEPEN_USERNAME: string = environment.CODEPEN_USERNAME;
  iframeSrc: SafeResourceUrl;
  height: string;
  size$: Subscription;
  ngOnInit(): void {

    this.iframeSrc = this.sanitizer.bypassSecurityTrustResourceUrl('https://codepen.io/'
      + this.CODEPEN_USERNAME
      + '/embed/' + this.slug
      + `/?height=${`${this.size.initialSize().height}px`}&theme-id=dark&default-tab=result&embed-version=2`);

    this.size$ = this.size.resizeWindowSize$.pipe(map(size =>
      this.height = `${size.height}px`
    )
    ).subscribe();

  }
  ngOnDestroy(): void {
    this.size$.unsubscribe();
  }
}

