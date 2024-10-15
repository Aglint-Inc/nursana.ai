import { useQuery } from "@tanstack/react-query";

import { supabase } from "@/utils/supabase/client";

export const useNurseData = (nurseId: string) => {
  return useQuery({
    queryKey: ["nurseData", nurseId],
    queryFn: async () => {
      const [nurseResult, resumeResult, interviewResult, analysisResult] =
        await Promise.all([
          supabase.from("users").select("*").eq("nurse_id", nurseId).single(),
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
