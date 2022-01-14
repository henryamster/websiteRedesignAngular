import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { FunctionResponse } from 'functions/src';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { functionNames } from 'src/app/api/api-helpers';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class InstagramService {

  private readonly instagramId:string= environment.INSTAGRAM_ID
  private readonly prefix:string = "https://graph.instagram.com/"
  private readonly fields: string[] = ['id', 'caption', 'media_type','media_url','username','timestamp']

private assembleGetMediaEdgeURL(){
  return `${this.prefix}${this.instagramId}/media?fields=${this.fields.join(',')}`
}
  instagramFeed() : Observable<IInstagramRequest>{
   const URL_WITHOUT_TOKEN = this.assembleGetMediaEdgeURL()
    return  (this.afFunc.httpsCallable(functionNames.GET_INSTAGRAM_FEED)(URL_WITHOUT_TOKEN))
     .pipe(map(
       (resp:FunctionResponse)=> resp["data"] as IInstagramRequest
     ))
  }

  constructor(private http: HttpClient, private afFunc: AngularFireFunctions) {

   }
}

export interface IInstagramPost{
  id:string;
  media_type: string;
  media_url: string;
  username: string;
  timestamp: string;
  caption? :string;
}

export interface IInstagramPaging{
    cursors: {
        before: string;
        after: string;
    },
    "next": string;
}

export interface IInstagramRequest{
  data: IInstagramPost[]
  paging: IInstagramPaging
}
export enum INSTAGRAM_MEDIA_TYPES{
  CAROUSEL_ALBUM="CAROUSEL_ALBUM",
  VIDEO="VIDEO",
  IMAGE="IMAGE",
}
