import Link from 'next/link';
import { cn } from '@/app/utils/cn';

interface FounderProps {
  className?: string;
  logoWidth?: number;
  align?: 'center' | 'start';
  layout?: 'stacked' | 'inline';
}

type Brand = {
  name: string;
  href: string;
  mask: string;
  ratio: number;
  nudge?: number;
  nudgeX?: number;
};

const brands: Brand[] = [
  {
    name: 'Corals Studio',
    href: 'https://corals.studio/',
    mask: '/corals_logo_dark.svg',
    ratio: 595.28 / 186.82,
  },
  {
    name: 'PayCanon',
    href: 'https://paycanon.com/',
    mask: '/paycanon_dark.svg',
    ratio: 443.74 / 106.72,
    nudge: 4,
    nudgeX: -3.6,
  },
];

const Founder = ({
  className = '',
  logoWidth = 96,
  align = 'center',
  layout = 'stacked',
}: FounderProps) => {
  const isInline = layout === 'inline';

  return (
    <div
      className={cn(
        'flex',
        isInline
          ? 'flex-wrap items-center gap-x-4 gap-y-2'
          : 'flex-col gap-2',
        isInline
          ? align === 'center'
            ? 'justify-center'
            : 'justify-start'
          : align === 'center'
            ? 'items-center'
            : 'items-start',
        className,
      )}
    >
      <span className='text-sm text-text'>Founder of</span>
      <div
        className={cn(
          'flex flex-wrap items-center gap-x-4 gap-y-3',
          align === 'center' ? 'justify-center' : 'justify-start',
        )}
      >
        {brands.map((brand) => (
          <Link
            key={brand.name}
            href={brand.href}
            target='_blank'
            rel='noopener noreferrer'
            aria-label={`${brand.name}, opens in a new tab`}
            className='group inline-flex'
          >
            <span
              aria-hidden='true'
              className='block bg-title transition-opacity duration-200 group-hover:opacity-75'
              style={{
                width: logoWidth,
                height: logoWidth / brand.ratio,
                transform: `translate(${brand.nudgeX ?? 0}px, ${brand.nudge ?? 0}px)`,
                maskImage: `url(${brand.mask})`,
                WebkitMaskImage: `url(${brand.mask})`,
                maskRepeat: 'no-repeat',
                WebkitMaskRepeat: 'no-repeat',
                maskPosition: 'center',
                WebkitMaskPosition: 'center',
                maskSize: 'contain',
                WebkitMaskSize: 'contain',
              }}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Founder;
