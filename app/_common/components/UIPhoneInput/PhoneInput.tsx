'use client';

import 'react-phone-input-2/lib/style.css';

import { AlertCircle } from 'lucide-react';
import React, { forwardRef } from 'react';
import PhoneInput from 'react-phone-input-2';
import { cn } from 'src/utils/cn';

import { Label } from '@/components/ui/label';

interface PhoneInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: string;
  onChange: (_phone: string) => void;
  country?: string;
  className?: string;
  label?: string;
  required?: boolean;
  secondaryText?: string;
  fullWidth?: boolean;
  id?: string;
  helperText?: string;
  error?: boolean;
  labelBold?: 'default' | 'font-semibold' | 'font-normal';
  labelSize?: 'small' | 'medium' | 'large' | 'xLarge' | 'xxLarge' | 'xxxLarge';
  defaultLabelColor?: string;
  disabled?: boolean;
  fieldSize?: 'small' | 'medium' | 'large' | 'xLarge' | 'xxLarge' | 'xxxLarge';
}

const UIPhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  ({
    value,
    onChange,
    country = 'us',
    className,
    fullWidth,
    label,
    id,
    required,
    secondaryText,
    helperText,
    error,
    labelSize = 'small',
    labelBold = 'default',
    defaultLabelColor = null,
    disabled,
    fieldSize,
    ...props
  }) => {
    const labelClasses = cn(
      'text-foreground',
      labelBold === 'default' ? 'font-semibold' : 'font-normal',
      {
        'text-sm': labelSize === 'small',
        'text-base': labelSize === 'medium',
        'text-lg': labelSize === 'large',
        'text-xl': labelSize === 'xLarge',
        'text-2xl': labelSize === 'xxLarge',
        'text-3xl': labelSize === 'xxxLarge',
      },
      disabled && 'text-muted-foreground',
      defaultLabelColor,
    );

    const inputClasses = cn(
      'w-[40px] min-h-[40px] w-full border rounded px-3 transition-colors duration-200', // Smooth transition for color changes
      fullWidth && 'w-full',
      error ? 'border-destructive focus-visible:ring-0' : 'border-gray-200',
      disabled && 'bg-gray-100 text-gray-500 cursor-not-allowed',
      fieldSize === 'small'
        ? 'h-6'
        : fieldSize === 'medium'
          ? 'h-8'
          : fieldSize === 'large'
            ? 'h-10'
            : fieldSize === 'xLarge'
              ? 'h-12'
              : fieldSize === 'xxLarge'
                ? 'h-14'
                : fieldSize === 'xxxLarge'
                  ? 'h-16'
                  : 'h-10',
      className,
    );

    return (
      <div className={cn('flex flex-col gap-1', fullWidth && 'w-full')}>
        {label && (
          <div className='flex flex-row items-center'>
            <Label htmlFor={id} className={labelClasses}>
              {label}
            </Label>
            {required && <span className='ml-1 text-destructive'>*</span>}{' '}
          </div>
        )}
        {secondaryText && (
          <p className='text-sm text-muted-foreground'>{secondaryText}</p>
        )}
        <div>
          <PhoneInput
            country={country}
            value={value}
            onChange={onChange}
            inputClass={inputClasses}
            containerClass='relative'
            buttonClass='absolute left-0 top-0 bottom-0 flex items-center justify-center px-3 border-r border-input h-[40px]'
            dropdownClass='absolute z-50 bg-background border border-input rounded-md shadow-md'
            searchClass='p-2 border-b border-input min-h-[50px]'
            inputStyle={{ width: '100%' }}
            {...props}
          />
          {error && helperText && (
            <div className='mt-1 flex flex-row items-center'>
              <AlertCircle className='mr-1 h-4 w-4 text-destructive' />
              <p className='text-sm text-red-700'>{helperText}</p>
            </div>
          )}
        </div>
      </div>
    );
  },
);

UIPhoneInput.displayName = 'UIPhoneInput';

export { UIPhoneInput };
