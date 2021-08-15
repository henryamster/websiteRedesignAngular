import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { QueryDocumentSnapshot } from '@google-cloud/firestore';
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
    return this.angularFire.doc(`${QUERY_PATHS.SHORT_URLS}/${slug}`).get().pipe(map(x=>(x.data() as IShortLink).url))
  }

  async addShortLink(shortLink:IShortLink){
    return await this.angularFire.collection(QUERY_PATHS.SHORT_URLS).doc(shortLink.id).set(washType(shortLink))
  }

  list(){
    return this.angularFire.collection(QUERY_PATHS.SHORT_URLS).get().pipe(map(x=>x.docs.map(y=>this.injectIdIntoData(y) as IShortLink)))
  }

  async delete(slug:string){
   return await this.angularFire.doc(`${QUERY_PATHS.SHORT_URLS}/${slug}`).delete()
  }

  private injectIdIntoData(doc): any {
    return Object.assign(doc["data"](), {id:doc["id"]});
  }


}

