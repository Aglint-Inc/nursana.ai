import { SupabaseClientType } from '@/utils/supabase/supabaseAdmin';
import { Storage } from '@google-cloud/storage';
import { VertexAI } from '@google-cloud/vertexai';
import { Readable } from 'stream';
import { response_schema, ResponseSchema } from './response-schema';
import { decrypt } from '@/utils/encrypt-decrypt';
import { promptVideoAnalysis } from './promt';
import { DBTable } from '@/server/db/types';

export async function fetchAnalysis(
  db: SupabaseClientType,
  analysis_id: string,
) {
  const data = (
    await db
      .from('interview_analysis')
      .select('*')
      .eq('id', analysis_id)
      .single()
      .throwOnError()
  ).data;
  if (!data) throw new Error('Unable to fetch analysis_id');
  return data;
}

export const getSignedUrl = async (
  video_url: string,
  db: SupabaseClientType,
) => {
  const fileName = video_url?.split('/').pop();
  if (!fileName) throw new Error(`Video url doesnt exist`);

  const { data } = await db.storage
    .from('videos')
    .createSignedUrl('interviews/' + fileName, 60 * 10);

  if (!data?.signedUrl) throw new Error('Unable to fetch signed url');

  return data?.signedUrl;
};

export const saveAnalysisToDB = ({
  db,
  analysis_id,
  analysis_json,
  storage_uri,
}: {
  db: SupabaseClientType;
  analysis_id: string;
  analysis_json: any;
  storage_uri: string;
}) => {
  db.from('interview_analysis')
    .update({
      video_analysis: analysis_json,
      google_storage_uri: storage_uri,
    })
    .eq('id', analysis_id);
};

// upload to google cloud storage
export async function uploadToGCS({
  bucketName,
  destination,
  fileUrl, // supabase storage url
  projectId,
}: {
  projectId: string;
  fileUrl: string;
  bucketName: string;
  destination: string;
}): Promise<string> {
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

export async function sendMultiModalPromptWithVideo({
  fileExtension,
  gcsUri,
  jobTitle,
  location,
  model,
  projectId,
}: {
  projectId: string;
  location: string;
  model: string;
  gcsUri: string;
  jobTitle: string;
  fileExtension: string;
}) {
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
              text: promptVideoAnalysis(jobTitle),
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
