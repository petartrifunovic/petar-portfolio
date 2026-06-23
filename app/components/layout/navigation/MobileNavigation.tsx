'use client';

import { useEffect, useState } from 'react';

const NAV_ITEMS = [
  { label: 'Introduction', href: '#introduction' },
  { label: 'Hot Topics', href: '#hot-topics' },
  { label: 'Development', href: '#development' },
  { label: 'Web Design', href: '#web-design' },
  { label: 'Graphic Design', href: '#graphic-design' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Clients', href: '#clients' },
  { label: 'Latest Posts', href: '#latest-posts' },
  { label: 'Contact', href: '#contact' },
] as const;

const MobileNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const handleScrollToSection = (href: string) => {
    const element = document.querySelector(href);

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }

    setIsOpen(false);
    setActiveItem(null);
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <button
        type='button'
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        className='fixed top-4 right-4 z-50 xl:hidden w-14 h-14 rounded-full bg-background border border-border flex items-center justify-center cursor-pointer group shadow-2xl'
      >
        <span className='relative w-6 h-6 flex items-center justify-center'>
          <span
            className={`absolute h-[0.1rem] w-6 bg-foreground rounded transition-all duration-300 ${
              isOpen ? 'rotate-45' : '-translate-y-2'
            }`}
          />
          <span
            className={`absolute h-[0.1rem] w-4 group-hover:w-6 bg-foreground rounded transition-all duration-300 ${
              isOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`absolute h-[0.1rem] w-6 bg-foreground rounded transition-all duration-300 ${
              isOpen ? '-rotate-45' : 'translate-y-2'
            }`}
          />
        </span>
      </button>

      <div
        className={`fixed inset-0 z-40 xl:hidden transition-all duration-300 ${
          isOpen
            ? 'opacity-100 visible pointer-events-auto'
            : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        <div className='absolute inset-0 bg-background/95 backdrop-blur-sm' />

        <nav className='relative h-screen flex items-center justify-center px-6'>
          <ul className='flex flex-col items-center w-full max-w-md'>
            {NAV_ITEMS.map((item) => {
              const isActive = activeItem === item.label;

              return (
                <li
                  key={item.label}
                  className='w-full'
                  onMouseEnter={() => setActiveItem(item.label)}
                  onMouseLeave={() => setActiveItem(null)}
                >
                  <button
                    type='button'
                    onClick={() => handleScrollToSection(item.href)}
                    className='relative flex justify-center items-center w-full py-0 sm:py-1 uppercase tracking-wide text-xl sm:text-2xl font-light cursor-pointer'
                  >
                    <span
                      className={`relative flex items-center justify-center w-[88%] h-14 sm:h-16 transition-all duration-300 ease-out ${
                        isActive ? 'translate-x-3' : 'translate-x-0'
                      }`}
                    >
                      <span
                        className={`absolute inset-0 bg-foreground  transition-all duration-300 ease-out ${
                          isActive
                            ? 'opacity-100 scale-100 skew-x-[-14deg]'
                            : 'opacity-0 scale-95 skew-x-0'
                        }`}
                      />

                      <span
                        className={`relative z-10 transition-all duration-300 ease-out ${
                          isActive ? 'text-accent-50' : 'text-foreground'
                        }`}
                      >
                        {item.label}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default MobileNavigation;
