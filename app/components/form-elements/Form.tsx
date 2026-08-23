'use client';

import { cn } from '@/app/utils/cn';

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
}

const Form = ({ children, className, ...props }: FormProps) => {
  return (
    <form {...props} className={cn('space-y-4 w-full', className)}>
      {children}
    </form>
  );
};

export default Form;
