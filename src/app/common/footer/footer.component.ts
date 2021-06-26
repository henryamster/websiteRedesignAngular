import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ResponsiveService } from 'src/app/generic/responsive.service';
import { IWindowSize } from 'src/app/generics/window-size';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnDestroy {

  constructor(private resize: ResponsiveService) { }
  size: IWindowSize
  resize$: Subscription;

  ngOnInit(): void {
    this.setResponsiveBehavior();
  }


  private setResponsiveBehavior() {
    this.size = this.resize.initialSize();
    this.resize$ = this.resize.resizeWindowSize$.subscribe(size => this.size = size);
  }

  ngOnDestroy(): void {
  this.resize$.unsubscribe()
  }
}
