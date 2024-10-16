import { AlertCircle } from "lucide-react";
import React, { forwardRef } from "react";
import { cn } from "src/utils/cn";

import { Input, type InputProps } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = InputProps & {
  error?: boolean;
  label?: string;
  fieldSize?: "small" | "medium" | "large" | "xLarge" | "xxLarge" | "xxxLarge";
  labelSize?: "small" | "medium" | "large" | "xLarge" | "xxLarge" | "xxxLarge";
  helperText?: string;
  secondaryText?: string;
  labelBold?: "default" | "normal";
  defaultLabelColor?: string;
  fullWidth?: boolean;
  ref: React.ForwardedRef<HTMLInputElement>;
  className?: string;
};

const UITextField = forwardRef<HTMLInputElement, Props>(
  (
    {
      disabled,
      error,
      helperText,
      type = "text",
      secondaryText,
      label,
      labelSize = "small",
      labelBold = "default",
      defaultLabelColor = null,
      required,
      fullWidth,
      id,
      fieldSize,
      className,
      ...props
    },
    ref
  ) => {
    const labelClasses = cn(
      "text-foreground",
      labelBold === "default" ? "font-semibold" : "font-normal",
      {
        "text-sm": labelSize === "small",
        "text-base": labelSize === "medium",
        "text-lg": labelSize === "large",
        "text-xl": labelSize === "xLarge",
        "text-2xl": labelSize === "xxLarge",
        "text-3xl": labelSize === "xxxLarge",
      },
      disabled && "text-muted-foreground",
      defaultLabelColor
    );

    const inputClasses = cn(
      "w-full border rounded px-3 transition-colors duration-200", // Smooth transition for color changes
      fullWidth && "w-full",
      error ? "border-destructive focus-visible:ring-0" : "border-gray-200",
      disabled && "bg-gray-100 text-gray-500 cursor-not-allowed",
      fieldSize === "small"
        ? "h-6"
        : fieldSize === "medium"
          ? "h-8"
          : fieldSize === "large"
            ? "h-10"
            : fieldSize === "xLarge"
              ? "h-12"
              : fieldSize === "xxLarge"
                ? "h-14"
                : fieldSize === "xxxLarge"
                  ? "h-16"
                  : "h-10",
      className
    );

    return (
      <div className={cn("flex flex-col gap-1", fullWidth && "w-full")}>
        {label && (
          <div className="flex flex-row items-center">
            <Label htmlFor={id} className={labelClasses}>
              {label}
            </Label>
            {required && <span className="ml-1 text-destructive">*</span>}{" "}
            {/* Corrected color class */}
          </div>
        )}
        {secondaryText && (
          <p className="text-sm text-muted-foreground">{secondaryText}</p>
        )}
        <div>
          <Input
            {...props}
            ref={ref}
            className={inputClasses}
            disabled={disabled}
            required={required}
            type={type}
          />
          {error && helperText && (
            <div className="mt-1 flex flex-row items-center">
              <AlertCircle className="mr-1 h-4 w-4 text-destructive" />
              <p className="text-sm text-red-700">{helperText}</p>
            </div>
          )}
        </div>
      </div>
    );
  }
);

UITextField.displayName = "UITextField";

export default UITextField;
