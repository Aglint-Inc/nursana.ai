"use client";

import * as SwitchPrimitives from "@radix-ui/react-switch";
import * as React from "react";
import { cn } from "src/utils/cn";

type UISwitchProps = React.ComponentPropsWithoutRef<
  typeof SwitchPrimitives.Root
> & {
  size?: "sm" | "md";
};

const sizeClasses = {
  sm: {
    root: "h-4.5 w-8",
    thumb: "h-3.5 w-3.5",
    translate: "translate-x-[16px]",
  },
  md: {
    root: "h-6 w-11",
    thumb: "h-5 w-5",
    translate: "translate-x-[20px]",
  },
};

const UISwitch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  UISwitchProps
>(({ size = "md", className, ...props }, ref) => {
  const { root: rootSize, thumb: thumbSize, translate } = sizeClasses[size];

  return (
    <SwitchPrimitives.Root
      ref={ref}
      className={cn(
        "peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
        rootSize,
        className
      )}
      {...props}
    >
      <SwitchPrimitives.Thumb
        className={cn(
          `pointer-events-none block rounded-full bg-background shadow-lg ring-0 transition-transform ${translate}`,
          thumbSize,
          "data-[state=checked]:translate-x-full data-[state=unchecked]:translate-x-0"
        )}
      />
    </SwitchPrimitives.Root>
  );
});

UISwitch.displayName = "UISwitch";

export { UISwitch };