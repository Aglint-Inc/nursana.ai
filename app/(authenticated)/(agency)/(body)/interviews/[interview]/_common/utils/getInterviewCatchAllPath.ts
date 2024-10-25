const BASE_PATH = '^/interviews/.+?';

const RESUME_PATH = 'resume';
const REVIEW_PATH = 'review';
const TRANSCRIPT_PATH = 'transcript';

const RESUME_REGEX = new RegExp(`${BASE_PATH}/${RESUME_PATH}$`);
const REVIEW_REGEX = new RegExp(`${BASE_PATH}/${REVIEW_PATH}$`);
const TRANSCRIPT_REGEX = new RegExp(`${BASE_PATH}/${TRANSCRIPT_PATH}$`);

export const getInterviewCatchAllPath = (path: string) => {
  if (RESUME_REGEX.test(path)) return RESUME_PATH;
  if (REVIEW_REGEX.test(path)) return REVIEW_PATH;
  if (TRANSCRIPT_REGEX.test(path)) return TRANSCRIPT_PATH;
  return null;
};
