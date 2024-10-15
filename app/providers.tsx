"use client";

import { type ReactNode } from "react";
import { TRPCReactProvider } from "trpc/client";

export default function Providers({ children }: { children: ReactNode }) {
  return <TRPCReactProvider>{children}</TRPCReactProvider>;
}
