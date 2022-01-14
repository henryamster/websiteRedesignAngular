import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable, Subscription } from 'rxjs';
import { IBlogComment, IBlogPost } from '../models/blogPost';
import { QUERY_PATHS } from './api-helpers'
import { first, map, mergeMap, switchMap, take, tap } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { LoggerService } from '../generic/logger.service';
import { EEventType } from '../generics/log-item';
import { washType } from '../generics/utilities';
@Injectable({
  providedIn: 'root'
})
export class BlogService {

  blogPosts: IBlogPost[];
  blogPosts$: Subscription;

  lastVisibleDoc
  constructor(private firestore: AngularFirestore,
    private logger:LoggerService
    // private functions: AngularFireFunctions
    ) {
    this.getPaginatedBlogs()
  }

  public clearLastDoc(){
    this.nullifyLastVisibleDoc();
  }

  private nullifyLastVisibleDoc() {
    this["lastVisibleDoc"] = null;
  }

public getPaginatedBlogs(numberOfPosts: number = 6): Observable<any> {
    if (!this["lastVisibleDoc"]) { return this["init"](numberOfPosts) }
    return this["next"](numberOfPosts)
  }

  public backwards(numberOfPosts: number = 6):Observable<any>{
    this.lastVisibleDoc= this.blogPosts[0].id
   return this["back"](numberOfPosts)
  }

  public getPost(slug:string) : Observable<IBlogPost[]>{
    return this.getThePostWithSlug(slug)
  }

  public tagged(tag:string) : Observable<IBlogPost[]>{
    return this.getPostsTagged(tag);
  }

  public post(blogPost:IBlogPost): IBlogPost | void{
    return this.submitBlogPost({...blogPost});
  }

  private submitBlogPost(blogPost: IBlogPost) :IBlogPost | void {
    let submittedBlogPost: IBlogPost;
    from(this.firestore.doc(`${QUERY_PATHS.BLOG}/${blogPost.slug}`)
      .set(blogPost)).pipe(map(_=>{
        this.firestore.doc(`${QUERY_PATHS.BLOG}/${blogPost.slug}`).get().pipe(
          map(_=>submittedBlogPost = _.data() as IBlogPost)
        )
      })).subscribe()
      return submittedBlogPost;
  }

  public update(blogPost:IBlogPost){
    let updatedBlogPost:IBlogPost
    return this.firestore.collection(QUERY_PATHS.BLOG)
    .doc(blogPost.id).set(washType(blogPost))
    .catch((err?: Error) => this.logger.logError(err ?? new Error('Error updating post'), null, EEventType.Server))
  }
  public delete(blogPost:IBlogPost) : Observable<void>{
    debugger
    return from(this.firestore.doc(`${QUERY_PATHS.BLOG}/${blogPost.slug}`).delete())
  }

  public addComment(blogPost:IBlogPost, comment:IBlogComment){
    blogPost.comments.push(comment);
    return from(this.firestore.doc<IBlogPost>(QUERY_PATHS.BLOG+ '/' +blogPost.id)
      .update(washType(blogPost))
    )
  }

  public approveComment(blogPostRef:string, comment:IBlogComment)  {

     return this.firestore.doc(`${QUERY_PATHS.BLOG}/${blogPostRef}`)
      .get()
      .pipe(mergeMap(snap=>{
        let blogPost = snap.data() as IBlogPost
        (blogPost.comments.find(x=>x.commentBody==comment.commentBody)).approved=true;
        return this.firestore.doc<IBlogPost>(`${QUERY_PATHS.BLOG}/${blogPost.id}`)
        .update(washType(blogPost))
      }))

  }

  public deleteComment(blogPostRef: string, comment:IBlogComment){
    return this.firestore.doc(`${QUERY_PATHS.BLOG}/${blogPostRef}`)
    .get()
    .pipe(mergeMap(snap=>{
      let blogPost = snap.data() as IBlogPost
      blogPost.comments.splice(blogPost.comments.findIndex(x=>x===comment),1);
      return this.firestore.doc<IBlogPost>(`${QUERY_PATHS.BLOG}/${blogPost.id}`)
      .update(washType(blogPost))
    }))
  }

  private getPostsTagged(tag: string) {
    return this.firestore.collection(QUERY_PATHS.BLOG,
      ref => ref.where('tags', 'array-contains', tag))
      .get().pipe(
        map(snap => snap.docs.map(doc => this.injectIdIntoData(doc) as IBlogPost))
      );
  }

  private getThePostWithSlug(slug: string) {
    return this.firestore.collection(QUERY_PATHS.BLOG,
      ref => ref.where('slug', '==', slug))
      .get().pipe(
        map(snap => snap.docs.map(doc => this.injectIdIntoData(doc) as IBlogPost)),
        take(1)
      );
  }






  private init(numberOfPosts: number=6) {
     return this.firestore.collection(
      QUERY_PATHS.BLOG,
      ref => ref.orderBy('timestamp','desc').limit(numberOfPosts)
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
      ref => ref.orderBy('timestamp', 'desc')
        .startAfter(this["lastVisibleDoc"])
        .limit(numberOfPosts)
    ).get().pipe(
      map(snap => snap.docs.map(doc =>this.injectIdIntoData(doc))) ,
    )
  }

  private back(numberOfPosts: number =6){
   return this.firestore.collection(
      QUERY_PATHS.BLOG,
      ref=> ref.orderBy('timestamp', 'desc')
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

