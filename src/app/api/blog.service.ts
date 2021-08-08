import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable, Subscription } from 'rxjs';
import { IBlogComment, IBlogPost } from '../models/blogPost';
import { QUERY_PATHS } from './api-helpers'
import { first, map, take, tap } from 'rxjs/operators';
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
    this.firestore.collection(QUERY_PATHS.BLOG)
      .add(blogPost).then(
        x => x.get()
          .then(y => submittedBlogPost = y.data() as IBlogPost)
      ).catch((err?: Error) => this.logger.logError(err ?? new Error('Error retrieving post after submission'), null, EEventType.Server)
      ).catch((err?: Error) => this.logger.logError(err ?? new Error('Error submitting post'), null, EEventType.Server));
    return submittedBlogPost;
  }

  public update(blogPost:IBlogPost){
    let updatedBlogPost:IBlogPost
    return this.firestore.collection(QUERY_PATHS.BLOG)
    .doc(blogPost.id).update(blogPost)
    .catch((err?: Error) => this.logger.logError(err ?? new Error('Error updating post'), null, EEventType.Server))
  }

  // public addComment(blogPost: IBlogPost, comment:IBlogComment){
  // let submittedComment: IBlogComment;
  // this.firestore.collection(QUERY_PATHS.BLOG,
  //    ref=> ref.where('id','==', blogPost.id)).add(comment).then(x=>{
  //     x.get().then(y=> submittedComment = y.data() as IBlogComment)
  //   }).catch((err?: Error) => this.logger.logError(err ?? new Error('Error retrieving comment after submission'), null, EEventType.Server)
  //   ).catch((err?: Error) => this.logger.logError(err ?? new Error('Error submitting comment'), null, EEventType.Server));
  // return submittedComment;
  // }

  public addComment(blogPost:IBlogPost, comment:IBlogComment){
    blogPost.comments.push(comment);
    return from(this.firestore.doc<IBlogPost>(QUERY_PATHS.BLOG+ '/' +blogPost.id)
      .update(washType(blogPost))
    )
  }

  public approveComment(blogPost:IBlogPost, comment:IBlogComment){
    blogPost.comments.find(x=>x===comment).approved=true;
    return from(this.firestore.doc<IBlogPost>(QUERY_PATHS.BLOG +'/'+ blogPost.id)
    .update(washType(blogPost))
    )
  }



  // public search(){
    //ref.collection('user').orderBy('name').startAt(name).endAt(name+'\uf8ff')
  // }

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

