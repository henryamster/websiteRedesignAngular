import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IScrobblerTrack } from './scrobbler-track';

@Injectable({
  providedIn: 'root'
})
export class ScrobblerService {

  protected readonly API_KEY: string = environment.AUDIOSCROBBLER_API_KEY;
  private userName = 'henryamster'
  SCROBBLER_URL: string;
  tracks$: BehaviorSubject<IScrobblerTrack[]> = new BehaviorSubject([]);

  constructor(
    private http: HttpClient
  ) {
    this["getTracks"]()["subscribe"]()
    const UPDATE_INTERVAL = 1000 * 60 * 5
    interval(UPDATE_INTERVAL)["pipe"](
      tap(_=> this["getTracks"]()["subscribe"]())
    )

  }

  private generateURL(resultNumber: number = 12): void {
    this["SCROBBLER_URL"] = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${this["userName"]}&api_key=${this["API_KEY"]}&format=json&limit=${resultNumber}`;
  }

  getTracks(numberOfTracks: number = 12): Observable<void> {
    this["generateURL"](numberOfTracks)
    return this["http"]["get"](this["SCROBBLER_URL"])
    ["pipe"](map((res: { recenttracks: { track: IScrobblerTrack[] } }) => {
      console.log(res)
      this["tracks$"]["next"](res["recenttracks"]["track"])
    })
    )
  }

  tracks(): Observable<IScrobblerTrack[]>{
    this["getTracks"]()["subscribe"]()
    return this["tracks$"]["asObservable"]()
  }

}
