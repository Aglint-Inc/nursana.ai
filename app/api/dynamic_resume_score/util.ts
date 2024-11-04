import { openai } from '@ai-sdk/openai';
import { generateObject } from 'ai';
import type { z } from 'zod';

import { type scoringSchemaType } from './type';

export async function score<T extends z.ZodSchema>(
  systemPrompt: string,
  data: string,
  schema: T,
) {
  const { object, usage } = await generateObject<z.infer<T>>({
    model: openai('gpt-4o'),
    system: systemPrompt,
    prompt: data,
    schema,
  });
  return { object, usage };
}

export const prompt = `
Instructions for Review and Scoring
For each section, provide:
Score (1-5): Based on the criteria outlined for each section:

1-2: Significant improvements needed; section lacks clarity or relevance.
3: Fair; includes some relevant content but needs improvement.
4: Good; well-presented with minor areas for enhancement.
5: Excellent; content is clear, relevant, and impactful.

Comment (for Recruiters): Objective observations on the resume’s strengths, relevance, and potential areas of improvement. Use neutral, professional language.
Feedback (for Applicants): Constructive, actionable suggestions intended to help the candidate enhance their resume. Use a supportive tone and provide specific guidance on how to improve.
Section Prompts and Guidelines

1. Professional Summary:
Instructions: Assess the summary or objective statement. Does it effectively convey the candidate’s core qualifications, career goals, and potential value to employers?
Score: Based on clarity, relevance, and impact.
Comment: Highlight strengths or areas needing clarity in relation to the role.
Feedback: Suggest specific improvements for clarity, conciseness, or focus to make the summary more impactful.

2. Experience Relevance & Clarity:
Instructions: Evaluate the relevance and clarity of the listed work experiences in relation to the candidate’s stated career goals. Look at job titles, responsibilities, and achievements.
Score: Based on how clearly experiences relate to the candidate's career goals.
Comment: Highlight relevant experiences or areas lacking clarity.
Feedback: Suggest ways to emphasize accomplishments, quantify results, or refine descriptions to target desired roles.

3. Skills & Keywords:
Instructions: Identify any key skills or industry-specific keywords that may be missing, especially those relevant to the role or industry.
Score: Based on the completeness and relevance of skills.
Comment: Note if skills align well with the industry or role.
Feedback: Recommend skills or keywords to add or highlight, particularly those in demand for the role.

4. Achievements & Metrics:
Instructions: Check for quantifiable accomplishments that demonstrate the candidate’s impact (e.g., percentages, metrics).
Score: Based on clarity and impact of achievements.
Comment: Mention any strong achievements or areas where metrics are lacking.
Feedback: Suggest adding more metrics or quantifying results to make achievements more tangible.

5. Education:
Instructions: Review clarity, relevance, and alignment of the education section with career goals.
Score: Based on clarity, relevance, and completeness.
Comment: Note relevant educational achievements or any missing details.
Feedback: Recommend ways to strengthen this section, like emphasizing academic accomplishments.

6. Grammar & Language:
Instructions: Check for grammar, clarity, and a professional tone.
Score: Based on language quality and tone.
Comment: Note any language issues that may impact readability.
Feedback: Offer constructive suggestions for readability and professionalism.

Overall Comment (for Recruiters)
Provide an overall assessment Comment on the resume’s strengths and weakness.
Overall Feedback (for Applicants)
Provide an overall assessment summarizing the resume’s strengths and main areas for improvement. Offer actionable advice on how the candidate can enhance their resume’s presentation, clarity, and relevance to better meet job application requirements.`;

export function calculateOverallScore(transcriptAnalysis: scoringSchemaType) {
  const categories = Object.keys(
    transcriptAnalysis,
  ) as (keyof scoringSchemaType)[];

  let totalScore = 0;
  let count = 0;

  categories.forEach((category) => {
    if (category === 'overall_feedback' || category === 'overall_comment')
      return;
    if (transcriptAnalysis[category] && transcriptAnalysis[category].score) {
      totalScore += transcriptAnalysis[category].score;
      count += 1;
    }
  });

  // Calculate the overall score out of 100
  const overallScore =
    totalScore > 0 && count > 0 ? (totalScore / count) * 20 : 0; // Each score is out of 5, so multiply by 20 for percentage

  return parseFloat(overallScore.toFixed(1)); // Format to one decimal place
}
