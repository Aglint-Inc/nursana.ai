import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export interface ResumeData {
  basics?: {
    firstName?: string;
    lastName?: string;
    email?: string;
    currentJobTitle?: string;
    currentCompany?: string;
    location?: {
      city?: string;
      state?: string;
      country?: string;
    };
    totalExperienceInMonths?: number;
  };
  skills?: string[];
  schools?: Array<{
    degree?: string;
    institution?: string;
    field?: string;
    end?: { year?: number; month?: number };
  }>;
  positions?: Array<{
    title?: string;
    org?: string;
    start?: { year?: number; month?: number };
    end?: { year?: number; month?: number } | null;
    description?: string;
  }>;
  certificates?: Array<{
    name?: string;
    institution?: string;
    date?: { year?: number; month?: number };
  }>;
}

interface ResumeReviewProps {
  data: any; // Change this to 'any' to accept any structure
}

export function ResumeReview({ data }: ResumeReviewProps) {
  // Type guard function to check if the data matches ResumeData structure
  const isResumeData = (obj: any): obj is ResumeData => {
    return obj && typeof obj === "object" && "basics" in obj;
  };

  if (!isResumeData(data)) {
    return <div>Invalid resume data structure</div>;
  }

  const { basics, skills, schools, positions, certificates } = data;

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
          <p>
            <strong>Name:</strong> {basics?.firstName} {basics?.lastName}
          </p>
          <p>
            <strong>Email:</strong> {basics?.email}
          </p>
          <p>
            <strong>Current Position:</strong> {basics?.currentJobTitle} at{" "}
            {basics?.currentCompany}
          </p>
          <p>
            <strong>Location:</strong> {basics?.location?.city},{" "}
            {basics?.location?.state}, {basics?.location?.country}
          </p>
          <p>
            <strong>Total Experience:</strong>{" "}
            {Math.floor((basics?.totalExperienceInMonths ?? 0) / 12)} years{" "}
            {(basics?.totalExperienceInMonths ?? 0) % 12} months
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Skills</h2>
          <ul className="list-disc pl-5">
            {skills?.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Education</h2>
          {schools?.map((school, index) => (
            <div key={index} className="mb-4">
              <p>
                <strong>{school.degree}</strong> in {school.field}
              </p>
              <p>{school.institution}</p>
              <p>
                Graduated: {school.end?.month}/{school.end?.year}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Work Experience</h2>
          {positions?.map((position, index) => (
            <div key={index} className="mb-4">
              <p>
                <strong>{position.title}</strong> at {position.org}
              </p>
              <p>
                {position.start?.month}/{position.start?.year} -{" "}
                {position.end
                  ? `${position.end.month}/${position.end.year}`
                  : "Present"}
              </p>
              <p>{position.description}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Certifications</h2>
          {certificates?.map((cert, index) => (
            <div key={index} className="mb-2">
              <p>
                <strong>{cert.name}</strong> - {cert.institution}
              </p>
              <p>
                Obtained: {cert.date?.month}/{cert.date?.year}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
