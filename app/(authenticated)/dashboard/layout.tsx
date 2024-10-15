import { jwtDecode } from "jwt-decode";

import { type Database } from "@/lib/database.types";
import { createClient } from "@/utils/supabase/server";

export default async function Layout({
  children,
  company,
  user,
}: {
  children: React.ReactNode;
  company: React.ReactNode;
  user: React.ReactNode;
}) {
  const role = await checkRole();

  return (
    <>
      {children}
      {role === "hospital" ? company : user}
    </>
  );
}

async function checkRole() {
  const supabase = createClient();
  const { data } = await supabase.auth.getSession();
  const jwt = jwtDecode(data?.session?.access_token ?? "") as any;
  return jwt.user_role as Database["public"]["Enums"]["app_role"];
}