'use client';

import { useNews } from '@/app/hooks/useNews';
import { NewsItem } from '@/app/types/news';
import Section from '../layout/section/Section';
import Row from '../layout/row/Row';
import GridContainer from '../layout/grid-container/GridContainer';
import Loader from '../loader/Loader';
import Message from '../message/Message';
import Heading from '../typography/heading/Heading';
import Paragraph from '../typography/paragraph/Paragraph';
import { formatDateParts } from '@/app/utils/formatDate';
import Link from 'next/link';
import Badge from '../badge/Badge';

const truncateText = (text?: string, maxLength: number = 340) => {
  if (!text) return 'No description available';

  if (text.length <= maxLength) return text;

  const trimmed = text.slice(0, maxLength);
  const lastSpace = trimmed.lastIndexOf(' ');

  return (
    (lastSpace > 0 ? trimmed.slice(0, lastSpace) : trimmed).trimEnd() + '...'
  );
};

export default function NewsSection() {
  const { news, loading } = useNews();

  const latestNews = [...news]
    .sort(
      (a, b) =>
        new Date(b.pubDate || '').getTime() -
        new Date(a.pubDate || '').getTime(),
    )
    .slice(0, 2);

  if (loading) {
    return (
      <Section id='latest-posts'>
        <Row>
          <div className='flex w-full items-center justify-center py-8'>
            <Loader size='md' text='Loading news...' />
          </div>
        </Row>
      </Section>
    );
  }

  if (!news.length) {
    return (
      <Section id='latest-posts'>
        <Row>
          <Message variant='warning'>No news available</Message>
        </Row>
      </Section>
    );
  }

  return (
    <Section id='latest-posts'>
      <Row>
        <Badge className='mb-4'>Latest Posts</Badge>

        <Heading level={2} size='xl' variant='primary'>
          Latest in Tech
        </Heading>

        <Heading level={3} size='md' className='mb-1'>
          Staying up to date with the world of development
        </Heading>

        <Paragraph className='mb-6 text-xs italic'>
          Data sourced from an external 3rd party API{' '}
          <Link
            href='https://newsdata.io/'
            target='_blank'
            rel='noopener noreferrer'
            className='text-title'
          >
            (newsdata.io)
          </Link>
        </Paragraph>

        <GridContainer col='col-2' gap='xl'>
          {latestNews.map((item: NewsItem) => {
            const { day, month } = formatDateParts(item.pubDate);

            return (
              <div key={item.article_id}>
                <div className='grid grid-cols-[max-content_1fr] gap-4'>
                  <div className='flex min-w-8 flex-col items-center justify-start'>
                    <div className='bg-primary flex h-8 w-8 items-center justify-center text-sm font-medium text-primary-50'>
                      {day}
                    </div>
                    <div className='bg-background flex h-8 w-8 items-center justify-center border border-border text-xs'>
                      {month}
                    </div>
                  </div>

                  <div>
                    <Paragraph className='mb-1 text-xs uppercase'>
                      {Array.isArray(item.category)
                        ? item.category.join(', ')
                        : item.category}
                    </Paragraph>

                    <Link
                      href={item.link}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='hover:underline'
                    >
                      <Heading level={5} size='sm' className='mb-2'>
                        {item.title}
                      </Heading>
                    </Link>

                    <Paragraph className='mb-2 text-sm'>
                      {truncateText(item.description, 340)}
                    </Paragraph>

                    <Link
                      href={item.link}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-sm italic hover:underline'
                    >
                      Read more
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </GridContainer>
      </Row>
    </Section>
  );
}
