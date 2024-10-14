import NurseHomePage from "./nurse-home-page";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

export default function NurseDashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      <DashboardHeader />
      <main className="pt-16">
        <NurseHomePage />
      </main>
    </div>
  );
}
