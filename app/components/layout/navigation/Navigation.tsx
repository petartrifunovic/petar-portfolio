import Link from 'next/link';
import Tooltip from '../../tooltip/Tooltip';

const NAV_ITEMS = [
  { label: 'Introduction', href: '#introduction', icon: '/user.svg' },
  { label: 'Hot Topics', href: '#hot-topics', icon: '/link.svg' },
  { label: 'Development', href: '#development', icon: '/development.svg' },
  { label: 'Web Design', href: '#web-design', icon: '/web_design.svg' },
  {
    label: 'Graphic Design',
    href: '#graphic-design',
    icon: '/graphic_design.svg',
  },
  { label: 'Portfolio', href: '#portfolio', icon: '/portfolio.svg' },
  { label: 'Clients', href: '#clients', icon: '/clients.svg' },
  { label: 'Latest Posts', href: '#journal', icon: '/news.svg' },
  { label: 'Contact', href: '#contact', icon: '/contact.svg' },
] as const;

const iconStyle =
  'block w-5 h-5 bg-title hover:bg-primary-700 dark:hover:bg-primary-300 transition duration-200 ease-in-out';

const tooltipStyle = 'mr-5';

const Navigation = () => {
  return (
    <aside className='min-h-screen hidden xl:block'>
      <div className='sticky top-1/2 -translate-y-1/2 h-max bg-card rounded-full px-1 py-6 flex flex-col items-center space-y-6'>
        {NAV_ITEMS.map((item) => (
          <Tooltip key={item.label} text={item.label} className={tooltipStyle}>
            <Link href={item.href} aria-label={item.label}>
              <span
                aria-hidden='true'
                className={iconStyle}
                style={{
                  maskImage: `url(${item.icon})`,
                  WebkitMaskImage: `url(${item.icon})`,
                  maskRepeat: 'no-repeat',
                  WebkitMaskRepeat: 'no-repeat',
                  maskPosition: 'center',
                  WebkitMaskPosition: 'center',
                  maskSize: 'contain',
                  WebkitMaskSize: 'contain',
                }}
              />
            </Link>
          </Tooltip>
        ))}
      </div>
    </aside>
  );
};

export default Navigation;
