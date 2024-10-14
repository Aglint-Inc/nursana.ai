import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";


export const useNurseData = (nurseId: string) => {
  const supabase = createClient();
  console.log(nurseId);
  console.log("from useNurseData");

  return useQuery({
    queryKey: ['nurseData', nurseId],
    queryFn: async () => {
      const [nurseResult, resumeResult, interviewResult, analysisResult] = await Promise.all([
        supabase
          .from('nurses')
          .select('first_name, last_name, job_title, email, phone_number, profile_status')
          .eq('nurse_id', nurseId)
          .single(),
        supabase
          .from('resumes')
          .select('file_name, file_size, file_url, structured_resume')
          .eq('nurse_id', nurseId)
          .single(),
        supabase
          .from('interviews')
          .select('name, interview_stage, created_at,  candidate_estimated_time, candidate_form, candidate_instructions, candidate_intro_video_cover_image_url, candidate_intro_video_url, candidate_overview')
          .eq('nurse_id', nurseId)
          .order('created_at', { ascending: false })
          .limit(1)
          .single(),
        supabase
          .from('interview_analysis')
          .select('duration, structured_analysis, video_url, audio_url, transcript_url')
          .eq('nurse_id', nurseId)
          .order('created_at', { ascending: false })
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
