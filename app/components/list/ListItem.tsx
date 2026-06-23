import { cn } from '@/app/utils/cn';
import Icon from '../icon/Icon';

export interface ListItemProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'icon' | 'default';
  listIcon?: React.ComponentProps<typeof Icon>['name'];
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
  iconClassName,
  iconSize = 16,
  iconStrokeWidth = 1.5,
  hideIcon = false,
}: ListItemProps) => {
  const listItemStyle = cn(
    'flex items-center gap-2',
    !hideIcon &&
      !listIcon &&
      'before:content-["•"] before:mr-2 before:text-primary before:inline-block',
    className,
  );

  const listIconStyle = cn(iconClassName ?? 'text-primary');

  return (
    <li className={listItemStyle}>
      {!hideIcon && listIcon && (
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
