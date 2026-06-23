import { cn } from '@/app/utils/cn';

interface ParagraphProps {
  children: React.ReactNode;
  className?: string;
}

const Paragraph = ({ children, className = '' }: ParagraphProps) => {
  return (
    <p className={cn('leading-relaxed text-text', className)}>{children}</p>
  );
};

export default Paragraph;
