import DashboardHeader from "@/components/dashboard/DashboardHeader";

import NurseHomePage from "./nurse-home-page";

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
