import { Time } from '@angular/common';
import {Timestamp} from '@firebase/firestore-types';

export interface IBlogPost {
  id: string;
  slug: string;
  timestamp?: Date | Timestamp;
  title: string;
  author?: string;
  body: string;
  imageLinks?: string[];
  codepenSlugs?: string[];
  youtubeLinks?: string[];
  links?: string[];
  tags: string[];
  type?: PostType;
  expiryDate?: Date | Timestamp | null;
  comments?: IBlogComment[];
}

export class BlogPost implements IBlogPost {
  constructor(
    id: string,
    title: string,
    body: string,
    slug: string,
    type: PostType,
    timestamp?: Date | Timestamp,
    author?: string,
    imageLinks?: string[],
    codepenSlugs?: string[],
    youtubeLinks?: string[],
    links?: string[],
    tags?:string[],
    expiryDate?: Date | null,
    comments?:IBlogComment[]
  ) {
    [
      this["id"],
      this["title"],
      this["body"],
      this["slug"],
      this["type"],
      this["timestamp"],
      this["author"],
      this["imageLinks"],
      this["codepenSlugs"],
      this["youtubeLinks"],
      this["links"],
      this["tags"],
      this["expiryDate"],
      this["comments"]
    ]
      =
      [
        id,
        title,
        body,
        slug,
        type ?? PostType.UNCATEGORIZED,
        timestamp ?? new Date(),
        author ?? 'Anonymous',
        imageLinks ?? [],
        codepenSlugs ?? [],
        youtubeLinks ?? [],
        links ?? [],
        tags ?? [],
        expiryDate ?? null,
        comments ?? []
      ]
  }
  tags: string[];
  type: PostType;
  id: string;
  slug: string;
  timestamp?: Date | Timestamp;
  title: string;
  author?: string;
  body: string;
  imageLinks?: string[];
  codepenSlugs?: string[];
  youtubeLinks?: string[];
  links?: string[];
  expiryDate?: Date | null;
  comments: IBlogComment[];
}

export class FullBlogPost extends BlogPost {
  constructor(id,
    title,
    body,
    slug,
    timestamp,
    author,
    imageLinks,
    codepenSlugs,
    youtubeLinks,
    links,
    comments?
  ) {
    super(id,
      title,
      body,
      slug,
      PostType.FULL_BLOG_POST,
      timestamp,
      author,
      imageLinks,
      codepenSlugs,
      youtubeLinks,
      links,
      comments)
    {}
  }
}

export class ShortBlogPost extends BlogPost {
  constructor(id,
    title,
    body,
    slug,
    timestamp,
    author,
    imageLinks,
    codepenSlugs,
    youtubeLinks,
    links,
  ) {
    super(id,
      title,
      body,
      slug,
      PostType.SHORT_POST,
      timestamp,
      author,
      imageLinks,
      codepenSlugs,
      youtubeLinks,
      links)
    {}
  }
}

export enum PostType {
  FULL_BLOG_POST = "Blog",
  SHORT_POST = "Short",
  SOCIAL_MEDIA = "Social",
  EXPIRING = "Expiry",
  UNCATEGORIZED = "Uncategorized"
}

export interface IBlogComment{
  displayName: string;
  timestamp: Date | Timestamp;
  commentBody: string;
  approved:boolean
  profileImage?:string
  email?:string;
}

export class BlogComment implements IBlogComment{
  displayName: string;
  timestamp: Date | Timestamp;
  commentBody: string;
  approved: boolean;
  email?: string;
  profileImage?:string
  constructor(displayName: string,
    timestamp: Date | Timestamp,
    commentBody: string,
    approved: boolean,
    email?: string,
    profileImage?:string
    ){
      this["displayName"]= displayName
      this["email"]= email ?? null
      this["timestamp"]= timestamp
      this["commentBody"]= commentBody
      this["approved"]= approved ?? false
      this["profileImage"]=profileImage ?? null
    }

}
