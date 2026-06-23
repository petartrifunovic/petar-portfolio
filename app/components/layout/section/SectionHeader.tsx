import { cn } from "@/app/utils/cn";
import Heading from "../../typography/heading/Heading";


interface SectionHeaderProps {
  className?: string;
  children?: React.ReactNode;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  variants?: 'between' | 'betweenCol';
  titleClassName?: string;
  subtitleClassName?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  className,
  children,
  title,
  subtitle,
  variants = 'between',
  titleClassName,
  subtitleClassName,
}) => {
  const variantStyles = {
    between: cn('flex justify-between items-center mb-4', className),
    betweenCol: cn(
      'flex flex-col md:flex-row gap-1 justify-between mb-4',
      className
    ),
  };

  return (
    <div className={variantStyles[variants]}>
      <div>
        {title && (
          <Heading level={4} size='sm' className={titleClassName}>
            {title}
          </Heading>
        )}
        {subtitle && (
          <Heading
            level={5}
            className={cn('text-base font-medium mt-2', subtitleClassName)}
          >
            {subtitle}
          </Heading>
        )}
      </div>
      {children}
    </div>
  );
};

export default SectionHeader;
