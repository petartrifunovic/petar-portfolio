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

// Each inner array is one row in the stacked layout; the inline layout
// flows every brand into a single wrapping row.
const brandRows: Brand[][] = [
  [
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
  ],
  [
    {
      name: 'Provereno',
      href: 'https://provereno.rs/',
      mask: '/provereno_dark.svg',
      ratio: 333 / 49,
      nudge: 3.5,
      nudgeX: -2.5,
    },
  ],
];

const Founder = ({
  className = '',
  logoWidth = 96,
  align = 'center',
  layout = 'stacked',
}: FounderProps) => {
  const isInline = layout === 'inline';
  const rows = isInline ? [brandRows.flat()] : brandRows;

  // Nudges line a logo up with its neighbours; a logo alone in its row has
  // none, so it stays centred.
  const renderBrand = (brand: Brand, solo: boolean) => (
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
          transform: solo
            ? undefined
            : `translate(${brand.nudgeX ?? 0}px, ${brand.nudge ?? 0}px)`,
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
  );

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
      <div className='flex flex-col gap-y-3'>
        {rows.map((row) => (
          <div
            key={row.map((brand) => brand.name).join('|')}
            className={cn(
              'flex flex-wrap items-center gap-x-4 gap-y-3',
              align === 'center' ? 'justify-center' : 'justify-start',
            )}
          >
            {row.map((brand) => renderBrand(brand, row.length === 1))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Founder;
