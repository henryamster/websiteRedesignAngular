import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';
import { debounceTime, map, pairwise, pluck } from 'rxjs/operators';
import { HeaderComponent } from '../common/header/header.component';
import { ResponsiveService } from '../generic/responsive.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private responsive:ResponsiveService) { }
  @ViewChild('snav') snav: MatSidenav;
  resize$: Subscription;
  ngOnInit(): void {
    this.resize$ =
    this.responsive.resizeWindowSize$
      .pipe(
        debounceTime(20),
        pluck('width'),
        map(x=>x>600? this.toggle('close') : false)
        )
      .subscribe()

  }


  toggle($event){
    $event == 'close'?
    this.snav.toggle(false):
    this.snav.toggle()
  }


}


