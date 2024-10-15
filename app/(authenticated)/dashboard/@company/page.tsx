"use client";

import DashboardHeader from "@/components/dashboard/DashboardHeader";

import HospitalHomePage from "./hospital-home-page";

export default function Page() {
  return (
    <div className="min-h-screen">
      <DashboardHeader />
      <main className="pt-16">
        <HospitalHomePage />
      </main>
    </div>
  );
}
