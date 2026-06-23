import { cn } from '@/app/utils/cn';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  inset?: 'default' | 'none';
}

const Card = ({ children, className = '', inset = 'default' }: CardProps) => {
  const insets = {
    default: 'p-4',
    none: 'p-0',
  };

  return (
    <div className={cn('rounded-xl bg-card', insets[inset], className)}>
      {children}
    </div>
  );
};

export default Card;
