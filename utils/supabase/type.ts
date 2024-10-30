import type { SupabaseClient } from '@supabase/supabase-js';

import type { DB } from '@/db/types';

export type SupdabasClientType = SupabaseClient<DB>;
