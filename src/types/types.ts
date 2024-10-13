export interface InterviewData {
  id: string;
  campaign_code: string;
  candidate_estimated_time: number;
  candidate_intro_video_cover_image_url: string;
  candidate_intro_video_url: string;
  candidate_overview: string[];
  candidate_instructions: string[];
  interview_stage: string;
  name?: string;
}
