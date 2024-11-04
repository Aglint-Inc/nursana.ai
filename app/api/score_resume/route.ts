import { type NextRequest, NextResponse } from 'next/server';

import { createAdminClient } from '@/utils/supabase/server';
import { type SupabaseClientType } from '@/utils/supabase/type';

import {
  calculateAllSectionScore,
  professionalSummaryPromptArchive,
  type professionalSummaryType,
  PromptArchive,
  type schemaType,
  score,
  type scoringSchemaType,
} from './util';

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
    const scoreObject = await Promise.all(
      PromptArchive.map(async (item) => {
        try {
          const data = item.dataMapper(resume_json);
          if (data.error !== null) {
            return Promise.resolve({
              object: null,
              usage: null,
              key: item.key,
              error: data.error,
            });
          } else {
            const resData = await score(item.prompt, data.result, item.schema);
            return {
              object: resData.object,
              usage: resData.usage,
              key: item.key,
            } as typeof resData & { key: string };
          }
        } catch (e) {
          return Promise.resolve({
            object: null,
            usage: null,
            key: item.key,
            error: String(e),
          });
        }
      }),
    );
    const usage = { promptTokens: 0, completionTokens: 0, totalTokens: 0 };

    const scoreJson = scoreObject.reduce(
      (acc, item) => {
        if (item.usage) {
          usage.promptTokens += item.usage.promptTokens;
          usage.completionTokens += item.usage.completionTokens;
          usage.totalTokens += item.usage.totalTokens;
          return { ...acc, [item.key]: item.object };
        } else {
          error[item.key] = item.error;
          return acc;
        }
      },
      {} as unknown as scoringSchemaType,
    );
    const { scoredSections, overallScore } =
      calculateAllSectionScore(scoreJson);
    const professionalSummaryObject = await Promise.all(
      professionalSummaryPromptArchive.map(async (item) => {
        try {
          const data = item.dataMapper({
            score_json: scoredSections,
            json: resume_json,
          });
          if (data.error !== null) {
            return Promise.resolve({
              object: null,
              usage: null,
              key: item.key,
              error: data.error,
            });
          } else {
            const resData = await score(item.prompt, data.result, item.schema);
            return {
              object: resData.object,
              usage: resData.usage,
              key: item.key,
            } as typeof resData & { key: string };
          }
        } catch (e) {
          return Promise.resolve({
            object: null,
            usage: null,
            key: item.key,
            error: String(e),
          });
        }
      }),
    );
    const professionalSummaryJson = professionalSummaryObject.reduce(
      // @ts-ignore
      (acc, item) => {
        if (item.usage) {
          usage.promptTokens += item.usage.promptTokens;
          usage.completionTokens += item.usage.completionTokens;
          usage.totalTokens += item.usage.totalTokens;
          if (item.key === 'summary') {
            return { ...acc, [item.key]: item.object.summary };
          }
          return { ...acc, [item.key]: item.object };
        } else {
          error[item.key] = item.error;
          return acc;
        }
      },
      {} as unknown as professionalSummaryType,
    );
    const resumeFeedbackJson = {
      overall_summary: professionalSummaryJson.summary_feedback.summary,
      overall_feedback:
        professionalSummaryJson.summary_feedback.overall_feedback,
      overallScore,
      breakdown: scoreJson,
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
  supabase: SupabaseClientType,
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
