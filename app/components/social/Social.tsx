import Link from 'next/link';
import { cn } from '@/app/utils/cn';

export type SocialItem = {
  name: string;
  href: string;
  icon: string;
  label: string;
};

type SocialProps = {
  items?: SocialItem[];
  className?: string;
  iconClassName?: string;
};

const defaultSocials: SocialItem[] = [
  {
    name: 'linkedin',
    href: 'https://www.linkedin.com/in/petar-trifunovic-09b83279/',
    icon: '/linkedin.svg',
    label: 'LinkedIn',
  },
  {
    name: 'x',
    href: 'https://x.com/PetarTrifunovic',
    icon: '/x.svg',
    label: 'X',
  },
  {
    name: 'instagram',
    href: 'https://www.instagram.com/sir_petar/',
    icon: '/instagram.svg',
    label: 'Instagram',
  },
  {
    name: 'facebook',
    href: 'https://www.facebook.com/petar.trifunovic.9',
    icon: '/facebook.svg',
    label: 'Facebook',
  },
];

const Social = ({
  items = defaultSocials,
  className = '',
  iconClassName = 'bg-primary',
}: SocialProps) => {
  return (
    <div className={cn('flex gap-3', className)}>
      {items.map((social) => (
        <Link
          key={social.name}
          href={social.href}
          target='_blank'
          rel='noopener noreferrer'
          aria-label={social.label}
          className='group'
        >
          <span
            aria-hidden='true'
            className={cn(
              'block h-5 w-5 transition-opacity duration-200 ease-in-out group-hover:opacity-70',
              iconClassName,
            )}
            style={{
              maskImage: `url(${social.icon})`,
              WebkitMaskImage: `url(${social.icon})`,
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
  );
};

export default Social;
