import { cn } from "@/app/utils/cn";

export interface GridContainerProps {
  children: React.ReactNode;
  className?: string;
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  col?: 'col-1' | 'col-2' | 'col-3' | 'col-4' | 'col-5' | 'col-6' | 'col-8';
}

const GridContainer = ({
  children,
  className = '',
  gap = 'md',
  col = 'col-1',
}: GridContainerProps) => {
  const spaces = {
    xs: 'gap-2',
    sm: 'gap-3',
    md: 'gap-4',
    lg: 'gap-5',
    xl: 'gap-6',
  };

  const columns: Record<NonNullable<GridContainerProps['col']>, string> = {
    'col-1': 'xl:grid-cols-1',
    'col-2': 'xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1',
    'col-3': 'xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1',
    'col-4': 'xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1',
    'col-5': 'xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1',
    'col-6': 'xl:grid-cols-6 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1',
    'col-8': 'xl:grid-cols-8 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1',
  };

  const gridStyle = cn('grid', spaces[gap], columns[col], className);
  return <div className={gridStyle}>{children}</div>;
};

export default GridContainer;
