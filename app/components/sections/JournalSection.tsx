import Image from 'next/image';
import Link from 'next/link';
import { getArticles, JOURNAL_URL } from '@/app/api/articles';
import { Article } from '@/app/types/article';
import { formatDateParts } from '@/app/utils/formatDate';
import Section from '../layout/section/Section';
import Row from '../layout/row/Row';
import GridContainer from '../layout/grid-container/GridContainer';
import Message from '../message/Message';
import Heading from '../typography/heading/Heading';
import Paragraph from '../typography/paragraph/Paragraph';
import Badge from '../badge/Badge';

const ARTICLE_COUNT = 2;

const truncateText = (text?: string, maxLength: number = 340) => {
  if (!text) return 'No description available';

  if (text.length <= maxLength) return text;

  const trimmed = text.slice(0, maxLength);
  const lastSpace = trimmed.lastIndexOf(' ');

  return (
    (lastSpace > 0 ? trimmed.slice(0, lastSpace) : trimmed).trimEnd() + '...'
  );
};

const articleUrl = (article: Article) => `${JOURNAL_URL}/${article.slug}`;

const JournalSection = async () => {
  const { articles, error } = await getArticles({
    limit: ARTICLE_COUNT,
    sort: '-publishedAt',
  });

  if (!articles.length) {
    if (process.env.NODE_ENV === 'production') return null;

    return (
      <Section id='journal'>
        <Row>
          <Message variant={error ? 'warning' : 'default'}>
            {error
              ? `Journal unavailable. ${error}`
              : 'Journal is reachable but has no published articles yet. This section is hidden in production.'}
          </Message>
        </Row>
      </Section>
    );
  }

  return (
    <Section id='journal'>
      <Row>
        <Badge className='mb-4'>Journal</Badge>
        <Heading level={2} size='xl' variant='primary'>
          Latest Writing
        </Heading>
        <Heading level={3} size='md' className='mb-1'>
          Notes on development, design and the craft behind them
        </Heading>
        <Paragraph className='mb-6 text-xs italic'>
          Published on{' '}
          <Link
            href={JOURNAL_URL}
            target='_blank'
            rel='noopener noreferrer'
            className='text-title'
          >
            corals.studio/journal
          </Link>
        </Paragraph>
        <GridContainer col='col-2' gap='xl'>
          {articles.map((article) => {
            const { day, month } = formatDateParts(article.publishedAt);
            const href = articleUrl(article);

            return (
              <article key={article.id}>
                {article.heroImage && (
                  <Link
                    href={href}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='mb-4 block overflow-hidden rounded-md'
                  >
                    <Image
                      src={article.heroImage.url}
                      alt={article.heroImage.alt ?? article.title}
                      width={article.heroImage.width ?? 1200}
                      height={article.heroImage.height ?? 675}
                      sizes='(max-width: 768px) 100vw, 50vw'
                      className='h-auto w-full transition-transform duration-300 hover:scale-105'
                    />
                  </Link>
                )}

                <div className='grid grid-cols-[max-content_1fr] gap-4'>
                  <div className='flex min-w-8 flex-col items-center justify-start'>
                    <div className='bg-primary flex h-8 w-8 items-center justify-center text-sm font-medium text-primary-50'>
                      {day}
                    </div>
                    <div className='bg-card flex h-8 w-8 items-center justify-center border border-border text-xs'>
                      {month}
                    </div>
                  </div>
                  <div>
                    <Paragraph className='mb-1 flex flex-wrap items-center gap-x-2 text-xs uppercase'>
                      {article.authorName && <span>{article.authorName}</span>}
                      {article.authorName && !!article.readingMinutes && (
                        <span aria-hidden='true'>&middot;</span>
                      )}
                      {!!article.readingMinutes && (
                        <span>{article.readingMinutes} min read</span>
                      )}
                      {article.featured && (
                        <Badge className='ml-1 py-0 text-[10px] uppercase'>
                          Featured
                        </Badge>
                      )}
                    </Paragraph>
                    <Link
                      href={href}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='hover:underline'
                    >
                      <Heading level={4} size='sm' className='mb-2'>
                        {article.title}
                      </Heading>
                    </Link>
                    <Paragraph className='mb-2 text-sm'>
                      {truncateText(article.summary, 340)}
                    </Paragraph>
                    <Link
                      href={href}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-sm italic hover:underline'
                    >
                      Read more
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </GridContainer>
      </Row>
    </Section>
  );
};

export default JournalSection;
