import { z } from 'zod';

export const transcriptAnalysisSchema = z.object({
  communication_gaps: z.object({
    score: z.number().min(0).max(5),
    explanation: z.string(),
    feedback: z.string(),
  }),
  engagement_responsiveness: z.object({
    score: z.number().min(0).max(5),
    explanation: z.string(),
    feedback: z.string(),
  }),
  articulation: z.object({
    score: z.number().min(0).max(5),
    explanation: z.string(),
    feedback: z.string(),
  }),
  adaptability_stress_management: z.object({
    score: z.number().min(0).max(5),
    explanation: z.string(),
    feedback: z.string(),
  }),
  interaction: z.object({
    score: z.number().min(0).max(5),
    explanation: z.string(),
    feedback: z.string(),
  }),
  confidence_level: z.object({
    score: z.number().min(0).max(5),
    explanation: z.string(),
    feedback: z.string(),
  }),
  overall_summary: z.string(),
  overall_feedback: z.string(),
});
// export type transcriptAnalysisSchemaType = z.infer<
//   typeof transcriptAnalysisSchema
// >;
