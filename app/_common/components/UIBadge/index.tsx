"use client";
import { cva } from "class-variance-authority";
import * as Icons from "lucide-react";
import React from "react";
import { cn } from "src/utils/cn";

import { Badge } from "@/components/ui/badge";

const badgeVariants = cva(
  "inline-flex items-center rounded-sm border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        accent:
          "border-transparent bg-amber-100 text-amber-600 hover:bg-amber-200",
        info: "border-transparent bg-sky-100 text-sky-600 hover:bg-sky-200",
        success:
          "border-transparent bg-green-100 text-green-600 hover:bg-green-200",
        warning:
          "border-transparent bg-yellow-100 text-yellow-600 hover:bg-yellow-200",
        error:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        purple:
          "border-transparent bg-purple-100 text-purple-600 hover:bg-purple-200",
        neutral:
          "border-transparentbg-muted text-muted-foreground hover:bg-neutral-200",
      },
      size: {
        default: "h-6",
        sm: "h-5 text-[10px]",
        lg: "h-7",
      },
    },
    defaultVariants: {
      variant: "neutral",
      size: "default",
    },
  }
);

interface UIBadgeProps {
  iconName?: keyof typeof Icons | null;
  iconSize?: number;
  textBadge?: string | number;
  size?: "default" | "sm" | "lg";
  color?:
    | "default"
    | "secondary"
    | "accent"
    | "info"
    | "success"
    | "warning"
    | "error"
    | "purple"
    | "neutral";

  className?: string;
  icon?: React.ReactNode;
}

export function UIBadge({
  className,
  color,
  size,
  textBadge,
  iconName,
  iconSize = 16,
  icon,
}: UIBadgeProps) {
  const IconComponent = (
    iconName ? Icons[iconName] : <></>
  ) as React.ElementType;

  return (
    <Badge
      className={cn(
        badgeVariants({ variant: color, size }),
        size === "sm" ? "p-1" : "",
        className
      )}
    >
      {icon ? (
        <div className="mr-1">{icon}</div>
      ) : (
        <>
          {iconName && (
            <IconComponent
              size={iconSize}
              className={textBadge ? "mr-1" : ""}
            />
          )}
        </>
      )}

      {textBadge !== undefined || textBadge !== null ? (
        <div>{(textBadge ?? "").toString()}</div>
      ) : null}
    </Badge>
  );
}
