import NurseHomePage from "@/app/dashboard/nurse/nurse-home-page";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import HospitalHomePage from "@/app/dashboard/hospital/hospital-home-page";

export default async function ProtectedPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Check if the user is a nurse by querying the nurse table
  const { data: nurseData } = await supabase
    .from("nurse")
    .select("id")
    .eq("id", user.id)
    .single();

  const isNurse = !!nurseData;

  return <>{!isNurse ? <HospitalHomePage /> : <NurseHomePage />}</>;
}
