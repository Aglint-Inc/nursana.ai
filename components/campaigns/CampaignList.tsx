"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function CampaignList() {
  const router = useRouter();
  const pathname = usePathname();
  const [campaigns, setCampaigns] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const supabase = createClient();

    async function fetchCampaigns() {
      const { data } = await supabase.from("campaigns").select("id, name");
      setCampaigns(data || []);
      if (data && data.length > 0 && pathname === "/campaigns") {
        router.push(`/campaigns/${data[0].id}`);
      }
    }

    fetchCampaigns();
  }, [router, pathname]);

  const filteredCampaigns = campaigns.filter((campaign) =>
    campaign.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Campaigns</h2>
        <Link href="/campaigns/create">
          <Button size="sm" variant="outline">
            New Campaign
          </Button>
        </Link>
      </div>
      <div className="relative mb-4">
        <Search
          className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={20}
        />
        <Input
          type="text"
          placeholder="Search campaigns"
          className="pl-10 w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <ul className="space-y-1">
        {filteredCampaigns.map((campaign) => (
          <li key={campaign.id}>
            <Link
              href={`/campaigns/${campaign.id}`}
              className={`block px-3 py-2 rounded-md text-sm ${
                pathname === `/campaigns/${campaign.id}`
                  ? "bg-gray-100 font-medium"
                  : "hover:bg-gray-50"
              }`}
            >
              {campaign.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
