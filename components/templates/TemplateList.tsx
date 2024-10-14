"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function TemplateList() {
  const router = useRouter();
  const pathname = usePathname();
  const [templates, setTemplates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const supabase = createClient();

    async function fetchTemplates() {
      const { data } = await supabase
        .from("interview_templates")
        .select("id, name");
      setTemplates(data || []);
      if (data && data.length > 0 && pathname === "/templates") {
        router.push(`/templates/${data[0].id}`);
      }
    }

    fetchTemplates();
  }, [router, pathname]);

  const filteredTemplates = templates.filter((template) =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Templates</h2>
        <Link href="/templates/create">
          <Button size="sm" variant="outline">
            New Template
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
          placeholder="Search templates"
          className="pl-10 w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <ul className="space-y-1">
        {filteredTemplates.map((template) => (
          <li key={template.id}>
            <Link
              href={`/templates/${template.id}`}
              className={`block px-3 py-2 rounded-md text-sm ${
                pathname === `/templates/${template.id}`
                  ? "bg-gray-100 font-medium"
                  : "hover:bg-gray-50"
              }`}
            >
              {template.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
