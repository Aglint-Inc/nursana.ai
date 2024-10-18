import axios from 'axios';
import dotenv from 'dotenv';

import { getImageToText } from './ocr';

dotenv.config();

const resume_to_text_v1 = process.env.RESUME_TO_TEXT;

if (!resume_to_text_v1) {
  throw new Error('resume_to_text_v1 environment variables are required.');
}

type ErrorType =
  | 'SYSTEM_ERROR'
  | 'UNSUPPORTED_FORMAT'
  | 'URL_ERROR'
  | 'TEXT_EXTRACTION_FAILED'
  | 'TEXT_TO_IMAGE_FAILED';

export const handlerResumeToText = async (
  url: string,
): Promise<{
  resume_text?: string;
  error?: string;
  errorType?: ErrorType;
}> => {
  const { text, error, errorType } = await axios
    .post(resume_to_text_v1, { url })
    .then(async ({ data }) => {
      const { text, images, error, error_type } = data as unknown as {
        text: string | null;
        images: string[] | null;
        error: string | null;
        error_type: ErrorType | null;
      };
      if (error) {
        return { text: null, error, errorType: error_type };
      }
      if (images) {
        const { imageText, imageError } = await getImageToText(images).catch(
          (error) => {
            return { imageText: null, imageError: String(error) };
          },
        );
        return {
          text: imageText,
          error: imageError,
          errorType: 'TEXT_EXTRACTION_FAILED',
        };
      }
      return { text, error, errorType: error_type };
    })
    .catch((error) => {
      let errorMassage = 'Resume to text:';
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        errorMassage +=
          'API Server Error with status: ' + error.response.status;
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser
        // and an instance of http.ClientRequest in node.js
        errorMassage +=
          'On response from API Server(Api server may be not running)';
      } else {
        // Something happened in setting up the request that triggered an Error
        errorMassage += error.message;
      }
      const temp = new Error(errorMassage);
      temp.name = 'SYSTEM_ERROR';
      throw temp;
    });
  if (error) {
    console.log('Error: ', error, 'type:', errorType);
    const tempError = new Error(error);
    tempError.name = errorType || 'SYSTEM_ERROR';
    throw tempError;
  }
  return { resume_text: text! };
};
