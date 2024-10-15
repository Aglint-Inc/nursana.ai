"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";

export default function DashboardHeader() {
  const pathname = usePathname();
  const isHospital = pathname.includes("/dashboard/hospital");

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-10">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/dashboard" className="text-xl font-bold">
          {isHospital ? "Hospital Dashboard" : "Nurse Dashboard"}
        </Link>
        <nav>
          <Button variant="ghost" asChild>
            <Link
              href={
                isHospital
                  ? "/dashboard/hospital/profile"
                  : "/dashboard/nurse/profile"
              }
            >
              Profile
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link
              href={
                isHospital
                  ? "/dashboard/hospital/settings"
                  : "/dashboard/nurse/settings"
              }
            >
              Settings
            </Link>
          </Button>
          <Button variant="outline">Sign Out</Button>
        </nav>
      </div>
    </header>
  );
}
