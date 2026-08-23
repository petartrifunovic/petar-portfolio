'use client';

import { forwardRef, TextareaHTMLAttributes, useMemo, useState, useId } from 'react';
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
    const generatedId = useId();
    const textareaId = id ?? generatedId;
    const errorId = `${textareaId}-error`;

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
      if (isFocused) return 'border-b-primary';
      if (hasValue) return 'border-b-success';
      return 'border-b-border';
    }, [error, hasValue, isFocused]);

    return (
      <div className='flex flex-col gap-1'>
        {label && (
          <label htmlFor={textareaId} className='text-xs text-muted'>
            {label}
          </label>
        )}

        <textarea
          ref={ref}
          id={textareaId}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
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
            'w-full min-h-30 resize-none px-4 py-3 text-text bg-card placeholder:text-muted',
            'border-0 border-b-2 rounded-tl-md rounded-tr-md rounded-bl-none rounded-br-none',
            'focus:outline-none',
            borderClass,
            disabled && 'opacity-40 cursor-not-allowed',
            className,
          )}
          {...props}
        />
        {error && (
          <Paragraph
            id={errorId}
            role='alert'
            className='text-xs font-medium text-error'
          >
            {error}
          </Paragraph>
        )}
      </div>
    );
  },
);

Textarea.displayName = 'Textarea';
export default Textarea;
