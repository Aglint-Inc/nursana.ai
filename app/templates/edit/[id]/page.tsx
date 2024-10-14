import { TemplateForm } from "@/components/templates/TemplateForm";
import { updateTemplate } from "@/app/actions/templateActions";
import { createClient } from "@/utils/supabase/server";

export default async function EditTemplatePage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createClient();
  const { data: template } = await supabase
    .from("interview_templates")
    .select("*")
    .eq("id", params.id)
    .single();

  const action = updateTemplate.bind(null, params.id);

  return (
    <div className="bg-white shadow-sm rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Template</h1>
      <TemplateForm initialData={template} action={action} />
    </div>
  );
}
