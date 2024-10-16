import { AlertCircle } from "lucide-react";
import * as React from "react";
import { cn } from "src/utils/cn";

import { Label } from "@/components/ui/label";
import { Textarea, type TextareaProps } from "@/components/ui/textarea";

interface UITextFieldProps extends TextareaProps {
  error?: boolean;
  label?: string;
  fieldSize?: "small" | "medium" | "large" | "xLarge" | "xxLarge" | "xxxLarge";
  labelSize?: "small" | "medium" | "large" | "xLarge" | "xxLarge" | "xxxLarge";
  helperText?: string;
  secondaryText?: string;
  labelBold?: "default" | "normal";
  defaultLabelColor?: string;
  fullWidth?: boolean;
}

const UITextArea = React.forwardRef<HTMLTextAreaElement, UITextFieldProps>(
  (
    {
      className,
      id,
      fullWidth,
      label,
      labelSize = "small",
      labelBold = "default",
      defaultLabelColor = null,
      disabled,
      required,
      error,
      helperText,
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
      "w-full border rounded px-3 py-2",
      fullWidth && "w-full",
      error ? "border-destructive focus-visible:ring-0" : "border-neutral-300",
      disabled && "bg-neutral-100 text-muted-foreground",
      className
    );

    return (
      <div className={cn("flex flex-col gap-1", fullWidth && "w-full")}>
        {label && (
          <div className="flex flex-row items-center">
            <Label htmlFor={id} className={labelClasses}>
              {label}
            </Label>
            {required && <span className="ml-1 text-destructive">*</span>}
          </div>
        )}
        <div>
          <Textarea
            {...props}
            ref={ref}
            disabled={disabled}
            className={inputClasses}
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

UITextArea.displayName = "Textarea";

export { UITextArea };
