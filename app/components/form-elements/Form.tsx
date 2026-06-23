'use client';

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
}

const Form = ({ children, ...props }: FormProps) => {
  return (
    <form {...props} className='space-y-4 w-full'>
      {children}
    </form>
  );
};

export default Form;
