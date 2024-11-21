import { SupabaseClientType } from '@/utils/supabase/supabaseAdmin';
import { Storage } from '@google-cloud/storage';
import { VertexAI } from '@google-cloud/vertexai';
import { Readable } from 'stream';
import { response_schema, ResponseSchema } from './response-schema';
import { decrypt } from '@/utils/encrypt-decrypt';

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
    credentials: JSON.parse(
      decrypt(process.env.SERVICE_JSON_STORAGE, process.env.ENCRYPTION_KEY),
    ),
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
  fileExtension: string,
) {
  try {
    const vertexAI = new VertexAI({
      project: projectId,
      location: location,
      googleAuthOptions: {
        credentials: JSON.parse(
          decrypt(process.env.SERVICE_JSON_VERTEX, process.env.ENCRYPTION_KEY),
        ),
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
                mimeType: `video/${fileExtension}`,
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
    const response = (await generativeVisionModel.generateContent(request))
      .response;

    // Extract and return empathy score
    return {
      tokenUsage: response.usageMetadata,
      analysis: response?.candidates?.[0].content.parts[0].text
        ? (JSON.parse(
            response?.candidates?.[0].content.parts[0].text,
          ) as ResponseSchema)
        : null,
    };
  } catch (error) {
    throw new Error(`Error in Vertex AI request: ${error.message}`);
  }
}
