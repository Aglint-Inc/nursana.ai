import NurseHomePage from "@/components/nurse-home-page";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import HospitalHomePage from "@/components/hospital-home-page";

export default async function ProtectedPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <>
      {user && user.role === "nurse" ? <NurseHomePage /> : <HospitalHomePage />}
    </>
  );
}
