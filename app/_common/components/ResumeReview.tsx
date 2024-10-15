import React from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Building, Building2, Medal, School } from "lucide-react";

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
    <Card>
      <CardContent className="p-6 flex flex-col gap-10">
        <div>
          <h2 className="text-sm text-muted-foreground  mb-4">
            Basic Information
          </h2>
          <div className="grid grid-cols-[200px_max-content_1fr] gap-4">
            <div>Name</div>
            <div>:</div>
            <div className="font-medium">
              {basics?.firstName} {basics?.lastName}
            </div>

            <div>Email</div>
            <div>:</div>
            <div className="font-medium">{basics?.email}</div>

            <div>Current Position</div>
            <div>:</div>
            <div className="font-medium">
              {basics?.currentJobTitle} at {basics?.currentCompany}
            </div>

            <div>Location</div>
            <div>:</div>
            <div className="font-medium">
              {basics?.location?.city}, {basics?.location?.state},{" "}
              {basics?.location?.country}
            </div>

            <div>Total Experience</div>
            <div>:</div>
            <div className="font-medium">
              {" "}
              {Math.floor(
                (basics?.totalExperienceInMonths ?? 0) / 12
              )} years {(basics?.totalExperienceInMonths ?? 0) % 12} months
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-sm text-muted-foreground mb-4 ">Skills</h2>
          <div className="flex flex-wrap gap-2 ">
            {skills?.map((skill, index) => (
              <div key={index} className="bg-secondary px-4 py-2 rounded-md">
                {skill}
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-sm text-muted-foreground mb-4">Education</h2>
          <div className="flex flex-col gap-4">
            {schools?.map((school, index) => (
              <div
                key={index}
                className="grid grid-cols-[max-content_1fr] gap-4 items-center"
              >
                <div className="bg-secondary w-[72px] h-[72px] text-muted-foreground flex items-center justify-center rounded-md">
                  <School strokeWidth={1.2} size={36} />
                </div>
                <div className="flex flex-col gap-0.5">
                  <div className="text-md font-medium">
                    {school.degree} in {school.field}
                  </div>
                  <div className="text-md">{school.institution}</div>
                  <div className="text-sm text-muted-foreground">
                    Graduated on{" "}
                    {school.end?.month && school.end?.year
                      ? new Date(
                          school.end.year,
                          school.end.month - 1
                        ).toLocaleString("default", { month: "long" })
                      : ""}
                    ,{school.end?.year ?? ""}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm text-muted-foreground mb-4">
            Work Experience
          </h2>
          <div className="flex flex-col gap-4">
            {positions?.map((position, index) => (
              <div
                key={index}
                className="grid grid-cols-[max-content_1fr] gap-4 items-start"
              >
                <div className="bg-secondary w-[50px] h-[50px] text-muted-foreground flex items-center justify-center rounded-md">
                  <Building2 strokeWidth={1.2} size={28} />
                </div>
                <div className="flex flex-col gap-0.5">
                  <div className="text-md font-medium">
                    {position.title} at {position.org}
                  </div>
                  <div className="text-md ">
                  {position.start?.month && position.start?.year
    ? new Date(position.start.year, position.start.month - 1).toLocaleString('default', { month: 'long' })
    : ''} {position.start?.year ?? ''} -{" "}
  {position.end
    ? position.end.month && position.end.year
      ? `${new Date(position.end.year, position.end.month - 1).toLocaleString('default', { month: 'long' })} ${position.end.year}`
      : ''
    : "Present"}


                  </div>
                  <p className=" text-muted-foreground mt-2">
                    {position.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-sm text-muted-foreground mb-4">Certifications</h2>
          <div className="flex flex-col gap-4">
            {certificates?.map((cert, index) => (
              <div
                key={index}
                className="grid grid-cols-[max-content_1fr] gap-4 items-center"
              >
                <div className="bg-secondary w-[50px] h-[50px] text-muted-foreground flex items-center justify-center rounded-md">
                  <Medal strokeWidth={1.2} size={28} />
                </div>
                <div className="flex flex-col gap-0.5">
                  <div className="text-md font-medium">
                    {cert.name} - {cert.institution}
                  </div>
                  <div className="text-md text-muted-foreground">
                    {cert.date?.month}/{cert.date?.year}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
