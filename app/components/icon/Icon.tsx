import {
  Alert02Icon,
  Cancel01Icon,
  CheckmarkCircle02Icon,
  InformationCircleIcon,
  InformationDiamondIcon,
  Loading03Icon,
  PlusSignIcon,
  Tick02Icon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import type { HugeiconsIconProps } from '@hugeicons/react';
import { cn } from '@/app/utils/cn';

const icons = {
  Alert02Icon,
  Cancel01Icon,
  CheckmarkCircle02Icon,
  InformationCircleIcon,
  InformationDiamondIcon,
  Loading03Icon,
  PlusSignIcon,
  Tick02Icon,
} as const;

export type IconName = keyof typeof icons;

export interface IconProps extends Omit<HugeiconsIconProps, 'ref' | 'icon'> {
  name: IconName;
  className?: string;
}

const Icon = ({
  name,
  className,
  size = 24,
  color = 'currentColor',
  strokeWidth = 1.5,
  ...rest
}: IconProps) => {
  return (
    <HugeiconsIcon
      icon={icons[name]}
      size={size}
      color={color}
      strokeWidth={strokeWidth}
      className={cn('shrink-0', className)}
      {...rest}
    />
  );
};

export default Icon;
