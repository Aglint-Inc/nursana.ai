import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();
const LOCAL_SUPABASE_URL =
  process.env.LOCAL_SUPABASE_URL || 'http://127.0.0.1:64321';
const LOCAL_SUPABASE_SERVICE_ROLE_KEY =
  process.env.LOCAL_SUPABASE_SERVICE_ROLE_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU';

const DEV_SUPABASE_URL = process.env.DEV_SUPABASE_URL!;
const DEV_SUPABASE_SERVICE_ROLE_KEY =
  process.env.DEV_SUPABASE_SERVICE_ROLE_KEY!;
if (!DEV_SUPABASE_URL || !DEV_SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error(
    'SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables are required.',
  );
}

const PROD_SUPABASE_URL = process.env.PROD_SUPABASE_URL!;
const PROD_SUPABASE_SERVICE_ROLE_KEY =
  process.env.PROD_SUPABASE_SERVICE_ROLE_KEY!;
if (!PROD_SUPABASE_URL || !PROD_SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error(
    'SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables are required.',
  );
}

export function getHostEnv(env: 'local' | 'dev' | 'prod') {
  switch (env) {
    case 'dev':
      return { url: DEV_SUPABASE_URL, key: DEV_SUPABASE_SERVICE_ROLE_KEY };
    case 'prod':
      return { url: PROD_SUPABASE_URL, key: PROD_SUPABASE_SERVICE_ROLE_KEY };
    default:
      return {
        url: LOCAL_SUPABASE_URL,
        key: LOCAL_SUPABASE_SERVICE_ROLE_KEY,
      };
  }
}
// export const supabase = createClient(supabaseUrl, supabaseKey);
export function supabaseClient(env: 'local' | 'dev' | 'prod') {
  const { url, key } = getHostEnv(env);
  return createClient(url, key);
}
