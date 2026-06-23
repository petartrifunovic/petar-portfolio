'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/app/utils/cn';
import Icon from '../icon/Icon';

interface ThemeToggleProps {
  className?: string;
  variant?: 'primary' | 'secondary';
}

export default function Theme({
  className = '',
  variant = 'primary',
}: ThemeToggleProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    setTheme(savedTheme || 'light');
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    document.documentElement.classList.remove('dark');

    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    }

    localStorage.setItem('theme', theme);
  }, [theme, mounted]);

  if (!mounted) return null;

  const isDark = theme === 'dark';

  const toggleTheme = () =>
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  if (variant === 'primary') {
    return (
      <button
        type='button'
        onClick={toggleTheme}
        aria-label='Toggle theme'
        className={cn('focus:outline-none', className)}
      >
        <Icon
          name={isDark ? 'Sun03Icon' : 'MoonSlowWindIcon'}
          className={cn(
            'w-6 h-6 cursor-pointer transition-colors duration-300',
            isDark ? 'text-orange' : 'text-title',
          )}
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
          <Icon
            name={isDark ? 'Sun03Icon' : 'MoonSlowWindIcon'}
            className={cn(
              'h-5 w-5 transition-all duration-300',
              isDark ? 'text-orange' : 'text-title',
            )}
          />
        </span>
      </span>
    </button>
  );
}
