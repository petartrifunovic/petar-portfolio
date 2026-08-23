'use client';

import {
  forwardRef,
  InputHTMLAttributes,
  useId,
  useMemo,
  useState,
} from 'react';
import Paragraph from '../typography/paragraph/Paragraph';
import { cn } from '@/app/utils/cn';

interface InputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'size' | 'type'
> {
  label?: string;
  type?: 'text' | 'email';
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      type = 'text',
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
    const inputId = id ?? generatedId;
    const errorId = `${inputId}-error`;

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
          <label htmlFor={inputId} className='text-xs text-muted'>
            {label}
          </label>
        )}

        <input
          ref={ref}
          id={inputId}
          type={type}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
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
            'w-full h-14 px-4 text-text bg-card placeholder:text-muted',
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

Input.displayName = 'Input';
export default Input;
