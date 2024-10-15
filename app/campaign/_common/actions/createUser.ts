"use server";

import { getSupabaseAdminServer } from "@/utils/supabase/supabaseAdmin";

export async function createUser({ email }: { email: string }) {
  const supabase = getSupabaseAdminServer();

  const res = await supabase.auth.admin.createUser({
    email: email,
    password: "Welcome@123",
  });

  return res;
}
