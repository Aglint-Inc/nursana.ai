import { CampaignList } from "@/components/campaigns/CampaignList";

export default function CampaignsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex container">
      <div className="w-80 flex-shrink-0 border-r bg-white">
        <CampaignList />
      </div>
      <div className="flex-1 w-full overflow-y-auto">
        <div className="w-full py-6 px-4 sm:px-6 lg:px-8">{children}</div>
      </div>
    </div>
  );
}
