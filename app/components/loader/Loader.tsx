import { cn } from '@/app/utils/cn';
import Icon from '../icon/Icon';
import Paragraph from '../typography/paragraph/Paragraph';

export interface LoaderProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  containerClassName?: string;
  icon?: React.ComponentProps<typeof Icon>['name'];
  text?: string;
  spinnerTextStyle?: string;
}

const Loader = ({
  size = 'sm',
  className = '',
  containerClassName = '',
  icon = 'Loading03Icon',
  text,
  spinnerTextStyle,
}: LoaderProps) => {
  const sizes = {
    xs: 'h-4 w-4',
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
    xl: 'h-20 w-20',
  };

  const spinnerContainer = cn(
    'flex items-center justify-center gap-2',
    containerClassName,
  );
  const spinnerStyle = cn('animate-spin text-primary', sizes[size], className);

  return (
    <div className={spinnerContainer} role='status' aria-live='polite'>
      <Icon name={icon} className={spinnerStyle} />
      {text && <Paragraph className={spinnerTextStyle}>{text}</Paragraph>}
    </div>
  );
};

export default Loader;
