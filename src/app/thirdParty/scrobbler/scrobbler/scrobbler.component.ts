import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { IScrobblerTrack } from '../scrobbler-track';
import { ScrobblerService } from '../scrobbler.service';

@Component({
  selector: 'app-scrobbler',
  templateUrl: './scrobbler.component.html',
  styleUrls: ['./scrobbler.component.scss']
})
export class ScrobblerComponent implements OnInit {

  constructor(private scrobbler: ScrobblerService) { }
  tracks: IScrobblerTrack[];

  ngOnInit(): void {
    this["scrobbler"]["tracks$"]["pipe"](
      map(
        tracks=> this["tracks"] = tracks
      )
    )["subscribe"]()
  }

  public trackPlaying(track: IScrobblerTrack){
    return !!track['@attr']?.nowplaying
  }



}
