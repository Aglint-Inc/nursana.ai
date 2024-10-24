import { z } from 'zod';

import { createPrivateClient } from '@/server/db';
import { getInstructions } from '@/utils/audio/instructions';

import { type PrivateProcedure, privateProcedure } from '../../trpc';

const schema = z.object({
  interview_id: z.string(),
  resumeData: z.string(),
});

export const query = async ({
  input,
  ctx: { user_id: applicant_id },
}: PrivateProcedure<typeof schema>) => {
  const { resumeData, interview_id } = input;
  const db = createPrivateClient();
  if (!interview_id) {
    throw new Error('Interview ID is required');
  }

  // Fetch the interview data from Supabase
  const { data: interviewData, error: interviewError } = await db
    .from('interview')
    .select('*,version!inner(*)')
    .eq('id', interview_id)
    .single();

  if (interviewError) {
    throw new Error(interviewError.message);
  }
  if (!interviewData) throw new Error('Interview not found');
  const {
    ai_instructions,
    ai_ending_message,
    ai_questions,
    ai_welcome_message,
    ai_interview_duration,
  } = interviewData.version;

  const response = await fetch('https://api.retellai.com/v2/create-web-call', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.RETELL_API_KEY}`,
    },
    body: JSON.stringify({
      agent_id: 'agent_6cdac8db05543d4e26f6f9dd7a',
      metadata: {
        interview_id,
      },
      retell_llm_dynamic_variables: {
        prompt: getInstructions({
          aiEndingMessage: ai_ending_message ?? '',
          aiInstructions: ai_instructions ?? '',
          aiQuestions: ai_questions ?? '',
          aiWelcomeMessage: ai_welcome_message ?? '',
          resume: resumeData,
        }),
      },
      max_duration: ai_interview_duration * 60,
    }),
  });
  if (!response.ok) {
    const errorText = await response.text();
    console.error('Retell API error:', response.status, errorText);
    throw new Error(`Retell API error: ${response.status} ${errorText}`);
  }
  const data = await response.json();
  // Get the call_id from the Retell API response
  const call_id = data.call_id;

  // Update the interview_analysis table with the call_id
  const { error: insertError, data: interviewAnalysis } = await db
    .from('interview_analysis')
    .upsert(
      {
        call_id,
        interview_id: interview_id,
        applicant_id: applicant_id,
      },
      {
        onConflict: 'interview_id',
        ignoreDuplicates: false,
      },
    )
    .select('*')
    .single();

  if (insertError) throw insertError;

  return {
    accessToken: data.access_token,
    callId: call_id,
    analysisId: interviewAnalysis.id,
  };
};

export const createWebCall = privateProcedure.input(schema).mutation(query);
