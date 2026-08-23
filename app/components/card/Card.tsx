import { cn } from '@/app/utils/cn';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  inset?: 'default' | 'none';
  variant?: 'default' | 'accent' | 'primary';
  elevate?: boolean;
  style?: React.CSSProperties;
}

const Card = ({
  children,
  className = '',
  inset = 'default',
  variant = 'default',
  elevate = true,
  style,
}: CardProps) => {
  const insets = {
    default: 'p-4',
    none: 'p-0',
  };

  const variants = {
    default: 'bg-card',
    accent: 'bg-accent-500',
    primary: 'bg-primary-500',
  };

  return (
    <div
      style={style}
      className={cn(
        'rounded-xl transition duration-200 ease-in-out',
        elevate && 'elevate',
        variants[variant],
        insets[inset],
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Card;
