import HospitalHomePage from "./hospital-home-page";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

export default function HospitalDashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      <DashboardHeader />
      <main className="pt-16">
        <HospitalHomePage />
      </main>
    </div>
  );
}
