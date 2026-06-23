import { cn } from '@/app/utils/cn';

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

const Badge = ({ children, className = '' }: BadgeProps) => {
  return (
    <span
      className={cn(
        'inline-flex w-max items-center gap-2 rounded-full border px-4 py-1 text-sm bg-card',
        'border-border text-content-text',
        "before:block before:h-2 before:w-2 before:shrink-0 before:rounded-full before:bg-primary before:content-['']",
        className,
      )}
    >
      {children}
    </span>
  );
};

export default Badge;
