import axios from "axios";

export function postProcessInterview(interview_analysis_id: string) {
  return axios.post("/api/backup-interview-data", {
    interview_analysis_id,
  });
}
