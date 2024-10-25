import { createClient } from '@supabase/supabase-js';
import { type Database } from 'src/supabase-types/database.types';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

const env = process.env.NEXT_PUBLIC_SITE_URL;
if (!url) {
  throw new Error(`Missing SUPABASE_URL on ${env}`);
}
if (!key) {
  throw new Error(`Missing SUPABASE_SERVICE_ROLE_KEY on ${env}`);
}
export function getSupabaseAdminServer() {
  return createClient<Database>(url, key);
}
