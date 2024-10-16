"use client";

import "react-phone-input-2/lib/style.css";

import React, { forwardRef } from "react";
import PhoneInput from "react-phone-input-2";
import { cn } from "src/utils/cn";

interface PhoneInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (phone: string) => void;
  country?: string;
  className?: string;
}

const ShadcnPhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ value, onChange, country = "us", className, ...props }) => {
    return (
      <PhoneInput
        country={country}
        value={value}
        onChange={onChange}
        inputClass={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        containerClass="relative"
        buttonClass="absolute left-0 top-0 bottom-0 flex items-center justify-center px-3 border-r border-input"
        dropdownClass="absolute z-50 bg-background border border-input rounded-md shadow-md"
        searchClass="p-2 border-b border-input"
        {...props}
      />
    );
  }
);

ShadcnPhoneInput.displayName = "ShadcnPhoneInput";

export { ShadcnPhoneInput };
