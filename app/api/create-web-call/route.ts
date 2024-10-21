import { type NextRequest, NextResponse } from 'next/server';

import { getInstructions } from '@/utils/audio/instructions';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const { interviewId, resumeData } = await request.json();

    if (!interviewId) {
      throw new Error('Interview ID is required');
    }

    // Create a Supabase client using the custom function
    const supabase = createClient();

    // Fetch the interview data from Supabase
    const { data: interviewData, error: interviewError } = await supabase
      .from('interview')
      .select('*')
      .eq('id', interviewId)
      .single();

    if (interviewError) throw interviewError;
    if (!interviewData) throw new Error('Interview not found');

    console.log('interviewData', interviewData);

    const {
      ai_welcome_message,
      ai_questions,
      candidate_estimated_time: ai_interview_duration,
      ai_ending_message,
    } = interviewData;

    // Null checks
    if (!ai_welcome_message) {
      throw new Error('Welcome message is required');
    }
    if (!ai_questions) {
      throw new Error('Questions array is required and must not be empty');
    }
    if (!ai_interview_duration) {
      throw new Error('Interview duration is required');
    }
    if (!ai_ending_message) {
      throw new Error('Ending message is required');
    }

    const response = await fetch(
      'https://api.retellai.com/v2/create-web-call',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.RETELL_API_KEY}`,
        },
        body: JSON.stringify({
          agent_id: 'agent_6cdac8db05543d4e26f6f9dd7a',
          metadata: {
            interviewId,
          },
          retell_llm_dynamic_variables: {
            prompt: getInstructions({
              aiEndingMessage: ai_ending_message ?? '',
              aiInstructions: [ai_questions ?? ''],
              aiQuestions: interviewData.ai_instructions || [],
              aiWelcomeMessage: ai_welcome_message ?? '',
              resume: `${resumeData}`,
            }),
          },
          max_duration: ai_interview_duration * 60,
        }),
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Retell API error:', response.status, errorText);
      throw new Error(`Retell API error: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    console.log('Retell API response:', data);

    // Get the call_id from the Retell API response
    const call_id = data.call_id;

    // Update the interview_analysis table with the call_id
    const { error: insertError } = await supabase
      .from('interview_analysis')
      .upsert(
        {
          call_id,
          interview_id: interviewId,
          user_id: interviewData.user_id,
        },
        {
          onConflict: 'interview_id',
          ignoreDuplicates: false,
        },
      );

    if (insertError) throw insertError;

    return NextResponse.json({
      accessToken: data.access_token,
      callId: call_id,
      analysisId: interviewId,
    });
  } catch (error) {
    console.error('Error creating web call:', error);
    return NextResponse.json(
      { error: 'Failed to create web call', details: (error as Error).message },
      { status: 500 },
    );
  }
}
