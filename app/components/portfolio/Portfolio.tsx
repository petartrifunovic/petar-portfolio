'use client';

import { useState } from 'react';
import Image from 'next/image';
import Heading from '../typography/heading/Heading';
import Paragraph from '../typography/paragraph/Paragraph';
import Icon from '../icon/Icon';
import Button from '../button/Button';
import { cn } from '@/app/utils/cn';

type PortfolioItem = {
  id: number;
  title: string;
  description: string;
  image: string;
};

const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: 'Finance Analytics Mobile App UI/UX Design & Development',
    description:
      'Modern finance dashboard app with clean UI, analytics charts, and smooth mobile experience.',
    image: '/portfolio/finance_analytics_mobile_app.jpg',
  },
  {
    id: 2,
    title: 'Management Mobile App UI/UX Design',
    description:
      'Clean and modern task management app with scheduling, calendar view, and productivity-focused mobile UI.',
    image: '/portfolio/management_mobile_app.jpg',
  },
  {
    id: 3,
    title: 'Finance Transactions Mobile App',
    description:
      'Modern finance app with transaction tracking, analytics, and clean mobile dashboard UI.',
    image: '/portfolio/finance_transactions_mobile_app.jpg',
  },
  {
    id: 4,
    title: 'Events Mobile App',
    description:
      'Responsive event discovery mobile app with modern UI, search functionality, and interactive frontend experience.',
    image: '/portfolio/events_mobile_app.jpg',
  },
  {
    id: 5,
    title: 'Finance Analytics Dashboard Design & Full Stack Development',
    description:
      'Modern financial analytics dashboard with interactive charts, dark UI design, and full stack web application development.',
    image: '/portfolio/finance_analytics_dashboard.jpg',
  },
  {
    id: 6,
    title: 'Job Finder Mobile App UI/UX Design',
    description:
      'Modern job search mobile app with clean UI, smart filtering, and user-friendly browsing experience.',
    image: '/portfolio/job_finder_mobile_app.jpg',
  },
  {
    id: 7,
    title: 'E-Commerce Product App',
    description:
      'Modern e-commerce mobile app with clean product showcase, smooth shopping experience, and minimal UI design.',
    image: '/portfolio/e-commerce_product_app.jpg',
  },
  {
    id: 8,
    title: 'Crypto Trading App Design & Development',
    description:
      'Modern cryptocurrency trading app with real-time charts, dark UI, and interactive analytics dashboard.',
    image: '/portfolio/crypto_trading_app.jpg',
  },
  {
    id: 9,
    title: 'Luxury Business Card Design',
    description:
      'Elegant and modern business card design with premium branding and minimal luxury aesthetic.',
    image: '/portfolio/luxury_business_card_design.jpg',
  },
  {
    id: 10,
    title: 'Real-Time Chat App Development',
    description:
      'Modern messaging application with real-time chat, clean dark UI, and responsive mobile experience.',
    image: '/portfolio/real-time_chat_app_development.jpg',
  },
  {
    id: 11,
    title: 'Modern Logo Design & Brand Identity',
    description:
      'Creative and minimal logo design focused on modern branding and professional visual identity.',
    image: '/portfolio/modern_logo_design_&_brand_identity.jpg',
  },
  {
    id: 12,
    title: 'Trading Dashboard UI Design & Development',
    description:
      'Modern trading platform with interactive charts, analytics, and responsive financial dashboard experience.',
    image: '/portfolio/trading_dashboard.jpg',
  },
];

const INITIAL_COUNT = 3;

const Portfolio = () => {
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [showAll, setShowAll] = useState(false);

  const visibleItems = showAll
    ? portfolioItems
    : portfolioItems.slice(0, INITIAL_COUNT);

  return (
    <div className='flex flex-col gap-6'>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {visibleItems.map((item) => (
          <article
            key={item.id}
            className='group relative overflow-hidden rounded-xl bg-card border border-border'
          >
            <div className='relative aspect-[4/4] overflow-hidden'>
              <Image
                src={item.image}
                alt={item.title}
                fill
                className='object-cover transition-transform duration-500 ease-out group-hover:scale-110 group-hover:rotate-3'
              />

              <div className='absolute inset-0 transition duration-300 group-hover:bg-black/80' />

              <div className='absolute inset-0 flex flex-col justify-between p-5'>
                <div className='pointer-events-none translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100'>
                  <Heading level={4} size='md' className='mb-2 text-white'>
                    {item.title}
                  </Heading>
                  <Paragraph className='max-w-[90%] text-sm leading-6 text-white/70'>
                    {item.description}
                  </Paragraph>
                </div>

                <div className='flex justify-end'>
                  <button
                    type='button'
                    onClick={() => setSelectedItem(item)}
                    aria-label={`Open ${item.title}`}
                    className={cn(
                      'group flex h-12 w-12 cursor-pointer items-center justify-center rounded-full',
                      'bg-white/20 text-title backdrop-blur-sm',
                      'translate-y-4 opacity-0 transition-all duration-300',
                      'hover:scale-110 hover:bg-primary/20',
                      'group-hover:translate-y-0 group-hover:opacity-100',
                    )}
                  >
                    <Icon
                      name='PlusSignIcon'
                      size={22}
                      className='text-white'
                    />
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {portfolioItems.length > INITIAL_COUNT && (
        <div className='flex justify-center'>
          <Button
            type='button'
            variant='ghost'
            size='none'
            onClick={() => setShowAll((prev) => !prev)}
            iconRight={showAll ? 'ArrowUp01Icon' : 'ArrowDown01Icon'}
            iconRightClassName='w-4 h-4'
          >
            {showAll ? 'Show less' : 'Show more'}
          </Button>
        </div>
      )}

      {selectedItem && (
        <div
          className='fixed inset-0 z-[999] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm'
          onClick={() => setSelectedItem(null)}
        >
          <div
            className='relative w-fit max-w-[95vw]'
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type='button'
              onClick={() => setSelectedItem(null)}
              aria-label='Close modal'
              className='absolute right-4 top-4 z-20 flex cursor-pointer rounded-full bg-black/20 p-1 text-white'
            >
              <Icon name='Cancel01Icon' size={20} />
            </button>

            <div className='overflow-hidden rounded-xl bg-card shadow-2xl'>
              <div className='relative'>
                <Image
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  width={1200}
                  height={900}
                  className='h-auto max-h-[80vh] w-auto max-w-[95vw] object-contain'
                />
              </div>

              <div className='flex flex-col gap-2 border-t border-border bg-card p-6'>
                <Heading level={3} size='sm'>
                  {selectedItem.title}
                </Heading>
                <Paragraph>{selectedItem.description}</Paragraph>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
