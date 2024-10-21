import { Building2, Medal, School } from 'lucide-react';
import React from 'react';

import { useUserData } from '@/authenticated/hooks/useUserData';
import { Card, CardContent } from '@/components/ui/card';

import { ResumeFeedback } from './ResumeFeedback';

export interface ResumeData {
  basics: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    currentJobTitle: string;
    currentCompany: string;
    location: {
      city: string;
      state: string;
      country: string;
    };
    totalExperienceInMonths: number;
  };
  skills: string[];
  schools: Array<{
    degree: string;
    institution: string;
    field: string;
    start: { year: number; month: number };
    end: { year: number; month: number };
  }>;
  positions: Array<{
    title: string;
    org: string;
    location: string;
    start: { year: number; month: number };
    end: { year: number; month: number } | null;
    description: string;
  }>;
  certificates: Array<{
    title: string;
    issuingAuthority: string;
    dateObtained: { year: number; month: number };
  }>;
}

export function ResumeReview() {
  const userData = useUserData();
  const resumeData = userData?.resume?.structured_resume;
  const feedbackData = userData?.resume?.resume_feedback;

  // Type guard function to check if the data matches ResumeData structure
  const isResumeData = (obj: any): obj is ResumeData => {
    return obj && typeof obj === 'object' && 'basics' in obj;
  };

  if (!isResumeData(resumeData)) {
    return <div>Invalid resume data structure</div>;
  }

  const { basics, skills, schools, positions, certificates } = resumeData;
  console.log(resumeData);
  console.log(basics);
  console.log(skills);
  console.log(schools);
  console.log(positions);
  console.log(certificates);
  return (
    <>
      {feedbackData && <ResumeFeedback feedbackData={feedbackData} />}
      <Card>
        <CardContent className='flex flex-col gap-10 p-6'>
          <div>
            <h2 className='mb-4 text-sm text-muted-foreground'>
              Basic Information
            </h2>
            <div className='grid grid-cols-[200px_max-content_1fr] gap-4'>
              <div>Name</div>
              <div>:</div>
              <div className='font-medium'>
                {basics.firstName} {basics.lastName}
              </div>

              <div>Email</div>
              <div>:</div>
              <div className='font-medium'>{basics.email}</div>

              <div>Phone</div>
              <div>:</div>
              <div className='font-medium'>{basics.phone}</div>

              <div>Current Position</div>
              <div>:</div>
              <div className='font-medium'>
                {basics.currentJobTitle} at {basics.currentCompany}
              </div>

              <div>Location</div>
              <div>:</div>
              <div className='font-medium'>
                {basics.location.city}, {basics.location.state},{' '}
                {basics.location.country}
              </div>

              <div>Total Experience</div>
              <div>:</div>
              <div className='font-medium'>
                {' '}
                {Math.floor(
                  (basics.totalExperienceInMonths ?? 0) / 12,
                )} years {(basics.totalExperienceInMonths ?? 0) % 12} months
              </div>
            </div>
          </div>

          <div>
            <h2 className='mb-4 text-sm text-muted-foreground'>Skills</h2>
            <div className='flex flex-wrap gap-2'>
              {skills?.map((skill, index) => (
                <div key={index} className='rounded-md bg-secondary px-4 py-2'>
                  {skill}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className='mb-4 text-sm text-muted-foreground'>Education</h2>
            <div className='flex flex-col gap-4'>
              {schools?.map((school, index) => (
                <div
                  key={index}
                  className='grid grid-cols-[max-content_1fr] items-center gap-4'
                >
                  <div className='flex h-[72px] w-[72px] items-center justify-center rounded-md bg-secondary text-muted-foreground'>
                    <School strokeWidth={1.2} size={36} />
                  </div>
                  <div className='flex flex-col gap-0.5'>
                    <div className='text-md font-medium'>
                      {school.degree} in {school.field}
                    </div>
                    <div className='text-md'>{school.institution}</div>
                    <div className='text-sm text-muted-foreground'>
                      {new Date(
                        school.start.year,
                        school.start.month - 1,
                      ).toLocaleString('default', {
                        month: 'long',
                        year: 'numeric',
                      })}{' '}
                      -
                      {new Date(
                        school.end.year,
                        school.end.month - 1,
                      ).toLocaleString('default', {
                        month: 'long',
                        year: 'numeric',
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className='mb-4 text-sm text-muted-foreground'>
              Work Experience
            </h2>
            <div className='flex flex-col gap-4'>
              {positions?.map((position, index) => (
                <div
                  key={index}
                  className='grid grid-cols-[max-content_1fr] items-start gap-4'
                >
                  <div className='flex h-[50px] w-[50px] items-center justify-center rounded-md bg-secondary text-muted-foreground'>
                    <Building2 strokeWidth={1.2} size={28} />
                  </div>
                  <div className='flex flex-col gap-0.5'>
                    <div className='text-md font-medium'>
                      {position.title} at {position.org}
                    </div>
                    <div className='text-sm text-muted-foreground'>
                      {position.location}
                    </div>
                    <div className='text-sm'>
                      {new Date(
                        position.start.year,
                        position.start.month - 1,
                      ).toLocaleString('default', {
                        month: 'long',
                        year: 'numeric',
                      })}{' '}
                      -
                      {position.end
                        ? new Date(
                            position.end.year,
                            position.end.month - 1,
                          ).toLocaleString('default', {
                            month: 'long',
                            year: 'numeric',
                          })
                        : 'Present'}
                    </div>
                    <p className='mt-2 text-muted-foreground'>
                      {position.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className='mb-4 text-sm text-muted-foreground'>
              Certifications
            </h2>
            <div className='flex flex-col gap-4'>
              {certificates?.map((cert, index) => (
                <div
                  key={index}
                  className='grid grid-cols-[max-content_1fr] items-center gap-4'
                >
                  <div className='flex h-[50px] w-[50px] items-center justify-center rounded-md bg-secondary text-muted-foreground'>
                    <Medal strokeWidth={1.2} size={28} />
                  </div>
                  <div className='flex flex-col gap-0.5'>
                    <div className='text-md font-medium'>{cert.title}</div>
                    <div className='text-sm'>{cert.issuingAuthority}</div>
                    <div className='text-sm text-muted-foreground'>
                      Obtained:{' '}
                      {new Date(
                        cert.dateObtained.year,
                        cert.dateObtained.month - 1,
                      ).toLocaleString('default', {
                        month: 'long',
                        year: 'numeric',
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
