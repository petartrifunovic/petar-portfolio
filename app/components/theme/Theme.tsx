'use client';

import { useSyncExternalStore } from 'react';
import { cn } from '@/app/utils/cn';
import {
  getServerTheme,
  getTheme,
  setTheme,
  subscribeTheme,
} from '@/app/utils/theme';

interface ThemeToggleProps {
  className?: string;
  variant?: 'primary' | 'secondary';
}

const maskStyle = (icon: string) => ({
  maskImage: `url(${icon})`,
  WebkitMaskImage: `url(${icon})`,
  maskRepeat: 'no-repeat',
  WebkitMaskRepeat: 'no-repeat',
  maskPosition: 'center',
  WebkitMaskPosition: 'center',
  maskSize: 'contain',
  WebkitMaskSize: 'contain',
});

export default function Theme({
  className = '',
  variant = 'primary',
}: ThemeToggleProps) {
  const theme = useSyncExternalStore(subscribeTheme, getTheme, getServerTheme);

  const isDark = theme === 'dark';

  const toggleTheme = () => setTheme(isDark ? 'light' : 'dark');

  const icon = isDark ? '/sun.svg' : '/moon.svg';
  const tint = isDark ? 'bg-orange' : 'bg-title';

  if (variant === 'primary') {
    return (
      <button
        type='button'
        onClick={toggleTheme}
        aria-label='Toggle theme'
        className={cn(
          'focus-visible:outline-2 focus-visible:outline-offset-2',
          'focus-visible:outline-primary-700 dark:focus-visible:outline-primary-300',
          className,
        )}
      >
        <span
          aria-hidden='true'
          className={cn(
            'block h-6 w-6 cursor-pointer transition-colors duration-300',
            tint,
          )}
          style={maskStyle(icon)}
        />
      </button>
    );
  }

  return (
    <button
      type='button'
      onClick={toggleTheme}
      aria-label='Toggle theme'
      className={cn(
        'relative inline-flex h-7 w-16 bg-card items-center rounded-full border-2 border-border px-1  cursor-pointer',
        className,
      )}
    >
      <span
        className={cn(
          'absolute top-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out',
          isDark ? 'left-[calc(100%-2.15rem)]' : '-left-1.5',
        )}
      >
        <span className='flex h-10 w-10 items-center justify-center rounded-full'>
          <span
            aria-hidden='true'
            className={cn('block h-5 w-5 transition-all duration-300', tint)}
            style={maskStyle(icon)}
          />
        </span>
      </span>
    </button>
  );
}
