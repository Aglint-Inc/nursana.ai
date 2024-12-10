'use client';

import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';
import { type ReactNode, useEffect } from 'react';
import { TRPCReactProvider } from 'trpc/client';

import { Toaster } from '@/components/ui/toaster';

export default function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      person_profiles: 'always',
      capture_pageview: false,
      capture_pageleave: false,
      autocapture: false,
    });
  }, []);

  return (
    <PostHogProvider client={posthog}>
      <TRPCReactProvider>
        <Toaster />
        {children}
      </TRPCReactProvider>
    </PostHogProvider>
  );
}
