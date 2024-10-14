import axios from "axios";
import dotenv from "dotenv";
import { getImageToText } from "./ocr";

dotenv.config();

const resume_to_text_v1 = process.env.RESUME_TO_TEXT;

if (!resume_to_text_v1) {
  throw new Error("resume_to_text_v1 environment variables are required.");
}

export const handleCalls = async ({
  application_id,
  resume,
  test,
}: {
  application_id: string;
  resume: string;
  update?: boolean;
  test: boolean;
}) => {
  return await handlerResumeToText({
    url: resume,
    application_id,
    test,
  });
};

const handlerResumeToText = async ({
  url,
}: {
  url: string;
  application_id: string;
  test: boolean;
}) => {
  const { text, error } = await axios
    .post(resume_to_text_v1, { url })
    .then(({ data }) => {
      return data as unknown as {
        text: string | null;
        images: string[] | null;
        error: string | null;
      };
    })
    .then(
      async ({
        text,
        images,
        error,
      }: {
        text: string | null;
        images: string[] | null;
        error: string | null;
      }) => {
        if (error) {
          return { text: null, error };
        }
        if (images) {
          const { imageText, imageError } = await getImageToText(images).catch(
            (error) => {
              return { imageText: null, imageError: String(error) };
            }
          );
          return { text: imageText, error: imageError };
        }
        return { text, error };
      }
    )
    .catch((error) => {
      let errorMassage = "Resume to text v1: ";
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        errorMassage +=
          "API Server Error with status: " + error.response.status;
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser
        // and an instance of http.ClientRequest in node.js
        errorMassage +=
          "On response from API Server(Api server may be not running)";
      } else {
        // Something happened in setting up the request that triggered an Error
        errorMassage += error.message;
      }
      throw new Error(errorMassage);
    });
  if (error) {
    throw new Error(error);
  }
  return { resume_text: text };
};
