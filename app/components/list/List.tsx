import { cn } from '@/app/utils/cn';
import Heading from '../typography/heading/Heading';

export interface ListProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  titleClassName?: string;
}

const List = ({
  className = '',
  titleClassName = '',
  children,
  title,
}: ListProps) => {
  const listStyle = cn('list-inside flex flex-col gap-2', className);

  return (
    <ul className={listStyle}>
      {title && (
        <Heading level={5} className={titleClassName}>
          {title}
        </Heading>
      )}
      {children}
    </ul>
  );
};

export default List;
