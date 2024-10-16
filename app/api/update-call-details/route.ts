import { NextResponse } from 'next/server';

import { getSupabaseAdminServer } from '@/utils/supabase/supabaseAdmin';

const RETELL_API_KEY = process.env.RETELL_API_KEY;

async function getCallDetails(callId: string) {
  const response = await fetch(`https://api.retellai.com/call/${callId}`, {
    headers: {
      Authorization: `Bearer ${RETELL_API_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch call details: ${response.statusText}`);
  }

  return response.json();
}

export async function POST(req: Request) {
  const { analysisId } = await req.json();

  if (!analysisId) {
    return NextResponse.json(
      { error: 'Analysis ID is required' },
      { status: 400 },
    );
  }

  const supabase = getSupabaseAdminServer();

  try {
    // First, get the call_id from the analysis row
    const { data: analysisData, error: analysisError } = await supabase
      .from('interview_analysis')
      .select('call_id')
      .eq('id', analysisId)
      .single();

    if (analysisError) throw analysisError;
    if (!analysisData?.call_id)
      throw new Error('Call ID not found in analysis row');

    // Fetch call details from Retell API
    const callDetails = await getCallDetails(analysisData.call_id);

    // Update the analysis row with audio and transcript URLs
    const { data, error } = await supabase
      .from('interview_analysis')
      .update({
        audio_url: callDetails.audio_url,
        transcript_url: callDetails.transcript_url,
        // You can add more fields here if needed
      })
      .eq('id', analysisId)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error updating call details:', error);
    return NextResponse.json(
      { error: 'Failed to update call details' },
      { status: 500 },
    );
  }
}
