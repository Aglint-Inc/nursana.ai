// Dependencies: npm install react-phone-number-input lucide-react

'use client';

import { ChevronDown, Phone } from 'lucide-react';
import React from 'react';
import { type ControllerRenderProps } from 'react-hook-form';
import * as RPNInput from 'react-phone-number-input';
import flags from 'react-phone-number-input/flags';

import { Input } from '@/components/ui/input';

export default function UIPhoneInput(props: ControllerRenderProps) {
  return (
    <RPNInput.default
      {...props}
      international
      flagComponent={FlagComponent}
      countrySelectComponent={CountrySelect}
      inputComponent={PhoneInput}
      id='input-46'
      placeholder='Enter phone number'
      onChange={(val: E164Number) => {
        props.onChange(val);
      }}
      className='flex rounded-lg shadow-sm shadow-black/[.04]'
    />
  );
}
type Tagged<A, T> = A & { __tag: T };
export type E164Number = Tagged<string, 'E164Number'>;
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const PhoneInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ ...props }, ref) => {
    return <Input {...props} className='ml-1' ref={ref} />;
  },
);

PhoneInput.displayName = 'PhoneInput';

type CountrySelectProps = {
  disabled?: boolean;
  value: RPNInput.Country;
  onChange: (_value: RPNInput.Country) => void;
  options: { label: string; value: RPNInput.Country }[];
};

const CountrySelect = ({
  disabled,
  value,
  onChange,
  options,
}: CountrySelectProps) => {
  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as RPNInput.Country);
  };

  return (
    <div className='relative inline-flex items-center self-stretch rounded-md border border-input bg-background py-2 pe-2 ps-3 text-muted-foreground ring-offset-background transition-shadow focus-within:z-10 focus-within:border-ring focus-within:text-foreground focus-within:outline-none focus-within:ring-2 focus-within:ring-ring/30 focus-within:ring-offset-2 hover:bg-accent hover:text-foreground has-[:disabled]:pointer-events-none has-[:disabled]:opacity-50'>
      <div className='inline-flex items-center gap-1' aria-hidden='true'>
        <FlagComponent country={value} countryName={value} aria-hidden='true' />
        <span className='text-muted-foreground/80'>
          <ChevronDown size={16} strokeWidth={2} aria-hidden='true' />
        </span>
      </div>
      <select
        disabled={disabled}
        value={value || ''}
        onChange={handleSelect}
        className='absolute inset-0 text-sm opacity-0'
        aria-label='Select country'
      >
        <option key='default' value=''>
          Select a country
        </option>
        {options
          .filter((x) => x.value)
          .map((option) => (
            <option key={option.value || 'empty'} value={option.value}>
              {option.label}{' '}
              {option.value &&
                `+${RPNInput.getCountryCallingCode(option.value)}`}
            </option>
          ))}
      </select>
    </div>
  );
};

const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
  const Flag = flags[country];

  return (
    <span className='w-5 overflow-hidden rounded-sm'>
      {Flag ? (
        <Flag title={countryName} />
      ) : (
        <Phone size={16} aria-hidden='true' role='presentation' />
      )}
    </span>
  );
};
