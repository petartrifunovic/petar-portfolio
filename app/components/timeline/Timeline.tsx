'use client';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Reveal from '../motion/Reveal';
import Image from 'next/image';
import Card from '../card/Card';
import Heading from '../typography/heading/Heading';
import Paragraph from '../typography/paragraph/Paragraph';

type TimelineItem = {
  id: number;
  title: string;
  description: string;
  icon: string;
};

const timelineItems: TimelineItem[] = [
  {
    id: 1,
    title: 'Adobe Photoshop',
    description:
      'Creating polished visual assets for digital and print, including marketing materials, banners, posters, social media graphics, and presentation visuals with strong attention to detail and brand consistency.',
    icon: '/timeline-icons/photoshop.svg',
  },
  {
    id: 2,
    title: 'Adobe Illustrator',
    description:
      'Designing clean vector graphics, icons, illustrations, logos, and scalable visual elements for websites, publications, technical materials, and brand-focused design projects.',
    icon: '/timeline-icons/illustrator.svg',
  },
  {
    id: 3,
    title: 'Adobe XD',
    description:
      'Building interactive wireframes, prototypes, and interface mockups that connect structure, visual design, and user flow into a clear and functional digital experience.',
    icon: '/timeline-icons/xd.svg',
  },
  {
    id: 4,
    title: 'Figma',
    description:
      'Designing modern user interfaces, responsive layouts, design systems, and interactive prototypes that support collaboration, consistency, and efficient handoff to development.',
    icon: '/timeline-icons/figma.svg',
  },
  {
    id: 5,
    title: 'Sketch',
    description:
      'Creating high-quality UI layouts, reusable components, wireframes, and polished interface concepts focused on usability, visual clarity, and smooth user experience.',
    icon: '/timeline-icons/sketch.svg',
  },
];

const GAP = 32;
const ICON_SIZE = 64;
const DOT_SIZE = 20;
const CARD_MAX_WIDTH = 520;
const ROW_FALLBACK_HEIGHT = 120;
const ROW_BOTTOM_SPACE = 12;

