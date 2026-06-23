import Link from 'next/link';
import { cn } from '@/app/utils/cn';
import Icon from '../icon/Icon';

type IconName = React.ComponentProps<typeof Icon>['name'];

export interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  size?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  variant?: 'primary' | 'accent' | 'success' | 'warning' | 'error' | 'ghost';
  className?: string;
  iconLeft?: IconName;
  iconRight?: IconName;
  iconLeftClassName?: string;
  iconRightClassName?: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  disabled?: boolean;
  loading?: boolean;
  loadingIconName?: IconName;
  iconStrokeWidth?: number;
  type?: 'button' | 'submit' | 'reset';
  rel?: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
}

const Button = ({
  children,
  href,
  size = 'md',
  variant = 'primary',
  className = '',
  iconLeft,
  iconRight,
  iconLeftClassName,
  iconRightClassName,
  iconStrokeWidth,
  loading = false,
  loadingIconName = 'Loading03Icon',
  onClick,
  onMouseEnter,
  onMouseLeave,
  disabled = false,
  type = 'button',
  rel,
  target,
  ...props
}: ButtonProps) => {
  const isDisabled = disabled || loading;
  const isGhost = variant === 'ghost';
  const isHashLink = !!href && href.startsWith('#');

  const variants = {
    primary:
      'bg-gradient-to-br from-primary-300 to-primary-700 hover:from-primary-700 hover:to-primary-300 text-primary-50',
    accent:
      'bg-accent-950 dark:bg-accent-950 hover:bg-accent-800 dark:hover:bg-accent-800 text-accent-50',
    success: 'bg-success hover:bg-success-600 text-success-50',
    warning: 'bg-warning hover:bg-warning-600 text-warning-50',
    error: 'bg-error hover:bg-error-600 text-error-50',
    ghost:
      'bg-transparent text-content-title hover:text-primary-400 hover:bg-transparent',
  };

  const sizes = {
    none: 'p-0',
    sm: 'px-6 py-2 text-sm',
    md: 'px-10 py-3 text-base',
    lg: 'px-12 py-4 text-lg',
    full: 'w-full',
  };

  const buttonStyle = cn(
    variants[variant],
    !isGhost && sizes[size],
    isGhost && 'p-0',
    'inline-flex cursor-pointer items-center justify-center gap-2 box-border transition duration-200 ease',
    !isGhost && 'rounded-full',
    isDisabled && 'pointer-events-none cursor-not-allowed opacity-50',
    className,
  );

  const LeftIconName: IconName | undefined = loading
    ? loadingIconName
    : iconLeft;
  const RightIconName: IconName | undefined = !loading ? iconRight : undefined;

  const LeftIcon = LeftIconName ? (
    <Icon
      name={LeftIconName}
      className={cn('mr-0.5', loading && 'animate-spin', iconLeftClassName)}
      strokeWidth={iconStrokeWidth}
      aria-hidden='true'
    />
  ) : null;

  const RightIcon = RightIconName ? (
    <Icon
      name={RightIconName}
      className={cn('ml-0.5', iconRightClassName)}
      strokeWidth={iconStrokeWidth}
      aria-hidden='true'
    />
  ) : null;

  const content = (
    <>
      {LeftIcon}
      {children}
      {RightIcon}
    </>
  );

  if (href && isHashLink) {
    return (
      <a
        href={isDisabled ? '#' : href}
        className={buttonStyle}
        tabIndex={isDisabled ? -1 : 0}
        aria-disabled={isDisabled ? 'true' : undefined}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={isDisabled ? (e) => e.preventDefault() : onClick}
        rel={rel}
        target={target}
        {...props}
      >
        {content}
      </a>
    );
  }

  if (href) {
    return (
      <Link
        href={isDisabled ? '#' : href}
        className={buttonStyle}
        tabIndex={isDisabled ? -1 : 0}
        aria-disabled={isDisabled ? 'true' : undefined}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={isDisabled ? (e) => e.preventDefault() : onClick}
        rel={rel}
        target={target}
        {...props}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      className={buttonStyle}
      disabled={isDisabled}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      type={type}
      {...props}
    >
      {content}
    </button>
  );
};

export default Button;
