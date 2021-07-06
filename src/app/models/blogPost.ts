interface IBlogPost {
  id: string;
  slug: string;
  timestamp?: Date;
  title: string;
  author?: string;
  body: string;
  imageLinks?: string[];
  codepenSlugs?: string[];
  youtubeLinks?: string[];
  links?: string[];
  tags: string[];
  type?: PostType;
  expiryDate?: Date | null;
}

class BlogPost implements IBlogPost {
  constructor(
    id: string,
    title: string,
    body: string,
    slug: string,
    type: PostType,
    timestamp?: Date,
    author?: string,
    imageLinks?: string[],
    codepenSlugs?: string[],
    youtubeLinks?: string[],
    links?: string[],
    expiryDate?: Date | null
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
      this["expiryDate"],

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
        expiryDate ?? null,
      ]
  }
  tags: string[];
  type: PostType;
  id: string;
  slug: string;
  timestamp?: Date;
  title: string;
  author?: string;
  body: string;
  imageLinks?: string[];
  codepenSlugs?: string[];
  youtubeLinks?: string[];
  links?: string[];
  expiryDate?: Date | null;
}

class FullBlogPost extends BlogPost {
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
      PostType.FULL_BLOG_POST,
      timestamp,
      author,
      imageLinks,
      codepenSlugs,
      youtubeLinks,
      links)
    {}
  }
}

class ShortBlogPost extends BlogPost {
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

enum PostType {
  FULL_BLOG_POST = "Blog",
  SHORT_POST = "Short",
  SOCIAL_MEDIA = "Social",
  EXPIRING = "Expiry",
  UNCATEGORIZED = "Uncategorized"
}
