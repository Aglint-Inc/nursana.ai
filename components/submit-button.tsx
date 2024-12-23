"use client";

import { type ComponentProps, useState } from "react";

import { Button } from "@/components/ui/button";

type Props = ComponentProps<typeof Button> & {
  pendingText?: string;
};

export function SubmitButton({
  children,
  pendingText = "Submitting...",
  ...props
}: Props) {
  const [isPending, setIsPending] = useState(false);

  const handleClick = () => {
    setIsPending(true);
  };

  return (
    <Button
      type="submit"
      aria-disabled={isPending}
      onClick={handleClick}
      {...props}
    >
      {isPending ? pendingText : children}
    </Button>
  );
}
