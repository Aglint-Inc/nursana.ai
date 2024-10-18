/* eslint-disable no-unused-vars */
import type { SelectProps } from "@radix-ui/react-select";
import { AlertCircle } from "lucide-react";
import React from "react";
import { cn } from "src/utils/cn";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type MenuOption = {
  name: string;
  value: any;
};

type Props = SelectProps & {
  label?: string;
  menuOptions?: MenuOption[];
  disabled?: boolean;
  required?: boolean;
  startIcon?: React.ReactNode;
  error?: boolean;
  helperText?: string;
  placeholder?: string;
  labelSize?: "small" | "medium" | "large" | "xLarge" | "xxLarge" | "xxxLarge";
  labelBold?: "default" | "normal";
  fieldSize?: "small" | "medium" | "large" | "xLarge" | "xxLarge" | "xxxLarge";
  defaultLabelColor?: string;
  id?: string;
  fullWidth?: boolean;
  className?: string;
  children?: React.ReactNode;
};

const UISelectDropDown = ({
  menuOptions = [],
  disabled,
  required,
  startIcon,
  error,
  helperText,
  placeholder = "Choose from the list",
  fullWidth,
  label,
  labelSize = "small",
  labelBold = "default",
  defaultLabelColor = "",
  id,
  className,
  fieldSize,
  children,
  ...props
}: Props) => {
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
    "w-full border rounded px-3 py-2 transition-colors duration-200", // Smooth transition for color changes
    fullWidth && "w-full",
    error ? "border-destructive focus:ring-0" : "border-neutral-200",
    disabled && "bg-neutral-100 text-muted-foreground cursor-not-allowed",
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
    <div
      className={cn("flex flex-col gap-1", fullWidth && "w-full", className)}
    >
      {label && (
        <div className="flex flex-row items-center">
          <Label htmlFor={id} className={labelClasses}>
            {label}
          </Label>
          {required && <span className="ml-1 text-destructive">*</span>}
        </div>
      )}

      <Select {...props} disabled={disabled} required={required}>
        <SelectTrigger className={inputClasses}>
          {startIcon && <span className="mr-2">{startIcon}</span>}
          <SelectValue placeholder={placeholder} id={id} className="text-sm" />
        </SelectTrigger>
        <SelectContent className="z-[2000]">
          <SelectGroup>
            {children ? (
              children
            ) : menuOptions.length === 0 ? (
              <div className="cursor-default px-2 py-1 italic text-muted-foreground">
                No options available
              </div>
            ) : (
              menuOptions.map((menu, idx) => (
                <SelectItem key={idx} value={menu.value}>
                  {menu.name}
                </SelectItem>
              ))
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
      {error && helperText && (
        <div className="mt-1 flex flex-row items-center">
          <AlertCircle className="mr-1 h-4 w-4 text-destructive" />
          <p className="text-sm text-red-700">{helperText}</p>
        </div>
      )}
    </div>
  );
};

export default UISelectDropDown;
