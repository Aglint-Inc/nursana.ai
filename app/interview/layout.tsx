import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";

export default async function InterviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Add any common layout elements here */}
      {children}
    </div>
  );
}
