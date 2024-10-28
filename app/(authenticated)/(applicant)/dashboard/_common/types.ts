export type InterviewAnalysisType = {
  interaction: AdaptabilityStressManagement;
  articulation: AdaptabilityStressManagement;
  overall_score: number;
  overall_summary: string;
  confidence_level: AdaptabilityStressManagement;
  overall_feedback: string;
  communication_gaps: AdaptabilityStressManagement;
  engagement_responsiveness: AdaptabilityStressManagement;
  adaptability_stress_management: AdaptabilityStressManagement;
};

export type AdaptabilityStressManagement = {
  score: number;
  feedback: string;
  explanation: string;
};
