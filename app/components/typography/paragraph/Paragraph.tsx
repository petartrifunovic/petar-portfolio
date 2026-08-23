import { cn } from '@/app/utils/cn';

interface ParagraphProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
  className?: string;
}

const Paragraph = ({ children, className = '', ...props }: ParagraphProps) => {
  return (
    <p className={cn('leading-relaxed text-text', className)} {...props}>
      {children}
    </p>
  );
};

export default Paragraph;
