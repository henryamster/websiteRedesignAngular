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
 /**
  * Get all the blogs from the database and store them in the blogs variable.
  * @param {AngularFirestore} firestore - AngularFirestore - This is the Firestore service that we
  * injected in the constructor.
  * @param {LoggerService} logger - LoggerService
  */
  constructor(private firestore: AngularFirestore,
    private logger:LoggerService
    // private functions: AngularFireFunctions
    ) {
    this.getPaginatedBlogs()
  }

 /**
  * Clear the last document that was visible in the current tab.
  */
  public clearLastDoc(){
    this.nullifyLastVisibleDoc();
  }

/**
 * *Nullify the last visible document.*
 */
  private nullifyLastVisibleDoc() {
    this["lastVisibleDoc"] = null;
  }

/**
 * Get the next page of blog posts.
 * @param {number} [numberOfPosts=6] - number = 6
 * @returns An observable that emits the next page of blog posts.
 */
public getPaginatedBlogs(numberOfPosts: number = 6): Observable<any> {
    if (!this["lastVisibleDoc"]) { return this["init"](numberOfPosts) }
    return this["next"](numberOfPosts)
  }

/**
  * `backwards(numberOfPosts: number = 6): Observable<any>`
  *
  * `backwards` is a function that takes a number of posts to return and returns an observable.
  *
  * `numberOfPosts` is a number that defaults to 6.
  *
  * `backwards` returns an observable.
  * @param {number} [numberOfPosts=6] - number = 6
  * @returns An observable of the blog posts.
  */
  public backwards(numberOfPosts: number = 6):Observable<any>{
    this.lastVisibleDoc= this.blogPosts[0].id
   return this["back"](numberOfPosts)
  }

 /**
  * `getPost` is a function that returns an `Observable` of `IBlogPost`s.
  * @param {string} slug - string - the slug of the post you want to get
  * @returns An array of blog posts.
  */
  public getPost(slug:string) : Observable<IBlogPost[]>{
    return this.getThePostWithSlug(slug)
  }

/**
 * `tagged` returns an Observable that emits an array of blog posts that have the given tag.
 * @param {string} tag - string - the tag to filter by
 * @returns An array of blog posts.
 */
  public tagged(tag:string) : Observable<IBlogPost[]>{
    return this.getPostsTagged(tag);
  }

/**
 * `post` is a function that takes a blog post and returns a blog post.
 * @param {IBlogPost} blogPost - IBlogPost
 * @returns The blog post object.
 */
  public post(blogPost:IBlogPost): IBlogPost | void{
    return this.submitBlogPost({...blogPost});
  }

/**
 * Cannot generate summary
 * @param {IBlogPost} blogPost - IBlogPost - The blog post to be submitted.
 * @returns The blog post that was submitted.
 */
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

/**
 * Cannot generate summary
 * @param {IBlogPost} blogPost - IBlogPost - The blog post to update
 * @returns The blog post object.
 */
  public update(blogPost:IBlogPost){
    let updatedBlogPost:IBlogPost
    return this.firestore.collection(QUERY_PATHS.BLOG)
    .doc(blogPost.id).set(washType(blogPost))
    .catch((err?: Error) => this.logger.logError(err ?? new Error('Error updating post'), null, EEventType.Server))
  }

/**
 * `delete(blogPost:IBlogPost)`: Delete a blog post from the database.
 * @param {IBlogPost} blogPost - IBlogPost
 * @returns A promise that resolves to a void value.
 */
  public delete(blogPost:IBlogPost) : Observable<void>{
    debugger
    return from(this.firestore.doc(`${QUERY_PATHS.BLOG}/${blogPost.slug}`).delete())
  }

/**
 * Add a comment to a blog post.
 * @param {IBlogPost} blogPost - IBlogPost
 * @param {IBlogComment} comment - IBlogComment
 * @returns A promise that resolves to the updated blog post.
 */
  public addComment(blogPost:IBlogPost, comment:IBlogComment){
    blogPost.comments.push(comment);
    return from(this.firestore.doc<IBlogPost>(QUERY_PATHS.BLOG+ '/' +blogPost.id)
      .update(washType(blogPost))
    )
  }

  /**
   * Approve a comment on a blog post.
   * @param {string} blogPostRef - string - the id of the blog post to update
   * @param {IBlogComment} comment - IBlogComment
   * @returns The blog post with the updated comment.
   */
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

/**
 * Delete a comment from a blog post.
 * @param {string} blogPostRef - string - the id of the blog post to update
 * @param {IBlogComment} comment - IBlogComment
 * @returns The blog post.
 */
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

 /**
  * `getPostsTagged` returns a stream of blog posts that have a given tag.
  * @param {string} tag - string - the tag to search for
  * @returns A collection of blog posts.
  */
  private getPostsTagged(tag: string) {
    return this.firestore.collection(QUERY_PATHS.BLOG,
      ref => ref.where('tags', 'array-contains', tag))
      .get().pipe(
        map(snap => snap.docs.map(doc => this.injectIdIntoData(doc) as IBlogPost))
      );
  }

/**
 * Get the post with the given slug from the blog collection.
 * @param {string} slug - string - the slug of the post you want to retrieve
 * @returns An array of blog posts.
 */
  private getThePostWithSlug(slug: string) {
    return this.firestore.collection(QUERY_PATHS.BLOG,
      ref => ref.where('slug', '==', slug))
      .get().pipe(
        map(snap => snap.docs.map(doc => this.injectIdIntoData(doc) as IBlogPost)),
        take(1)
      );
  }





/**
 * Get the last 6 blog posts from the Firestore database.
 * @param {number} [numberOfPosts=6] - number=6
 * @returns A list of blog posts.
 */

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
/**
 * Cannot generate summary
 * @param doc - the document that was just created
 * @returns The id of the document.
 */

  private injectIdIntoData(doc): any {
    return Object.assign(doc["data"](), {id:doc["id"]});
  }
/**
 * `next` returns a stream of blog posts that are ordered by timestamp and start after the last visible
 * document.
 * @param {number} [numberOfPosts=6] - number=6
 * @returns A list of posts.
 */

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

