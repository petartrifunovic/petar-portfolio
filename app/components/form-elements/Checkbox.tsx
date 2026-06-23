'use client';

import React, {
  forwardRef,
  InputHTMLAttributes,
  useMemo,
  useState,
} from 'react';
import Icon from '../icon/Icon';
import { cn } from '@/app/utils/cn';
import Paragraph from '../typography/paragraph/Paragraph';

type NativeOnChange = NonNullable<
  InputHTMLAttributes<HTMLInputElement>['onChange']
>;

interface CheckboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'checked' | 'defaultChecked' | 'onChange'
> {
  label?: string;
  children?: React.ReactNode;
  error?: string;
  helperText?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  onChange?: NativeOnChange;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      children,
      error,
      helperText,
      className,
      checked,
      defaultChecked,
      onCheckedChange,
      onChange,
      ...props
    },
    ref,
  ) => {
    const startingDefault = useMemo(
      () => defaultChecked ?? false,
      [defaultChecked],
    );

    const isControlled = typeof checked === 'boolean';
    const [internalChecked, setInternalChecked] =
      useState<boolean>(startingDefault);

    const value = isControlled ? checked : internalChecked;

    const handleChange: NativeOnChange = (e) => {
      const next = e.target.checked;

      if (!isControlled) {
        setInternalChecked(next);
      }

      onCheckedChange?.(next);
      onChange?.(e);
    };

    return (
      <div className={cn('flex flex-col gap-1', className)}>
        <label className='inline-flex items-start gap-2 cursor-pointer text-sm text-content-text'>
          <div className='relative h-6 w-6 shrink-0'>
            <input
              ref={ref}
              type='checkbox'
              checked={value}
              onChange={handleChange}
              className={cn(
                'appearance-none h-full w-full rounded border border-border bg-card transition-all cursor-pointer focus:outline-none focus:border-success',
                error && 'border-error focus:border-error',
              )}
              {...props}
            />

            {value && (
              <div className='absolute inset-0 z-10 flex items-center justify-center rounded bg-success pointer-events-none'>
                <Icon name='Tick02Icon' className='h-5 w-5 text-success-50' />
              </div>
            )}
          </div>

          {children ? (
            <span className='text-base'>{children}</span>
          ) : (
            label && <span>{label}</span>
          )}
        </label>

        {error && <Paragraph className='text-error'>{error}</Paragraph>}
        {!error && helperText && <Paragraph>{helperText}</Paragraph>}
      </div>
    );
  },
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
