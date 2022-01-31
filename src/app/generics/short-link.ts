export interface IShortLink {
  id: string;
  url: string;
}

export class ShortLink {
  id: string;
  url: string;
  constructor(id, url){
    this.id = id;
    this.url = url;
  }
}
