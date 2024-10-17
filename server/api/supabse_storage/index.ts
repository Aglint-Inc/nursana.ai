import { createTRPCRouter } from '../trpc';
import { uploadRecordedVideo } from './upload-recorded-video';

export const supabase_storage = createTRPCRouter({
  uploadRecordedVideo,
});
