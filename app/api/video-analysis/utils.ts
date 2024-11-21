import { SupabaseClientType } from '@/utils/supabase/supabaseAdmin';
import { Storage } from '@google-cloud/storage';
import { VertexAI } from '@google-cloud/vertexai';
import { Readable } from 'stream';
import { response_schema } from './response-schema';

export async function fetchAnalysis(
  db: SupabaseClientType,
  analysis_id: string,
) {
  return (
    await db
      .from('interview_analysis')
      .select()
      .eq('id', analysis_id)
      .single()
      .throwOnError()
  ).data;
}

export async function uploadToGCS(
  projectId: string,
  fileUrl: string,
  bucketName: string,
  destination: string,
): Promise<string> {
  const storage = new Storage({
    projectId,
    credentials: {
      type: 'service_account',
      project_id: 'aglint-cloud-381414',
      private_key_id: 'e1355b0a1ffee84e05ea3cab3b9761f1c7668a88',
      private_key:
        '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDLUML6NLHPuTZW\nQWbjeDPeMtFzcrvj3kdyum2bBtSHUyVj8ilOf82W1Za7C/+CB0e2i9k8KqUemdv5\nL0VsatNqnk0xLtvIgwyd65bBTTUxLdVvrsfJju9DowKmhd+4thFcplNE6FQkyQWI\nW8KVFYCLO9mv1WFvPSoLmFQiqcATz0OyMyRKK+Vo5q8147mRtjMiyfHou836iESb\ntPKgh/wgb5xMXCQIRK7E2IlTo1AJxgAW2ISzRcXLRvdqRCyF6uz4ugDcXQYK8f+x\njm51VFr2M3YjVab+2cAUfXloyRHecqguxkvEbIFAM7qyh924yUy4k0SvciBRCHeU\nvCFEWq2PAgMBAAECggEAU+met1aVRqbqCrqOhPaA7cWqlYv2iSsd8PeJsjCk+b8y\n0OfK7Zeo2gaIYeWnTFrF2c0pWQA+yvz0gYlljUQfwsLYGCL/WefghrMLsvczK3t/\nukr4MTOZg6BdQS5CskEOtF7/QhLjW5VN/8PjcNWBirWmeEBIqPklB8kUfIPz/xhQ\n2JpIK+jZ2Xl029xnnIdcZf3JFdX56WFbUgkNllLpqPXoTts4WfzJ7Bpxun+g+6G1\nhu5pRAKfVl0KFREsw3k9ja1i+LVQP+X0iIgDoAY6QdwW3xqL+q7mUPBo/lk7Glae\nbr8g0sI5keQvRhqveM1nARy/VAtpGKsvIana7MdFJQKBgQD0A6sq6EG1UhZCsGJ1\niUFZ9U4aH7EPCi3euxzU83PVJd7IWX17xif4317TpRRo2ONtBKpAXmismkUs8P83\nkJZUQF93iIKRMnfpqMGZEAqKzg3CnvlzpnIFniSJlbNv99CM4eUl/IV86XKXA87b\nmP/0Q4hddocvZpvzowQSWRirpQKBgQDVTVRouIdd468jj8HYzkrwuNKlSooFl7OW\n3dKCtx7bU12W5A69VWxP+XOUC69xMKkrwWNFWE4Ypblg8ZksZSYFh4DY5QCt244+\n/fZ9cR7NyP9gmzokUEWIgDZE4R94oWEop+1dlaLXV/kT38ScbHgK8WYUcNwqapp6\nEJLEc4B+IwKBgQCfr2bshWG6zyVSLyu/zzq9LBMYdXThar/p6nlLwqYi7s2EP0wn\nG948t7DOwFFC6+ypA0yHI0FM8wgiCPR74FsAd8AB8YvAiU5/0rge+qhrfbzziCWm\n0V383yj6AMWUmJAaIhpbaY3R2NPsj8lnXBDkQO2UfGSrWHLmVd/sQfIrIQKBgQDF\nWP2ewhPkR1L0SP5ltD/bxnSGH5fhosCy9drdu8Vd0RzHDYuhmxZSTA6mS8VvqUDr\nzcomD5R582K3kfBRBeiOtxb8FaxyLq/GEjxrRSzl4nB9FkFN9cLPjygmxE7U0iLN\ndckEi/yU1r0JqUAEJctO/Jegk+bvi6APDaRtBBw/FwKBgDvNClCGv+4xHGZw3/fK\n7Eker0WaWnBficfs6ajzUIIEnj9zjOczjbwDMEmN3QXA1gV71pMzWivylLYsCI1c\nQ7r1p1t+Qku5+udrXDcfgD/QgxU8gKq5a76nW43wTJZwQjcpAFweRDAAnkfUGw7f\nVM9VamCUxn0u+KqluG7Yoiyw\n-----END PRIVATE KEY-----\n',
      client_email:
        'storage-access@aglint-cloud-381414.iam.gserviceaccount.com',
      client_id: '117648790818143426656',
      universe_domain: 'googleapis.com',
    },
  });

  try {
    // Fetch file from URL
    const response = await fetch(fileUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch file from URL: ${fileUrl}`);
    }

    const bucket = storage.bucket(bucketName);
    const file = bucket.file(destination);
    const buffer = Buffer.from(await response.arrayBuffer());
    // Handle readable streams compatibility
    const readableStream = Readable.from(buffer);

    // Upload to GCS
    await new Promise((resolve, reject) => {
      const writeStream = file.createWriteStream();
      readableStream
        .pipe(writeStream)
        .on('finish', resolve)
        .on('error', reject);
    });

    // Return GCS URI
    return `gs://${bucketName}/${destination}`;
  } catch (error) {
    throw new Error(`Error uploading file to GCS: ${error.message}`);
  }
}

export async function sendMultiModalPromptWithVideo(
  projectId: string,
  location: string,
  model: string,
  gcsUri: string,
  jobTitle: string,
): Promise<string> {
  try {
    const vertexAI = new VertexAI({
      project: projectId,
      location: location,
      googleAuthOptions: {
        credentials: {
          type: 'service_account',
          project_id: 'aglint-cloud-381414',
          private_key_id: '6ed4410251f58509a642fb2240bcea59dce24db5',
          private_key:
            '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDNBiLYtscK5e17\nheFotADHrQvhmlxCMkN687s0eeH/f/JZjojMGK4l65/3xfMfKy3J3Tom7zCl/2x4\nLysCf+fRlzrUgYz/yZrwlx/EQK29I4iRZJQHiVab6aO1YGPTXw0U+7x03S2vDI3t\nIMn2S6taOVbFG7d5h0tFCqjkAq4lMg08ZsTp+nvDOWMB4uSCSTschlMDzbVkAxYI\n6WWJZrCrNug6LHFb1U/DMUbWiHTlxmYCLCq4Eyk8ok/w/DF/Unz+oqs4xkxXkR08\nzFIifXRHunkyTavcbkdJAEVz5g8wP6QUCM9BgeVgBLwvyEqLnjIH8oDD6XceAdZr\ng07WnvIZAgMBAAECggEAYZG0fqbJJZYThO/LPE1Be8UN/PC9TCFofLhGFGyWkUV9\n+4G590sdgV1XVQ5mq6QcV89Iz+OPpsfeAnoMAVYGZ/eM3znB9K6oZiu9SeOv6u1g\nnjSbv9Rrm6o+JuB20U4QRzaf0ou5pG8YkctDYctUAg18jjQpBhRNTU+L3WqrHnaP\nx9ETAvhdHb1w6t3mhXlHXYJkWs7R/isMa76ekQrXAG7dHAX8fpeYQU4rcSHZB1GM\neQ+ihvsjJrW9gt3eyGMISglj0gQmphyyXyCBr0DrMmM+GFNnGusEXOU8ai6rZC59\nSdfPaSx+t2iqjEnSHQ+PejmWg1NvjVBBQt9ZyW8xgwKBgQDmdL7JoUDKhuXXQInp\nN/RRojlOMQX/z7CGsQpPe0SWVqP1wa1/yuOFhlywyug8KSPQTSjhQVF5ZeSNw08Z\nElw8S9DPlcAq2PAnwPptWnePqj1oP3/JiDwEcZvgX/6lBoT81gdIn+lXLqxuVyAd\nipE5iNs7XnvR5Bjr5k+9xfERwwKBgQDjv7+yQ5RydoNzloK+4BIQ7pVqdpnigsss\nhdt2u85jNVSuA/8r1t54IM//9PPbd1uOp8a8FOOxMcZQTkrPTA2HlFdm1NoOSRBI\nOjecVHazwwh7WaX36ehvRdgo+4AcQaxb6cspRZZfex7r1lS8kuqVEqX54LcWwEqM\nICEhPTEy8wKBgCeBzg880KGnnJFZJAtSJ1UzTUWlS9T94tJEWXMku65WLgd8a2Tk\nADssvIkmT8e4ecZE5AQxsWjxWcwftlii+CLyEFr13hq6U/lMsOG8R5Dea2aKtDp1\nW2ybmVBOxJW/116MxnThzRvACZlk4EGQNrM5TfQQj4N86fTO586tt1UHAoGBAIv5\ncsEGRftfmYT2EV9s6c2cRRrMz+FmT6cKkgrUfJF+2o+lBzSTd+HPEOeYTjQplI0F\n0uAP2q0yEVeT9uiXLo2Qf3NFCMvU3fv2Q+2B//6VtOXTAG1xRpj1DViK0n8LYfqP\no3y3NydxzVxXO3c2uJRshLQiB4UlI+whZxs9t7o/AoGASp4JA95txlUENlyA60gU\nR7etonohKl6ekExSt3p+1EdfozWGFu2+17AgO4eNFJCQ6jeT8XjoOfZEKhkN3E4q\nCiZj+Qcb/cbYZMyHiL5uqwhw5Cb2hbNUInWuin3TdyxvJFTBkfL+zwr7iFpZVZNj\n/b4qwAPKHdDCCO8/MMfQrGM=\n-----END PRIVATE KEY-----\n',
          client_email:
            'video-analysis-vortex@aglint-cloud-381414.iam.gserviceaccount.com',
          client_id: '114004803701651207924',
          universe_domain: 'googleapis.com',
        },
        scopes: ['https://www.googleapis.com/auth/cloud-platform'],
      },
    });

    const generativeVisionModel = vertexAI.getGenerativeModel({
      model: model,
      generationConfig: {
        temperature: 0.5,
        responseSchema: response_schema,
        responseMimeType: 'application/json',
      },
    });

    const request = {
      contents: [
        {
          role: 'user',
          parts: [
            {
              fileData: {
                fileUri: gcsUri, // Use GCS URI
                mimeType: 'video/webm',
              },
            },
            {
              text: `This is a interview for job ${jobTitle}. Analyze the video and audio content provided, focusing on empathy, communication, and professionalism. Return the results in structured JSON format with the following parameters:
  
                       1. "empathy_score" (number): A numerical rating from 0 to 10 reflecting the interviewee's empathy.
                       2. "sentiment" (object):
                         - "value" (string): The overall sentiment (e.g., "positive", "neutral", "negative").
                         - "confidence" (number): The confidence score for the sentiment analysis.
                       3. "clarity_score" (number): A numerical rating from 0 to 10 assessing the clarity of the interviewee's communication.
                       4. "professionalism" (number): A numerical rating from 0 to 10 evaluating the professionalism exhibited.
                       5. "stress_level" (string): An evaluation of the stress level (e.g., "low", "medium", "high").
                        - "confidence" (number): The confidence score for stress level analysis.
                       6. "body_language" (object):
                        - "eye_contact" (string): Assessment of eye contact (e.g., "consistent", "inconsistent").
                        - "smiling" (string): Frequency of smiling (e.g., "frequent", "rare").
                        - "gesture_use" (string): Use of gestures (e.g., "adequate", "excessive", "minimal").
                       7. "audio_analysis" (object):
                        - "tone" (string): Analysis of the tone of voice (e.g., "calm", "neutral", "anxious").
                        - "speech_speed" (string): Speed of speech (e.g., "slow", "medium", "fast").
                        - "pauses" (string): Frequency of pauses (e.g., "frequent", "minimal").
                       8. "confidence" (number): The overall confidence of this analysis.
  
                       Ensure the JSON is properly formatted and includes all the requested fields, even if some values are null.`,
            },
          ],
        },
      ],
    };

    // Call Vertex AI API
    const response = await generativeVisionModel.generateContent(request);
    const aggregatedResponse = await response.response;

    // Extract and return empathy score
    return aggregatedResponse?.candidates?.[0].content.parts[0].text
      ? JSON.parse(aggregatedResponse?.candidates?.[0].content.parts[0].text)
      : '';
  } catch (error) {
    throw new Error(`Error in Vertex AI request: ${error.message}`);
  }
}
