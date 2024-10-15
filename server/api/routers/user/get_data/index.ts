/* eslint-disable no-console */

import { type PrivateProcedure, privateProcedure } from "@/server/api/trpc";
import { createPrivateClient } from "@/server/db";

const query = async ({ ctx: { user_id } }: PrivateProcedure) => {
  const db = createPrivateClient();
  const [nurseResult, resumeResult, interviewResult, analysisResult] =
    await Promise.all([
      db.from("users").select("*").eq("id", user_id).single(),
      db.from("resumes").select("*").eq("user_id", user_id).single(),
      db
        .from("interviews")
        .select("*")
        .eq("user_id", user_id)
        .order("created_at", { ascending: false })
        .limit(1)
        .single(),
      db
        .from("interview_analysis")
        .select("*")
        .eq("nurse_id", user_id)
        .order("user_id", { ascending: false })
        .limit(1)
        .single(),
    ]);
  return {
    nurse: nurseResult.data,
    resume: resumeResult.data,
    interview: interviewResult.data,
    analysis: analysisResult.data,
  };
};

export const getData = privateProcedure.query(query);