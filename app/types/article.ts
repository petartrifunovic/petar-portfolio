export type HeroImage = {
  url: string;
  alt?: string;
  width?: number;
  height?: number;
};

export type Article = {
  id: string;
  title: string;
  slug: string;
  summary?: string;
  heroImage?: HeroImage | null;
  readingMinutes?: number;
  publishedAt?: string;
  featured?: boolean;
  authorName?: string;
};

export type ArticlesResult = {
  articles: Article[];
  total: number;
  error: string | null;
};
