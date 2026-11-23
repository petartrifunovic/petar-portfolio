'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
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
    title: 'PayCanon Schedule Calendar',
    description:
      'Every day carries its own type: working, weekend, holiday, standby or off. Quick-select fills a whole range in one action.',
    image: '/portfolio/paycanon_1.jpg',
  },
  {
    id: 2,
    title: 'PayCanon Staffing Report',
    description:
      'Only teams over 30% absent are listed, so managers see the departments actually at risk. Key columns stay frozen while the row scrolls.',
    image: '/portfolio/paycanon_2.jpg',
  },
  {
    id: 3,
    title: 'Camellia Brand Identity',
    description:
      'A drawn botanical mark above a wide-tracked wordmark, gold on deep green. Single-weight strokes throughout, so it survives foil stamping.',
    image: '/portfolio/camellia.jpg',
  },
  {
    id: 4,
    title: 'Corals Studio Pricing Engine',
    description:
      'Pick the lines you need and the estimate builds as you go. The site and the enquiry form share one resolver, so they cannot quote different numbers.',
    image: '/portfolio/corals_studio_pricing.jpg',
  },
  {
    id: 5,
    title: 'Radio Periskop Merchandise',
    description:
      'The station mark blown up and sprayed soft across the back, so it reads from across a room. Lime on black, year and handles set small.',
    image: '/portfolio/radio_periskop.jpg',
  },
  {
    id: 6,
    title: 'PayCanon Employee Dashboard',
    description:
      'Attendance, remote split, staffing capacity and absence overlaps on one screen. Each figure is a ring you read at a glance.',
    image: '/portfolio/paycanon_dashboard.jpg',
  },
  {
    id: 7,
    title: 'Camellia Business Card',
    description:
      'Gold foil on black stock, the mark carried alone. At this size the drawing is what people recognise, so nothing competes with it.',
    image: '/portfolio/camellia_business_card.jpg',
  },
  {
    id: 8,
    title: 'PayCanon Mobile App',
    description:
      'Leave requests, org chart, documents, scheduling and payroll under one drawer. The open ring in the wordmark doubles as the app mark.',
    image: '/portfolio/paycanon_3.jpg',
  },
  {
    id: 9,
    title: 'Radio Periskop App Icon',
    description:
      'The same four circles as a flat two-colour icon. It holds at watch size, where the sprayed mark would turn to mush.',
    image: '/portfolio/radio_periskop_app.jpg',
  },
  {
    id: 10,
    title: 'Provereno Jobs Board',
    description:
      'Work in your own trades, inside the radius you set, shown as a distance rather than an address. Each card says how many have quoted, never at what price.',
    image: '/portfolio/provereno_find_job.jpg',
  },
  {
    id: 11,
    title: 'Provereno Messages',
    description:
      'Request, quote and acceptance sit in the same thread as the chat, so the deal and the conversation are one record. Phone numbers stay hidden until a quote is accepted.',
    image: '/portfolio/provereno_messages.jpg',
  },
  {
    id: 12,
    title: 'Provereno App Icon',
    description:
      'The v in the wordmark is drawn as a tick, and the icon keeps only that, white on a single blue. Provereno means "verified", so the mark says it before the name does.',
    image: '/portfolio/provereno_app_icon.jpg',
  },
];

const INITIAL_COUNT = 3;

const Portfolio = () => {
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [showAll, setShowAll] = useState(false);

  const dialogTitleId = useId();
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  const open = (item: PortfolioItem) => {
    openerRef.current = document.activeElement as HTMLElement | null;
    setSelectedItem(item);
  };

  const close = useCallback(() => {
    setSelectedItem(null);
    openerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!selectedItem) return;

    closeRef.current?.focus();

    const { overflow } = document.body.style;

    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close();
        return;
      }

      if (event.key !== 'Tab') return;

      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );

      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = overflow;
    };
  }, [selectedItem, close]);

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
                sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px'
                className='object-cover transition-transform duration-500 ease-out group-hover:scale-110 group-hover:rotate-3'
              />
              <div className='absolute inset-0 transition duration-300 group-hover:bg-black/80 group-focus-within:bg-black/80' />
              <div className='absolute inset-0 flex flex-col justify-between p-5'>
                <div className='pointer-events-none translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100'>
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
                    onClick={() => open(item)}
                    aria-label={`Open ${item.title}`}
                    className={cn(
                      'group flex h-12 w-12 cursor-pointer items-center justify-center rounded-full',
                      'bg-white/20 text-title backdrop-blur-sm',
                      'translate-y-4 opacity-0 transition-all duration-300',
                      'hover:scale-110 hover:bg-primary/20',
                      'group-hover:translate-y-0 group-hover:opacity-100',
                      'focus-visible:translate-y-0 focus-visible:opacity-100',
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
            className='group'
          >
            {showAll ? 'Show less' : 'Show more'}
            <span
              aria-hidden='true'
              className={cn(
                'block h-4 w-4 shrink-0 bg-title transition-all duration-200',
                'group-hover:bg-primary-400',
                showAll && 'rotate-180',
              )}
              style={{
                maskImage: 'url(/chevron_down.svg)',
                WebkitMaskImage: 'url(/chevron_down.svg)',
                maskRepeat: 'no-repeat',
                WebkitMaskRepeat: 'no-repeat',
                maskPosition: 'center',
                WebkitMaskPosition: 'center',
                maskSize: 'contain',
                WebkitMaskSize: 'contain',
              }}
            />
          </Button>
        </div>
      )}

      {selectedItem &&
        createPortal(
          <div
            ref={dialogRef}
            role='dialog'
          aria-modal='true'
          aria-labelledby={dialogTitleId}
          className='fixed inset-0 z-[999] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm'
          onClick={close}
        >
          <div
            className='relative w-full max-w-4xl'
            onClick={(e) => e.stopPropagation()}
          >
            <button
              ref={closeRef}
              type='button'
              onClick={close}
              aria-label='Close modal'
              className='absolute right-4 top-4 z-20 flex cursor-pointer rounded-full bg-black/20 p-1 text-white'
            >
              <Icon name='Cancel01Icon' size={20} />
            </button>
            <div className='max-h-[90vh] overflow-y-auto rounded-xl bg-card shadow-2xl'>
              <div className='relative'>
                <Image
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  width={1200}
                  height={900}
                  className='h-auto w-full'
                />
              </div>
              <div className='flex flex-col gap-2 border-t border-border bg-card p-6'>
                <Heading level={3} size='sm' id={dialogTitleId}>
                  {selectedItem.title}
                </Heading>
                <Paragraph>{selectedItem.description}</Paragraph>
              </div>
            </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
};

export default Portfolio;
