import { cn } from '@/app/utils/cn';
import Icon from '../icon/Icon';

export interface ListItemProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'icon' | 'default';
  listIcon?: React.ComponentProps<typeof Icon>['name'];
  listIconSrc?: string;
  id?: number;
  item?: string;
  iconClassName?: string;
  iconSize?: number;
  iconStrokeWidth?: number;
  hideIcon?: boolean;
}

const ListItem = ({
  children,
  className = '',
  listIcon,
  listIconSrc,
  iconClassName,
  iconSize = 16,
  iconStrokeWidth = 1.5,
  hideIcon = false,
}: ListItemProps) => {
  const listItemStyle = cn(
    'flex items-center gap-2',
    !hideIcon &&
      !listIcon &&
      !listIconSrc &&
      'before:content-["•"] before:mr-2 before:text-primary before:inline-block',
    className,
  );

  const listIconStyle = cn(iconClassName ?? 'text-primary');

  return (
    <li className={listItemStyle}>
      {!hideIcon && listIconSrc && (
        <span
          aria-hidden='true'
          className={cn('block shrink-0 bg-primary', iconClassName)}
          style={{
            width: iconSize,
            height: iconSize,
            maskImage: `url(${listIconSrc})`,
            WebkitMaskImage: `url(${listIconSrc})`,
            maskRepeat: 'no-repeat',
            WebkitMaskRepeat: 'no-repeat',
            maskPosition: 'center',
            WebkitMaskPosition: 'center',
            maskSize: 'contain',
            WebkitMaskSize: 'contain',
          }}
        />
      )}

      {!hideIcon && !listIconSrc && listIcon && (
        <Icon
          name={listIcon}
          size={iconSize}
          strokeWidth={iconStrokeWidth}
          className={listIconStyle}
          aria-hidden='true'
        />
      )}
      {children}
    </li>
  );
};

export default ListItem;
