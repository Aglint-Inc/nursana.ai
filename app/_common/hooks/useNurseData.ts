import { useQuery } from "@tanstack/react-query";

import type { Database } from "@/lib/database.types";
import { createClient } from "@/utils/supabase/client";

type NurseData = {
  nurse: Database["public"]["Tables"]["nurses"]["Row"] | null;
  resume: Database["public"]["Tables"]["resumes"]["Row"] | null;
  interview: Database["public"]["Tables"]["interviews"]["Row"] | null;
  analysis: Database["public"]["Tables"]["interview_analysis"]["Row"] | null;
};

export const useNurseData = (nurseId: string) => {
  const supabase = createClient();

  return useQuery<NurseData, Error>({
    queryKey: ["nurseData", nurseId],
    queryFn: async () => {
      const [nurseResult, resumeResult, interviewResult, analysisResult] =
        await Promise.all([
          supabase.from("nurses").select("*").eq("nurse_id", nurseId).single(),
          supabase.from("resumes").select("*").eq("nurse_id", nurseId).single(),
          supabase
            .from("interviews")
            .select("*")
            .eq("nurse_id", nurseId)
            .order("created_at", { ascending: false })
            .limit(1)
            .single(),
          supabase
            .from("interview_analysis")
            .select("*")
            .eq("nurse_id", nurseId)
            .order("created_at", { ascending: false })
            .limit(1)
            .single(),
        ]);

      return {
        nurse: nurseResult.data,
        resume: resumeResult.data,
        interview: interviewResult.data,
        analysis: analysisResult.data,
      };
    },
  });
};
