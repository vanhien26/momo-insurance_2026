export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  author: Author;
  publishedAt: string;
  updatedAt?: string;
  category: string;
  tags: string[];
  readingTime: number;
  productSlug: string;
}

export interface Author {
  name: string;
  avatar?: string;
  bio?: string;
  role?: string;
}

export interface BlogCategory {
  slug: string;
  name: string;
  description: string;
}
