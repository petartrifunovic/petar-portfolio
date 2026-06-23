import Link from 'next/link';
import Icon from '../../icon/Icon';
import Tooltip from '../../tooltip/Tooltip';

const NAV_ITEMS = [
  { label: 'Introduction', href: '#introduction', icon: 'UserCircle02Icon' },
  { label: 'Hot Topics', href: '#hot-topics', icon: 'Unlink04Icon' },
  { label: 'Development', href: '#development', icon: 'CodeIcon' },
  { label: 'Web Design', href: '#web-design', icon: 'WebDesign01Icon' },
  { label: 'Graphic Design', href: '#graphic-design', icon: 'PaintBoardIcon' },
  { label: 'Portfolio', href: '#portfolio', icon: 'Image01Icon' },
  { label: 'Clients', href: '#clients', icon: 'UserStoryIcon' },
  { label: 'Latest Posts', href: '#latest-posts', icon: 'NewsIcon' },
  { label: 'Contact', href: '#contact', icon: 'Mail01Icon' },
] as const;

const iconStyle =
  'w-5 h-5 hover:text-primary transition duration-200 ease-in-out';

const tooltipStyle = 'mr-5';

const Navigation = () => {
  return (
    <aside className='min-h-screen hidden xl:block'>
      <div className='sticky top-1/2 -translate-y-1/2 h-max bg-card rounded-full px-1 py-6 flex flex-col items-center space-y-6'>
        {NAV_ITEMS.map((item) => (
          <Tooltip key={item.label} text={item.label} className={tooltipStyle}>
            <Link href={item.href} aria-label={item.label}>
              <Icon name={item.icon} className={iconStyle} />
            </Link>
          </Tooltip>
        ))}
      </div>
    </aside>
  );
};

export default Navigation;
