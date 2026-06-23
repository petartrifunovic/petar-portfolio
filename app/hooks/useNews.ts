'use client';

import { useEffect, useState } from 'react';
import { fetchNews } from '../api/news';
import { NewsItem } from '../types/news';

export const useNews = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchNews();
        setNews(data || []);
      } catch (err) {
        console.error('Failed to load news:', err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return { news, loading };
};
