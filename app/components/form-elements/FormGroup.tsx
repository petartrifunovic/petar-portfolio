import { cn } from '@/app/utils/cn';

export interface FormGroupProps {
  children: React.ReactNode;
  className?: string;
  col?: 'col-1' | 'col-2' | 'col-3';
}

const FormGroup = ({
  children,
  className = '',
  col = 'col-1',
}: FormGroupProps) => {
  const columns = {
    'col-1': 'grid-cols-1',
    'col-2': 'grid-cols-1 md:grid-cols-2',
    'col-3': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  };

  return (
    <div className={cn('grid gap-4 mb-4', columns[col], className)}>
      {children}
    </div>
  );
};

export default FormGroup;
