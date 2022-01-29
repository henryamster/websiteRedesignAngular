import { Injectable } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { IWindowSize } from '../generics/window-size';

@Injectable({
  providedIn: 'root'
})
export class ResponsiveService {

  resizeWindowSize$: Observable<IWindowSize>

  /**
   * The `resizeWindowSize$` observable emits a new object with the width and height of the window
   * every time the window is resized.
   */
  constructor() {
    this.resizeWindowSize$ = fromEvent(window, 'resize').pipe(
      distinctUntilChanged(),
      debounceTime(100),
      map( event =>  ({width: event["target"]["innerWidth"],
                     height: event["target"]["innerHeight"]})

          )
      )
  }

  /**
   * Returns the current width and height of the browser window.
   * @returns The size of the window.
   */
  initialSize(){
    return {width: window.innerWidth, height: window.innerHeight} as IWindowSize;
  }


}
