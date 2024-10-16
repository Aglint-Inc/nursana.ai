import { getLocation } from "./geoLocation";
import { parseJson } from "./jsonProcessing";

export async function processResumeToJson(resume_text: string) {
  try {
    const { result: json_resume } = await parseJson(resume_text || "");
    // get geolocation
    let location: Awaited<ReturnType<typeof getLocation>> | null = null;
    if (json_resume?.basics?.location) {
      try {
        location = await getLocation(
          `${json_resume?.basics?.location.city}, ${json_resume?.basics?.location.state}, ${json_resume?.basics?.location.country}`
        );
      } catch (e) {
        console.error("error in getting geolocation", e);
      }
    }
    const geoDataAndExp = {
      experience_in_months: json_resume?.basics?.totalExperienceInMonths,
      city: location?.city,
      state: location?.state,
      country: location?.country,
      geolocation: location?.geolocation,
    };
    return { geoDataAndExp, ...json_resume };
  } catch (error) {
    let errorMessage = "Internal Server Error at: parseJson.";
    if (typeof error === "string") {
      errorMessage = error.toUpperCase();
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    const temp = new Error(errorMessage);
    temp.name = "AI_ERROR";
    throw temp;
  }
}
