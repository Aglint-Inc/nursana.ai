import { TemplateDetails } from "@/components/templates/TemplateDetails";

export default function TemplateDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="bg-white shadow-sm rounded-lg p-6">
      <TemplateDetails id={params.id} />
    </div>
  );
}
