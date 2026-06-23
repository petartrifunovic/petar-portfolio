import * as HugeIcons from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import type { HugeiconsIconProps } from '@hugeicons/react';
import { cn } from '@/app/utils/cn';

export type IconName = keyof typeof HugeIcons;
type HugeIconValue = HugeiconsIconProps['icon'];

export interface IconProps extends Omit<HugeiconsIconProps, 'ref' | 'icon'> {
  name: IconName;
  className?: string;
}

const icons = HugeIcons as Record<string, HugeIconValue>;

const Icon = ({
  name,
  className,
  size = 24,
  color = 'currentColor',
  strokeWidth = 1.5,
  ...rest
}: IconProps) => {
  const icon = icons[name];

  if (!icon) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(
        `Huge icon "${name}" not found in @hugeicons/core-free-icons. Verify the export name.`,
      );
    }
    return null;
  }

  return (
    <HugeiconsIcon
      icon={icon}
      size={size}
      color={color}
      strokeWidth={strokeWidth}
      className={cn('stroke-current', className)}
      {...rest}
    />
  );
};

export default Icon;
