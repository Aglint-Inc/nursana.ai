import { type NextRequest, NextResponse } from 'next/server';

import { createAdminClient } from '@/utils/supabase/server';
import type { SupdabasClientType } from '@/utils/supabase/type';

import { resumeReviewSchema, type schemaType } from './type';
import { calculateOverallScore, prompt, score } from './util';

// @ts-ignore
interface NextRequestTS<T> extends NextRequest {
  json(): Promise<T>;
}

export async function POST(
  request: NextRequestTS<{
    resume_id: string;
    resume_json: schemaType;
    test?: boolean;
  }>,
) {
  const { resume_id, resume_json, test = false } = await request.json();
  if (!resume_id || !resume_json) {
    return NextResponse.json(
      { error: 'Invalid Request interview analysis id required' },
      { status: 400 },
    );
  }

  const supabase = createAdminClient();
  try {
    const error: any = {};
    const scoreObject = await score(
      prompt,
      JSON.stringify(resume_json),
      resumeReviewSchema,
    );
    const usage = {
      promptTokens: scoreObject.usage.promptTokens,
      completionTokens: scoreObject.usage.completionTokens,
      totalTokens: scoreObject.usage.totalTokens,
    };

    const resumeFeedbackJson = {
      ...scoreObject.object,
      overall_score: calculateOverallScore(scoreObject.object),
    };

    let savedData;
    if (!test) {
      savedData = await saveToDB(supabase, resume_id, {
        resume_feedback: resumeFeedbackJson,
        processing_status: {
          score_resume_api: { status: 'success', error: error },
        },
      });
    }
    return NextResponse.json({
      data: test ? resumeFeedbackJson : savedData,
      usage,
    });
  } catch (e: any) {
    if (!test) {
      await saveToDB(supabase, resume_id, {
        processing_status: {
          score_resume_api: { status: 'error', error: String(e) },
        },
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
  resume_id: string,
  data: any,
) => {
  return (
    await supabase
      .from('resume')
      .update(data)
      .eq('id', resume_id)
      .select('resume_feedback')
      .single()
      .throwOnError()
  ).data!;
};
