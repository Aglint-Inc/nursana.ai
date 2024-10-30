import { createBrowserClient } from '@supabase/ssr';

import type { DB } from '@/db/types';

export const createClient = () =>
  createBrowserClient<DB>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

export const supabase = createBrowserClient<DB>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);
