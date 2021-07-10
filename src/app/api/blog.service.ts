import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { IBlogPost } from '../models/blogPost';
import { QUERY_PATHS } from './api-helpers'
import { map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class BlogService {

  blogPosts: IBlogPost[];
  blogPosts$: Subscription;

  lastVisibleDoc
  constructor(private firestore: AngularFirestore,
    // private functions: AngularFireFunctions
    ) {
    this.getPaginatedBlogs()
  }


public getPaginatedBlogs(numberOfPosts: number = 6): Observable<any> {
    if (!this["lastVisibleDoc"]) { return this["init"](numberOfPosts) }
    return this["next"](numberOfPosts)
  }

  public backwards(numberOfPosts: number = 6):Observable<any>{
   return this["back"](numberOfPosts)
  }


  private init(numberOfPosts: number=6) {
     return this.firestore.collection(
      QUERY_PATHS.BLOG,
      ref => ref.orderBy('timestamp').limit(numberOfPosts)
    ).get().pipe(
      tap(snap => this["lastVisibleDoc"] = snap.docs[snap.docs.length - 1]),
      map(snap => snap.docs.map(doc => this.injectIdIntoData(doc))) ,
    )
    // .subscribe(
    //   (blogPosts: IBlogPost[]) => this.blogPosts = blogPosts
    // )
  }

  private injectIdIntoData(doc): any {
    return Object.assign(doc["data"](), {id:doc["id"]});
  }

  private next(numberOfPosts: number=6) {
    return this.firestore.collection(
      QUERY_PATHS.BLOG,
      ref => ref.orderBy('timestamp')
        .startAfter(this["lastVisibleDoc"])
        .limit(numberOfPosts)
    ).get().pipe(
      map(snap => snap.docs.map(doc =>this.injectIdIntoData(doc))) ,
    )
  }

  private back(numberOfPosts: number =6){
   return this.firestore.collection(
      QUERY_PATHS.BLOG,
      ref=> ref.orderBy('timestamp')
      .endBefore(this["lastVisibleDoc"])
      .limit(numberOfPosts)
    ).get().pipe(
      map(snap => snap.docs.map(doc => this.injectIdIntoData(doc))) ,
    )
    // .subscribe(
    //   (blogPosts: IBlogPost[]) => this.blogPosts = blogPosts
    // )
  }

}

