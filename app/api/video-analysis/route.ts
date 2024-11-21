import { getSupabaseAdminServer } from '@/utils/supabase/supabaseAdmin';
import { type NextRequest, NextResponse } from 'next/server';
import {
  fetchAnalysis,
  sendMultiModalPromptWithVideo,
  uploadToGCS,
} from './utils';
import { decrypt, encrypt } from '@/utils/encrypt-decrypt';

const bucketName = 'video-analysis-interview';

type Request = {
  analysis_id: string;
};

export async function POST(request: NextRequest) {
  const db = getSupabaseAdminServer();

  try {
    const { analysis_id } = (await request.json()) as Request;
    if (!analysis_id) throw new Error(`analysis_id doesnt exist`);
    const resAnalysis = await fetchAnalysis(db, analysis_id);

    const fileName = resAnalysis?.video_url?.split('/').pop();
    if (!fileName) throw new Error(`Video url doesnt exist`);

    const { data } = await db.storage
      .from('videos')
      .createSignedUrl('interviews/' + fileName, 60 * 10);

    if (!data?.signedUrl) throw new Error('Unable to fetch signed ur;');

    // Step 1: Upload file to Google Cloud Storage
    const gcsUri = await uploadToGCS(
      'aglint-cloud-381414',
      data?.signedUrl,
      bucketName,
      analysis_id,
    );

    // Step 2: Call Vertex AI with the GCS URI
    const analysis = await sendMultiModalPromptWithVideo(
      'aglint-cloud-381414', // Replace with your project ID
      'us-central1',
      'gemini-1.5-flash-001',
      gcsUri,
      'Registered nurse',
    );

    return NextResponse.json(
      { signedUrl: data?.signedUrl, googleStorageUri: gcsUri, analysis },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
