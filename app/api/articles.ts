import { Article, ArticlesResult, HeroImage } from '../types/article';

const API_BASE =
  process.env.CORALS_API_URL?.trim() || 'https://api.corals.studio';

export const JOURNAL_URL =
  process.env.NEXT_PUBLIC_JOURNAL_URL?.trim() ||
  'https://corals.studio/journal';

const FETCH_TIMEOUT_MS = 5000;

const REVALIDATE_SECONDS = 300;

export type FetchArticlesOptions = {
  limit?: number;
  page?: number;
  sort?: string;
  search?: string;
  featured?: boolean;
};

const toAbsoluteUrl = (url: string) =>
  /^https?:\/\//i.test(url) ? url : `${API_BASE}${url.startsWith('/') ? '' : '/'}${url}`;

const normalizeHeroImage = (raw: unknown): HeroImage | null => {
  if (!raw) return null;

  if (typeof raw === 'string') return { url: toAbsoluteUrl(raw) };

  const image = raw as Partial<HeroImage>;

  if (typeof image.url !== 'string' || !image.url) return null;

  return {
    url: toAbsoluteUrl(image.url),
    alt: image.alt,
    width: typeof image.width === 'number' ? image.width : undefined,
    height: typeof image.height === 'number' ? image.height : undefined,
  };
};

const normalizeAuthor = (raw: Record<string, unknown>): string | undefined => {
  const author = raw.author;

  if (typeof author === 'string') return author;

  if (author && typeof author === 'object') {
    const { name, fullName } = author as Record<string, unknown>;

    if (typeof name === 'string') return name;
    if (typeof fullName === 'string') return fullName;
  }

  return typeof raw.authorName === 'string' ? raw.authorName : undefined;
};

const normalizeArticle = (raw: Record<string, unknown>): Article | null => {
  const title = typeof raw.title === 'string' ? raw.title : '';
  const slug = typeof raw.slug === 'string' ? raw.slug : '';

  if (!title || !slug) return null;

  return {
    id: String(raw.id ?? raw._id ?? slug),
    title,
    slug,
    summary: typeof raw.summary === 'string' ? raw.summary : undefined,
    heroImage: normalizeHeroImage(raw.heroImage),
    readingMinutes:
      typeof raw.readingMinutes === 'number' ? raw.readingMinutes : undefined,
    publishedAt:
      typeof raw.publishedAt === 'string' ? raw.publishedAt : undefined,
    featured: raw.featured === true,
    authorName: normalizeAuthor(raw),
  };
};

export const getArticles = async (
  options: FetchArticlesOptions = {},
): Promise<ArticlesResult> => {
  const { limit, page, sort, search, featured } = options;

  const params = new URLSearchParams();

  if (limit) params.set('limit', String(limit));
  if (page) params.set('page', String(page));
  if (sort) params.set('sort', sort);
  if (search) params.set('search', search);
  if (featured !== undefined) params.set('featured', String(featured));

  const query = params.toString();
  const url = `${API_BASE}/api/v1/articles${query ? `?${query}` : ''}`;

  try {
    const res = await fetch(url, {
      next: { revalidate: REVALIDATE_SECONDS },
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });

    if (!res.ok) {
      throw new Error(`Corals API responded with ${res.status} ${res.statusText}`);
    }

    const json = await res.json();

    const raw = json?.data?.articles ?? json?.data ?? [];
    const list: unknown[] = Array.isArray(raw) ? raw : [];

    const articles = list
      .map((item) => normalizeArticle(item as Record<string, unknown>))
      .filter((article): article is Article => article !== null);

    return {
      articles,
      total: typeof json?.total === 'number' ? json.total : articles.length,
      error: null,
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';

    console.error('[journal] Failed to load articles:', message);

    return { articles: [], total: 0, error: message };
  }
};
