import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class InstagramService {

  private readonly instagramId:string= environment.INSTAGRAM_ID
  private readonly prefix:string = "https://graph.instagram.com/"
  private readonly fields: string[] = ['id', 'caption', 'media_type','media_url','username','timestamp']
  private readonly token: string = environment.FB_ACCESS_TOKEN;

private assembleGetMediaEdgeURL(){
  return `${this.prefix}${this.instagramId}/media?fields=${this.fields.join(',')}&access_token=${this.token}`
}
  instagramFeed() : Observable<IInstagramRequest>{
    return this.http.get(this.assembleGetMediaEdgeURL()) as Observable<IInstagramRequest>
  }



  constructor(private http: HttpClient) {

   }
}

export interface IInstagramPost{
  id:string;
  media_type: string;
  media_url: string;
  username: string;
  timestamp: string;
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
