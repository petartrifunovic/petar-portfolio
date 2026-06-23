import { cn } from '@/app/utils/cn';

interface TooltipProps {
  text: string;
  children: React.ReactNode;
  className?: string;
}

const Tooltip = ({ text, children, className = '' }: TooltipProps) => {
  return (
    <div className='relative inline-flex items-center group'>
      {children}

      <div
        className={cn(
          'pointer-events-none absolute right-full mr-2 top-1/2 -translate-y-1/2',
          'opacity-0 group-hover:opacity-100 transition-all duration-200',
          className,
        )}
      >
        <div className='relative bg-card text-title text-xs px-2 py-1 rounded-md whitespace-nowrap'>
          {text}
          <div className='absolute top-1/2 right-[-6px] -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[6px] border-l-card'></div>
        </div>
      </div>
    </div>
  );
};

export default Tooltip;
