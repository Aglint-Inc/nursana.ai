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
      {role === "user" ? user : company}
    </>
  );
}

async function checkRole() {
  const supabase = createClient();
  const { data } = await supabase.auth.getSession();

  const userId = data?.session?.user.id;
  if (!userId) {
    return "company";
  }
  const { data: nurse, error } = await supabase
    .from("nurses")
    .select()
    .eq("nurse_id", userId)
    .single();
  if (error || !nurse) {
    return "company";
  }
  return "user";
}
