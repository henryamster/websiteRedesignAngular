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

  constructor(private angularFire: AngularFirestore) {


  }
  /**
   * grab shortlink url
   * @param {string} slug - the short link slug
   * @returns The url of the short link.
   */
  shortLinkUrl(slug: string): Observable<string>{
    return this.angularFire.doc(`${QUERY_PATHS.SHORT_URLS}/${slug}`).get().pipe(map(x => (x.data() as IShortLink).url));
  }

 /**
  * add short link to db
  * @param {IShortLink} shortLink - IShortLink
  * @returns The shortLink object
  */
  async addShortLink(shortLink: IShortLink): Promise<void>{
    return await this.angularFire.collection(QUERY_PATHS.SHORT_URLS).doc(shortLink.id).set(washType(shortLink));
  }

  /**
   * Returns a list of short links.
   * @returns A list of IShortLink objects.
   */
  list() : Observable<IShortLink[]>{
    return this.angularFire.collection(QUERY_PATHS.SHORT_URLS).get().pipe(map(x => x.docs.map(y => this.injectIdIntoData(y) as IShortLink)));
  }

 /**
  * rm shortlink
  * @param {string} slug - string - the slug of the short url to delete
  * @returns The AngularFireObject<ShortUrl>
  */
  async delete(slug: string): Promise<void>{
   return await this.angularFire.doc(`${QUERY_PATHS.SHORT_URLS}/${slug}`).delete();
  }

  /**
   * `injectIdIntoData` takes a document and returns a new document with the `id` field added to the
   * `data` field.
   * @param doc - the document that was just created
   * @returns The data of the document, with the id added to it.
   */
  private injectIdIntoData(doc): any {
    return Object.assign(doc.data(), {id: doc.id});
  }


}

