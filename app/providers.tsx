"use client";

import { type ReactNode } from "react";
import { TRPCReactProvider } from "trpc/client";

import { Toaster } from "@/components/ui/toaster";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <TRPCReactProvider>
      <Toaster />
      {children}
    </TRPCReactProvider>
  );
}
