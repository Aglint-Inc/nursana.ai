import {
  type HttpFunction,
  type Request,
  type Response,
} from '@google-cloud/functions-framework';

import { handlerResumeToText } from './preCall';
import { processResumeToJson } from './textToJson';
import {
  type ErrorType,
  getFileUrl,
  getResponse as getResponse,
  saveToDB,
  setToProcessing,
} from './utils';
import { supabaseClient } from './client/supabaseClient';

export const hello: HttpFunction = async (req: Request, res: Response) => {
  res.set('Access-Control-Allow-Origin', '*');
  if (req.method === 'POST') {
    const {
      resume_id,
      resume,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      retry = 0,
      env,
      test = false,
    } = req.body as {
      resume_id: string;
      resume: string;
      retry: number;
      env: 'local' | 'dev' | 'prod';
      test?: boolean;
    };
    const supabase = supabaseClient(env);
    if (!resume_id || !resume) {
      return res.status(400).send(
        getResponse(supabase, {
          error: `Invalid request. Required payload missing. ${JSON.stringify({
            resume_id,
            resume,
          })}`,
          resume_id,
          test,
        }),
      );
    }
    await setToProcessing(supabase, resume_id);
    try {
      const bucketName = 'resumes';
      const fileName = resume.split(`${bucketName}/`).pop() || '';
      const fileUrl = await getFileUrl(supabase, 'resumes', fileName);
      if (!fileUrl) throw new Error('Failed to get file URL');
      const data = await handlerResumeToText(fileUrl);
      const resume_text = data.resume_text;
      const json = !resume_text
        ? undefined
        : await processResumeToJson(resume_text);
      if (!test && json) {
        await saveToDB(supabase, {
          data: {
            structured_resume: json,
            processing_status: {
              resume_to_json_api: {
                timestamp: new Date().toISOString(),
                status: 'success',
              },
            },
          },
          id: resume_id,
        });
      }
      return res.status(200).json(
        getResponse(supabase, {
          data: { resume_text, json },
          resume_id,
          test,
        }),
      );
    } catch (error) {
      let errorMessage = 'Internal Server Error at: process_resume.';
      let errorType = 'SYSTEM_ERROR';
      if (typeof error === 'string') {
        errorMessage = error.toUpperCase();
      } else if (error instanceof Error) {
        errorType = error.name;
        errorMessage = error.message;
      }
      return res.status(500).json(
        getResponse(supabase, {
          error: errorMessage,
          resume_id,
          type: errorType as ErrorType,
          test,
        }),
      );
    }
  } else if (req.method === 'OPTIONS') {
    // Send response to OPTIONS requests
    res.set('Access-Control-Allow-Methods', 'GET');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.set('Access-Control-Max-Age', '3600');
    res.status(204).send('');
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).send({
      data: null,
      saved: false,
      error: 'Method Not Allowed!',
      type: 'SYSTEM_ERROR',
    });
    return;
  }
};
