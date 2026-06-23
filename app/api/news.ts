export const fetchNews = async () => {
  const res = await fetch(
    `https://newsdata.io/api/1/latest?apikey=${process.env.NEXT_PUBLIC_NEWSDATA_KEY}&category=technology&language=en`,
  );

  if (!res.ok) throw new Error('Failed to fetch news');

  const data = await res.json();

  return data.results || [];
};
