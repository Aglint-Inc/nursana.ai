import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
  data: ResumeData;
}

export function ResumeReview({ data }: ResumeReviewProps) {
  // Type guard function to check if the data matches ResumeData structure
  const isResumeData = (obj: ResumeData): obj is ResumeData => {
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
          <dl className="grid grid-cols-2 gap-4">
            <div>
              <dt className="font-semibold">Name</dt>
              <dd>
                {basics?.firstName} {basics?.lastName}
              </dd>
            </div>
            <div>
              <dt className="font-semibold">Email</dt>
              <dd>{basics?.email}</dd>
            </div>
            <div>
              <dt className="font-semibold">Current Position</dt>
              <dd>
                {basics?.currentJobTitle} at {basics?.currentCompany}
              </dd>
            </div>
            <div>
              <dt className="font-semibold">Location</dt>
              <dd>
                {basics?.location?.city}, {basics?.location?.state},{" "}
                {basics?.location?.country}
              </dd>
            </div>
            <div className="col-span-2">
              <dt className="font-semibold">Total Experience</dt>
              <dd>
                {Math.floor((basics?.totalExperienceInMonths ?? 0) / 12)} years{" "}
                {(basics?.totalExperienceInMonths ?? 0) % 12} months
              </dd>
            </div>
          </dl>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills?.map((skill, index) => (
              <Badge key={index} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
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
