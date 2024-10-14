import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export default async function TemplatesPage() {
  const supabase = createClient();
  const { data: templates } = await supabase
    .from("interview_templates")
    .select("id")
    .limit(1);

  if (templates && templates.length > 0) {
    redirect(`/templates/${templates[0].id}`);
  }

  return (
    <div className="bg-white shadow-sm rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-4">Interview Templates</h1>
      {templates && templates.length === 0 ? (
        <p>No templates found. Create a new template to get started.</p>
      ) : (
        <p>Select a template from the list or create a new one.</p>
      )}
    </div>
  );
}
