import { Injectable } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { IWindowSize } from '../generics/window-size';

@Injectable({
  providedIn: 'root'
})
export class ResponsiveService {

  resizeWindowSize$: Observable<IWindowSize>

  constructor() {
    this.resizeWindowSize$ = fromEvent(window, 'resize').pipe(
      distinctUntilChanged(),
      debounceTime(100),
      map( event =>  ({width: event["target"]["innerWidth"],
                     height: event["target"]["innerHeight"]})

          )
      )
  }

  initialSize(){
    return {width: window.innerWidth, height: window.innerHeight} as IWindowSize;
  }


}
