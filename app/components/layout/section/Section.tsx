import { cn } from '@/app/utils/cn';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  variant?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'foreground'
    | 'success'
    | 'warning'
    | 'error'
    | 'primaryGradient'
    | 'secondaryGradient'
    | 'accentGradient';
  inset?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const Section = ({
  children,
  className = '',
  variant = 'default',
  inset = 'md',
  ...props
}: SectionProps) => {
  const variants = {
    default: 'bg-none',
    primary: 'bg-primary/10',
    secondary: 'bg-secondary/10',
    accent: 'bg-accent/10',
    foreground: 'bg-foreground/10',
    success: 'bg-success',
    warning: 'bg-warning',
    error: 'bg-error',
    primaryGradient: 'bg-gradient-to-br from-primary/20 to-primary/0',
    secondaryGradient: 'bg-gradient-to-br from-secondary/20 to-secondary/0',
    accentGradient: 'bg-gradient-to-br from-accent/30 to-accent/0',
  };

  const insets = {
    none: 'py-0',
    xs: 'py-8',
    sm: 'py-16',
    md: 'py-12 sm:py-24',
    lg: 'py-32',
    xl: 'py-40',
  };

  const sectionStyle = cn(
    variants[variant],
    insets[inset],
    'gap-4 mx-auto w-full',
    className,
  );

  return (
    <section className={sectionStyle} {...props}>
      {children}
    </section>
  );
};

export default Section;
