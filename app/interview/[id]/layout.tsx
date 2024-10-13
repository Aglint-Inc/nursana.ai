import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";

export default async function InterviewLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const supabase = createClient();
  const { data: interview, error } = await supabase
    .from("interviews")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !interview) {
    notFound();
  }

  return <div className="container mx-auto px-4 py-8">{children}</div>;
}
