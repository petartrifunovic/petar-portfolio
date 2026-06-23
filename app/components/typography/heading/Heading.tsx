import React from 'react';
import { fontDisplay } from '../fonts/Fonts';
import { cn } from '@/app/utils/cn';

export interface HeadingProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  variant?:
    | 'text'
    | 'title'
    | 'muted'
    | 'primary'
    | 'accent'
    | 'success'
    | 'warning'
    | 'error';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  className?: string;
  children: React.ReactNode;
}

const Heading = ({
  level = 2,
  variant = 'title',
  size,
  className = '',
  children,
}: HeadingProps) => {
  const Tag: React.ElementType = `h${level}`;

  const variants: Record<NonNullable<HeadingProps['variant']>, string> = {
    text: 'text-text',
    title: 'text-title',
    muted: 'text-muted',
    primary: 'text-primary',
    accent: 'text-accent',
    success: 'text-success',
    warning: 'text-warning',
    error: 'text-error',
  };

  const sizes = {
    xs: 'text-base font-semibold',
    sm: 'text-lg font-medium',
    md: 'text-xl',
    lg: 'text-2xl lg:text-3xl leading-9 xl:leading-10',
    xl: cn(
      fontDisplay.className,
      'text-3xl lg:text-4xl leading-11 lg:leading-12',
    ),
    xxl: cn(
      fontDisplay.className,
      'text-4xl lg:text-6xl font-light leading-12 lg:leading-20',
    ),
  };

  const headingStyle = cn(variants[variant], size && sizes[size], className);

  return <Tag className={headingStyle}>{children}</Tag>;
};

export default Heading;
