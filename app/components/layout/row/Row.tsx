import { cn } from '@/app/utils/cn';

interface RowProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'fixed' | 'fluid';
}

const Row = ({ children, className = '', variant = 'fixed' }: RowProps) => {
  const variants = {
    fixed: 'max-w-4xl mx-auto xl:px-0 px-4',
    fluid: 'w-full px-4',
  };

  const rowStyle = cn(variants[variant], className);

  return <div className={rowStyle}>{children}</div>;
};

export default Row;
