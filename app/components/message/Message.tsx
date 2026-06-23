import { cn } from '@/app/utils/cn';
import Icon from '../icon/Icon';

interface MessageProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'success' | 'warning' | 'error';
  ariaLive?: 'polite' | 'assertive' | 'off';
}

const Message = ({
  children,
  className = '',
  variant = 'default',
  ariaLive = 'polite',
}: MessageProps) => {
  const variants = {
    default: 'bg-foreground/10 text-title border border-foreground/20',
    success:
      'bg-success/20 text-success-950 dark:text-success-50 border border-success/20',
    warning:
      'bg-warning/20 text-warning-50 dark:text-warning-950 border border-warning/20',
    error:
      'bg-error/20 text-error-50 dark:text-error-950 border border-error/20',
  } as const;

  const defaultIcons = {
    default: 'InformationCircleIcon',
    success: 'CheckmarkCircle02Icon',
    warning: 'Alert02Icon',
    error: 'InformationDiamondIcon',
  } as const;

  const wrapper = cn(
    'p-4 rounded text-sm flex items-center gap-2',
    variants[variant],
    className,
  );

  return (
    <div className={wrapper} role='status' aria-live={ariaLive}>
      <Icon
        name={defaultIcons[variant]}
        className='shrink-0 w-4 h-4'
        aria-hidden='true'
      />
      <span>{children}</span>
    </div>
  );
};

export default Message;
