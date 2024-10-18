import { Database } from '@/supabase-types/database.types';

export type InterviewData = Database['public']['Tables']['interview']['Row'];
