import {
  HttpFunction,
  Request,
  Response,
} from "@google-cloud/functions-framework";

import { handleCalls } from "./preCall";
import { getResponse as getResponse, saveToDB } from "./utils";
import { processResumeToJson } from "./textToJson";

export const hello: HttpFunction = async (req: Request, res: Response) => {
  console.log("Request received", req.body);
  res.set("Access-Control-Allow-Origin", "*");
  if (req.method === "POST") {
    const {
      application_id,
      resume,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      retry = 0,
      update,
      test,
    } = req.body as {
      application_id: string;
      resume: string;
      retry: number;
      update?: boolean;
      test?: boolean;
    };
    if (!application_id || !resume) {
      return res.status(400).send(
        getResponse({
          error: `Invalid request. Required payload missing. ${JSON.stringify({
            application_id,
            resume,
          })}`,
          application_id,
        })
      );
    }
    // setToProcess(application_id, retry);
    try {
      const data = await handleCalls({
        application_id,
        resume,
        update,
        test: test || false,
      });
      const resume_text = data.resume_text;
      const json = !!resume_text
        ? await processResumeToJson(resume_text)
        : undefined;
      if (json) {
        await saveToDB({
          table: "resumes",
          data: { structured_resume: json },
          id: application_id,
        });
      }
      return res
        .status(200)
        .json(getResponse({ data: { resume_text, json }, application_id }));
    } catch (error) {
      let errorMessage = "Internal Server Error at: process_resume.";
      if (typeof error === "string") {
        errorMessage = error.toUpperCase();
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      console.error(errorMessage);
      return res
        .status(200)
        .json(getResponse({ error: errorMessage, application_id }));
    }
  } else if (req.method === "OPTIONS") {
    // Send response to OPTIONS requests
    res.set("Access-Control-Allow-Methods", "GET");
    res.set("Access-Control-Allow-Headers", "Content-Type");
    res.set("Access-Control-Max-Age", "3600");
    res.status(204).send("");
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).send(getResponse({ error: "Method Not Allowed!" }));
    return;
  }
};
