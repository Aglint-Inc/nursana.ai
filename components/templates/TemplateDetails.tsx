"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type TemplateDetailsProps = {
  id: string;
};

export function TemplateDetails({ id }: TemplateDetailsProps) {
  const [template, setTemplate] = useState(null);

  useEffect(() => {
    const supabase = createClient();

    async function fetchTemplate() {
      const { data } = await supabase
        .from("interview_templates")
        .select("*")
        .eq("id", id)
        .single();
      setTemplate(data);
    }

    fetchTemplate();
  }, [id]);

  if (!template) return <div>Loading...</div>;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold mb-4">Template Details</h1>
      <h2 className="text-xl font-semibold">{template.name}</h2>
      <p>
        <strong>AI Welcome Message:</strong> {template.ai_welcome_message}
      </p>
      <p>
        <strong>AI Ending Message:</strong> {template.ai_ending_message}
      </p>
      <p>
        <strong>AI Interview Duration:</strong> {template.ai_interview_duration}{" "}
        minutes
      </p>
      <p>
        <strong>Candidate Estimated Time:</strong>{" "}
        {template.candidate_estimated_time}
      </p>
      <div>
        <strong>AI Instructions:</strong>
        <ul className="list-disc pl-5">
          {template.ai_instructions.map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </ul>
      </div>
      <p>
        <strong>AI Questions:</strong> {template.ai_questions}
      </p>
      <Link href={`/templates/edit/${id}`}>
        <Button>Edit Template</Button>
      </Link>
    </div>
  );
}
