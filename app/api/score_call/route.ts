import { type NextRequest, NextResponse } from 'next/server';

import { createAdminClient } from '@/utils/supabase/server';
import { type SupdabasClientType } from '@/utils/supabase/type';

import { calculateOverallScore, transcriptParser } from './util';
import {
  professionalSummaryPromptArchive,
  score,
  transcriptAnalysisSchema,
  type transcriptSchemaType,
} from './util';

// @ts-ignore
interface NextRequestTS<T> extends NextRequest {
  json(): Promise<T>;
}

export async function POST(
  request: NextRequestTS<{
    analysis_id: string;
    transcript_json: transcriptSchemaType;
    test?: boolean;
  }>,
) {
  const { analysis_id, transcript_json, test = false } = await request.json();
  if (!analysis_id || !transcript_json) {
    return NextResponse.json(
      { error: 'Invalid Request interview analysis id required' },
      { status: 400 },
    );
  }

  const supabase = createAdminClient();
  try {
    const error: any = {};
    const transcript = JSON.stringify(transcriptParser(transcript_json));
    const { object: scoreObject, usage } = await score(
      professionalSummaryPromptArchive,
      transcript,
      transcriptAnalysisSchema,
    );

    const overallScore = calculateOverallScore(scoreObject);
    const finalObject = { ...scoreObject, overall_score: overallScore };
    let savedData;
    if (!test) {
      savedData = await saveToDB(supabase, analysis_id, {
        structured_analysis: finalObject,
        analysis_status: { status: 'success', error: error },
      });
    }
    return NextResponse.json({
      data: test ? finalObject : savedData,
      usage,
    });
  } catch (e: any) {
    console.error(String(e));
    if (!test) {
      await saveToDB(supabase, analysis_id, {
        analysis_status: { status: 'error', error: String(e) },
      });
    }
    return NextResponse.json(
      {
        data: null,
        usage: null,
        error: e.message,
      },
      { status: 500 },
    );
  }
}

const saveToDB = async (
  supabase: SupdabasClientType,
  analysis_id: string,
  data: any,
) => {
  return (
    await supabase
      .from('interview_analysis')
      .update(data)
      .eq('id', analysis_id)
      .select('structured_analysis')
      .single()
      .throwOnError()
  ).data!;
};
