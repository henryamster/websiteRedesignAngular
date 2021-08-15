import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { IShortLink, ShortLink } from '../generics/short-link';
import { washType } from '../generics/utilities';
import { QUERY_PATHS } from './api-helpers';

@Injectable({
  providedIn: 'root'
})
export class ShortService {

  constructor(private angularFire:AngularFirestore) {


  }
  shortLinkUrl(slug:string) : Observable<string>{
    return this.angularFire.doc(`${QUERY_PATHS.SHORT_URLS}/${slug}`).get().pipe(map(x=>
      {
        console.log(x.data() as IShortLink)
       return (x.data() as IShortLink).url
      }
      )
    )
  }

  async addShortLink(shortLink:IShortLink){
    await this.angularFire.collection(QUERY_PATHS.SHORT_URLS).add(washType(shortLink))
  }
}

