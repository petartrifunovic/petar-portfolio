export type NewsItem = {
  article_id: string;
  title: string;
  description?: string;
  link: string;
  pubDate?: string;
  category?: string[] | string;
};
