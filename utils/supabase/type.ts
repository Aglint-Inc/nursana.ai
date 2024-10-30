import type { SupabaseClient } from '@supabase/supabase-js';

import type { DB } from '@/server/db/types';

export type SupdabasClientType = SupabaseClient<DB>;
