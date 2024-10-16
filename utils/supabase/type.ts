import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from 'src/supabase-types/database.types';
export type SupdabasClientType = SupabaseClient<Database>;