const useTimelineScroll = () => {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [progress, setProgress] = useState(0);
  const [reached, setReached] = useState(0);
  const [span, setSpan] = useState({ top: 0, height: 0 });

  useEffect(() => {
    const track = trackRef.current;

    if (!track) return;

    let frame = 0;

    const measure = () => {
      frame = 0;

      const rect = track.getBoundingClientRect();
      const viewport = window.innerHeight;
      const start = viewport * 0.92;
      const end = viewport * 0.72;
      const travel = rect.height * 0.7 + start - end;
      const next =
        travel <= 0 ? 1 : Math.min(1, Math.max(0, (start - rect.top) / travel));

      setProgress(next);

      const dots = dotRefs.current.filter(Boolean) as HTMLDivElement[];

      if (dots.length < 2) return;

      const firstRect = dots[0].getBoundingClientRect();
      const lastRect = dots[dots.length - 1].getBoundingClientRect();
      const spanTop = firstRect.top + firstRect.height / 2;
      const spanBottom = lastRect.top + lastRect.height / 2;

      setSpan({ top: spanTop - rect.top, height: spanBottom - spanTop });

      const filledBottom = spanTop + (spanBottom - spanTop) * next;

      let count = 0;

      for (const dot of dots) {
        const dotRect = dot.getBoundingClientRect();

        if (dotRect.top + dotRect.height / 2 <= filledBottom + 2) count += 1;
      }

      setReached(count);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return { trackRef, dotRefs, progress, reached, span };
};

const Timeline = () => {
  const dotTop = 22;
  const dotCenter = dotTop + DOT_SIZE / 2;
  const {
    trackRef: desktopTrackRef,
    dotRefs: desktopDotRefs,
    progress: desktopProgress,
    reached: desktopReached,
  } = useTimelineScroll();
  const {
    trackRef: mobileTrackRef,
    dotRefs: mobileDotRefs,
    progress: mobileProgress,
    reached: mobileReached,
    span: mobileSpan,
  } = useTimelineScroll();

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [rowHeights, setRowHeights] = useState<number[]>(
    timelineItems.map(() => ROW_FALLBACK_HEIGHT),
  );

  useLayoutEffect(() => {
    const measure = () => {
      const nextHeights = timelineItems.map((_, index) => {
        const cardHeight = cardRefs.current[index]?.offsetHeight ?? 0;
        return (
          Math.max(cardHeight, ICON_SIZE, ROW_FALLBACK_HEIGHT) +
          ROW_BOTTOM_SPACE
        );
      });

      setRowHeights(nextHeights);
    };

    measure();
    window.addEventListener('resize', measure);

    return () => {
      window.removeEventListener('resize', measure);
    };
  }, []);

  const lastRowHeight =
    rowHeights[rowHeights.length - 1] ?? ROW_FALLBACK_HEIGHT;

  return (
    <div>
      <div className='relative'>
        <div
          ref={desktopTrackRef}
          className='relative hidden w-full md:block'
        >
          <div
            className='absolute left-1/2 w-px origin-top bg-primary'
            style={{
              top: dotCenter,
              bottom: Math.max(lastRowHeight - dotCenter, 0),
              transform: `translateX(-50%) scaleY(${desktopProgress})`,
            }}
          />
          <div className='relative flex flex-col gap-10 lg:gap-12'>
            {timelineItems.map((item, index) => {
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={item.id}
                  className='relative'
                  style={{ height: rowHeights[index] ?? ROW_FALLBACK_HEIGHT }}
                >
                  <div
                    ref={(el) => {
                      desktopDotRefs.current[index] = el;
                    }}
                    className='absolute left-1/2 z-10 rounded-full bg-primary'
                    style={{
                      width: DOT_SIZE,
                      height: DOT_SIZE,
                      top: dotTop,
                      opacity: index < desktopReached ? 1 : 0,
                      transform: `translateX(-50%) scale(${
                        index < desktopReached ? 1 : 0.4
                      })`,
                      transition:
                        'opacity 260ms ease-out, transform 260ms cubic-bezier(0.34, 1.56, 0.64, 1)',
                    }}
                  />
                  <div
                    className='absolute top-0 z-20 flex items-center justify-center rounded-2xl bg-card'
                    style={
                      isLeft
                        ? {
                            width: ICON_SIZE,
                            height: ICON_SIZE,
                            left: `calc(50% + ${GAP}px)`,
                          }
                        : {
                            width: ICON_SIZE,
                            height: ICON_SIZE,
                            right: `calc(50% + ${GAP}px)`,
                          }
                    }
                  >
                    <Image
                      src={item.icon}
                      alt={item.title}
                      width={36}
                      height={36}
                      className='h-9 w-9 object-contain'
                    />
                  </div>
                  {isLeft && (
                    <div
                      ref={(el) => {
                        cardRefs.current[index] = el;
                      }}
                      className='absolute top-0'
                      style={{
                        right: `calc(50% + ${GAP}px)`,
                        width: `min(${CARD_MAX_WIDTH}px, calc(50% - ${GAP}px - 24px))`,
                      }}
                    >
                      <Reveal>
                        <Card className='hover:-translate-y-1 transition duration-200 ease-in-out'>
                          <Heading
                            level={4}
                            className='mb-2 text-lg text-right font-semibold'
                          >
                            {item.title}
                          </Heading>
                          <Paragraph className='text-right text-sm'>
                            {item.description}
                          </Paragraph>
                        </Card>
                      </Reveal>
                    </div>
                  )}

                  {!isLeft && (
                    <div
                      ref={(el) => {
                        cardRefs.current[index] = el;
                      }}
                      className='absolute top-0'
                      style={{
                        left: `calc(50% + ${GAP}px)`,
                        width: `min(${CARD_MAX_WIDTH}px, calc(50% - ${GAP}px - 24px))`,
                      }}
                    >
                      <Reveal>
                        <Card className='hover:-translate-y-1 transition duration-200 ease-in-out'>
                          <Heading
                            level={4}
                            className='mb-2 text-lg font-semibold'
                          >
                            {item.title}
                          </Heading>
                          <Paragraph className='text-sm'>
                            {item.description}
                          </Paragraph>
                        </Card>
                      </Reveal>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div
          ref={mobileTrackRef}
          className='relative flex w-full flex-col gap-5 md:hidden'
        >
          <div
            className='absolute left-0 w-px origin-top bg-primary'
            style={{
              top: mobileSpan.top,
              height: mobileSpan.height,
              transform: `translateX(-50%) scaleY(${mobileProgress})`,
            }}
          />
          {timelineItems.map((item, index) => {
            return (
              <div key={item.id} className='relative flex'>
                <div className='relative w-5.5 shrink-0'>
                  <div
                    ref={(el) => {
                      mobileDotRefs.current[index] = el;
                    }}
                    className='absolute left-0 top-5 z-10 h-5 w-5 rounded-full bg-primary'
                    style={{
                      opacity: index < mobileReached ? 1 : 0,
                      transform: `translateX(-50%) scale(${
                        index < mobileReached ? 1 : 0.4
                      })`,
                      transition:
                        'opacity 260ms ease-out, transform 260ms cubic-bezier(0.34, 1.56, 0.64, 1)',
                    }}
                  />
                </div>
                <div className='flex min-w-0 flex-1 items-start gap-3'>
                  <div className='relative z-20 mt-[2px] flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-card'>
                    <Image
                      src={item.icon}
                      alt={item.title}
                      width={30}
                      height={30}
                      className='h-8 w-8 object-contain'
                    />
                  </div>
                  <Reveal className='min-w-0 flex-1'>
                    <Card className='rounded-2xl p-5'>
                    <Heading level={3} className='mb-2 font-semibold'>
                      {item.title}
                    </Heading>
                    <Paragraph className='text-sm'>
                      {item.description}
                    </Paragraph>
                    </Card>
                  </Reveal>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
