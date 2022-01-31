import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { ResponsiveService } from 'src/app/generic/responsive.service';

@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.scss']
})
export class YoutubeComponent implements OnInit {

  constructor(private sanitizer: DomSanitizer,
              private size: ResponsiveService) { }
  @Input() videoId: string;
  iframeSrc: SafeResourceUrl;
  height: string;
  size$: Subscription;
  ngOnInit(): void {

    this.iframeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://www.youtube.com/embed/' + this.videoId
    );
    this.height = `${this.size.initialSize().height}px`;

    this.size$ = this.size.resizeWindowSize$.pipe(map(size =>
      this.height = `${size.height}px`
    )).subscribe();
  }
  ngOnDestroy(): void {
   this.size$.unsubscribe();
  }

}
