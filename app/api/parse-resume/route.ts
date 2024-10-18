import { NextResponse } from "next/server";
import { z } from "zod";

import { createClient } from "@/utils/supabase/server";

// Define a Zod schema for the expected structured output
const ResumeSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  education: z.array(z.string()),
  experience: z.array(z.string()),
  skills: z.array(z.string()),
});

// Mock function to generate fake resume data and update Supabase
async function generateMockResumeData(resumeUrl: string, resumeId: string) {
  const supabase = createClient();

  const mockData = {
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "123-456-7890",
    education: [
      "Bachelor of Science in Nursing, University of Healthcare, 2015-2019",
      "Associate Degree in Nursing, Community College, 2013-2015",
    ],
    experience: [
      "Registered Nurse, City Hospital, 2019-Present",
      "Nursing Intern, Rural Clinic, Summer 2018",
    ],
    skills: [
      "Patient care",
      "Medical record management",
      "IV administration",
      "CPR certified",
      "Excellent communication skills",
    ],
  };

  try {
    console.log("Mock data:", mockData);
    console.log("Resume URL:", resumeUrl);
    console.log("Resume ID:", resumeId);
    // Validate the mock data against our schema
    const parsedOutput = ResumeSchema.parse(mockData);

    // Update the structured_resume column in the nurse_resumes table
    const { error: updateError } = await supabase
      .from("nurse_resumes")
      .update({
        structured_resume: parsedOutput,
        parsing_status: "completed",
      })
      .eq("id", resumeId);

    if (updateError) throw updateError;

    return parsedOutput;
  } catch (error) {
    console.error("Error generating mock data or updating database:", error);
    throw error;
  }
}

export async function POST(req: Request) {
  const { resumeUrl, resumeId } = await req.json();

  try {
    // Generate mock resume data and update Supabase
    const parsedOutput = await generateMockResumeData(resumeUrl, resumeId);

    return NextResponse.json({
      success: true,
      message: "Resume parsed successfully",
      data: parsedOutput,
    });
  } catch (error) {
    console.error("Error parsing resume:", error);

    const supabase = createClient();
    // Update the parsing_status to "failed" in case of an error
    await supabase
      .from("nurse_resumes")
      .update({
        parsing_status: "failed",
      })
      .eq("id", resumeId);

    return NextResponse.json(
      { success: false, message: "Failed to parse resume" },
      { status: 500 }
    );
  }
}
