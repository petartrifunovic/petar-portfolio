'use client';

import { forwardRef, TextareaHTMLAttributes, useMemo, useState } from 'react';
import { cn } from '@/app/utils/cn';
import Paragraph from '../typography/paragraph/Paragraph';

interface TextareaProps extends Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  'size'
> {
  label?: string;
  error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      className,
      required,
      value,
      defaultValue,
      onFocus,
      onBlur,
      onChange,
      id,
      disabled,
      ...props
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [internalValue, setInternalValue] = useState(
      defaultValue?.toString() ?? '',
    );

    const currentValue = useMemo(() => {
      if (value !== undefined && value !== null) {
        return value.toString();
      }
      return internalValue;
    }, [value, internalValue]);

    const hasValue = currentValue.trim().length > 0;

    const borderClass = useMemo(() => {
      if (error) return 'border-b-error';
      if (hasValue) return 'border-b-success';
      if (isFocused) return 'border-b-primary';
      return 'border-b-border';
    }, [error, hasValue, isFocused]);

    return (
      <div className='flex flex-col gap-1'>
        {label && (
          <label htmlFor={id} className='text-xs text-muted'>
            {label}
          </label>
        )}

        <textarea
          ref={ref}
          id={id}
          required={required}
          value={currentValue}
          onFocus={(e) => {
            setIsFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur?.(e);
          }}
          onChange={(e) => {
            if (value === undefined) {
              setInternalValue(e.target.value);
            }
            onChange?.(e);
          }}
          disabled={disabled}
          className={cn(
            'w-full min-h-30 resize-none px-4 py-3 text-content-text bg-card placeholder:text-muted',
            'border-0 border-b-2 rounded-tl-md rounded-tr-md rounded-bl-none rounded-br-none',
            'focus:outline-none',
            borderClass,
            disabled && 'opacity-40 cursor-not-allowed',
            className,
          )}
          {...props}
        />

        {error && (
          <Paragraph className='text-xs font-medium text-error'>
            {error}
          </Paragraph>
        )}
      </div>
    );
  },
);

Textarea.displayName = 'Textarea';
export default Textarea;
