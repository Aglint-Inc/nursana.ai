import { type NextRequest, NextResponse } from 'next/server';

import { getSupabaseAdminServer } from '@/utils/supabase/supabaseAdmin';

import {
  fetchAnalysis,
  getSignedUrl,
  sendMultiModalPromptWithVideo,
  uploadToGCS,
} from './utils';

const bucketName = 'video-analysis-interview';
const model = 'gemini-1.5-flash-001';
const location = 'us-central1';

interface Request {
  analysis_id: string;
}

export async function POST(request: NextRequest) {
  const db = getSupabaseAdminServer();

  try {
    const { analysis_id } = (await request.json()) as Request;
    if (!analysis_id) throw new Error(`analysis_id doesnt exist`);
    const resAnalysis = await fetchAnalysis(db, analysis_id);
    if (!resAnalysis.video_url) throw new Error(`video url doesnt exist`);

    let gcsUri: string;
    const fileExtension = resAnalysis.video_url.split('.').pop() || 'webm';

    const signedUrl = await getSignedUrl(resAnalysis.video_url, db);

    // Step 1: Upload file to Google Cloud Storage
    if (!resAnalysis.google_storage_uri) {
      gcsUri = await uploadToGCS({
        projectId: 'aglint-cloud-381414',
        fileUrl: signedUrl,
        bucketName: bucketName,
        destination: analysis_id,
      });
    } else {
      gcsUri = resAnalysis.google_storage_uri;
    }

    // Step 2: Call Vertex AI with the GCS URI
    const analysis = await sendMultiModalPromptWithVideo({
      fileExtension,
      gcsUri,
      jobTitle: 'Registered nurse',
      model,
      location,
      projectId: 'aglint-cloud-381414',
    });

    return NextResponse.json(
      { ...analysis, signedUrl, gcsUri },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
