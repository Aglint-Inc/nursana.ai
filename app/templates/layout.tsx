import { TemplateList } from "@/components/templates/TemplateList";

export default function TemplatesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-80 flex-shrink-0 border-r bg-white overflow-y-auto">
        <TemplateList />
      </div>
      <div className="flex-grow overflow-y-auto">
        <div className="max-w-3xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </div>
    </div>
  );
}
