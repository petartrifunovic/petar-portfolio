import Link from 'next/link';
import Icon from '../icon/Icon';

type SocialIconName =
  | 'Linkedin01Icon'
  | 'NewTwitterRectangleIcon'
  | 'InstagramIcon'
  | 'Facebook01Icon';

export type SocialItem = {
  name: SocialIconName;
  href: string;
  label?: string;
};

type SocialProps = {
  items?: SocialItem[];
  className?: string;
};

const defaultSocials: SocialItem[] = [
  {
    name: 'Linkedin01Icon',
    href: 'https://linkedin.com',
    label: 'LinkedIn',
  },
  {
    name: 'NewTwitterRectangleIcon',
    href: 'https://twitter.com',
    label: 'Twitter',
  },
  {
    name: 'InstagramIcon',
    href: 'https://www.instagram.com/sir_petar/',
    label: 'Instagram',
  },
  {
    name: 'Facebook01Icon',
    href: 'https://www.facebook.com/petar.trifunovic.9',
    label: 'Facebook',
  },
];

const Social = ({ items = defaultSocials, className = '' }: SocialProps) => {
  return (
    <div className={`flex gap-2 ${className}`}>
      {items.map((social) => (
        <Link
          key={social.name}
          href={social.href}
          target='_blank'
          rel='noopener noreferrer'
          aria-label={social.label}
          className='group'
        >
          <Icon
            name={social.name}
            className='text-muted transition duration-200 ease-in-out group-hover:text-title'
          />
        </Link>
      ))}
    </div>
  );
};

export default Social;
