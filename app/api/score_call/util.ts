import { openai } from '@ai-sdk/openai';
import { generateObject } from 'ai';
import { z } from 'zod';
// import { zodToJsonSchema } from "zod-to-json-schema";

export async function score<T extends z.ZodSchema>(
  systemPrompt: string,
  data: string,
  schema: T,
) {
  const { object, usage } = await generateObject<z.infer<T>>({
    model: openai('gpt-4o-mini'),
    system: systemPrompt,
    prompt: data,
    schema,
  });
  return { object, usage };
}

export const transcriptAnalysisSchema = z.object({
  communication_gaps: z.object({
    score: z.number().min(1).max(5),
    explanation: z.string(),
  }),
  engagement_responsiveness: z.object({
    score: z.number().min(1).max(5),
    explanation: z.string(),
  }),
  articulation: z.object({
    score: z.number().min(1).max(5),
    explanation: z.string(),
  }),
  adaptability_stress_management: z.object({
    score: z.number().min(1).max(5),
    explanation: z.string(),
  }),
  agent_interaction: z.object({
    score: z.number().min(1).max(5),
    explanation: z.string(),
  }),
  confidence_level: z.object({
    score: z.number().min(1).max(5),
    explanation: z.string(),
  }),
  overall_summary: z.string(),
});
type transcriptAnalysisSchemaType = z.infer<typeof transcriptAnalysisSchema>;

const transcriptSchema = z
  .object({
    role: z.enum(['user', 'agent']),
    content: z.string(),
  })
  .array();
export type transcriptSchemaType = z.infer<typeof transcriptSchema>;

export const professionalSummaryPromptArchive = `
Analyze the call transcript for a nurse job application based on the key areas below. Assign a score to each section on a scale of 1 to 5, where:
1 = Very poor (significant issues, failed to meet expectations)
2 = Poor (frequent issues, barely meeting expectations)
3 = Average (some issues, meets basic expectations)
4 = Good (minor issues, exceeds expectations in some areas)
5 = Excellent (no issues, fully meets or exceeds expectations)
Key Areas for Analysis:

 **Communication Gaps:**
 - Evaluate: Look for instances of incomplete, fragmented, or unclear responses. Are there parts of the transcript where the user is interrupted or their speech is inaudible?
 - Score: Assign a score based on the frequency and severity of these gaps. A score of 5 indicates no gaps, while a score of 1 indicates frequent communication issues.

 **Engagement and Responsiveness:**
 - Evaluate: Assess how well the user engages with the agent’s questions. Do they provide direct answers to the questions asked, or do they deflect or avoid them?
 - Score: Assign a score based on their responsiveness. A score of 5 indicates full engagement with all questions, while a score of 1 indicates significant avoidance or disinterest.

 **Ability to Articulate Thoughts (Articulation):**
 - Evaluate: Determine if the user's responses are clear and well-organized. Are they able to provide detailed and meaningful answers? Look for any vague or disjointed statements.
 - Score: Rate their articulation. A score of 5 reflects articulate and coherent responses, while a score of 1 indicates frequent confusion or lack of clarity.

 **Adaptability and Stress Management:**
 - Evaluate: Observe how the user handles repeated or challenging questions. Are they able to adjust their responses appropriately, or do they show signs of stress or frustration?
 - Score: Score their adaptability. A score of 5 means they effectively manage stress and adapt well, while a score of 1 means they struggle under pressure.

 **Agent Interaction:**
 - Evaluate: Analyze how the user interacts with the agent's prompts and support. Do they respond positively to guidance, using it to enhance their answers?
 - Score: Rate their interaction. A score of 5 indicates excellent interaction and responsiveness to prompts, while a score of 1 suggests minimal engagement with the agent's input.

 **Confidence Level:**
 - Evaluate: Assess the user's confidence based on their responses. Do they appear self-assured and assertive, or do they seem hesitant and uncertain?
 - Score: Rate their confidence. A score of 5 reflects high confidence in their responses, while a score of 1 indicates noticeable hesitation.

 **Overall Summary:** Provide an overall_summary that encapsulates the candidate's performance, highlighting key strengths and areas for improvement.
`;

export function calculateOverallScore(
  transcriptAnalysis: transcriptAnalysisSchemaType,
) {
  const categories = Object.keys(
    transcriptAnalysis,
  ) as (keyof transcriptAnalysisSchemaType)[];

  let totalScore = 0;
  let count = 0;

  categories.forEach((category) => {
    if (category === 'overall_summary') return;
    if (transcriptAnalysis[category] && transcriptAnalysis[category].score) {
      totalScore += transcriptAnalysis[category].score;
      count += 1;
    }
  });

  // Calculate the overall score out of 100
  const overallScore = count > 0 ? (totalScore / count) * 20 : 0; // Each score is out of 5, so multiply by 20 for percentage

  return  parseFloat(overallScore.toFixed(1)) // Format to one decimal place
}
