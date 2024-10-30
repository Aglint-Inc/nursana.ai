import {
  Award,
  Briefcase,
  Building2,
  Calendar,
  ExternalLink,
  FileText,
  Mail,
  MapPin,
  Phone,
  School,
  User,
} from 'lucide-react';
import Link from 'next/link';

import { useUserData } from '@/applicant/hooks/useUserData';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useBucket } from '@/hooks/use-bucket';

import { type ResumeDetailsType } from '../types';

export default function ViewResume() {
  const { resume: data } = useUserData();
  const resume = data?.structured_resume as ResumeDetailsType;
  const userData = useUserData();

  const file_url = userData?.resume?.file_url || '';

  const resumeBucketName = 'resumes';
  const fileName = file_url?.split(`${resumeBucketName}/`).pop() ?? '';
  const { data: resumeUrl } = useBucket(resumeBucketName, fileName);

  return (
    <div className='flex w-full flex-col gap-8'>
      <div className='flex flex-col gap-4'>
        <div className='text-xl font-medium'>Resume</div>

        {!userData?.resume?.error_status && resumeUrl ? (
          <Link href={resumeUrl} rel='noopener noreferrer' target='_blank'>
            <Card className='group border-border shadow-none duration-300 hover:bg-muted'>
              <CardContent className='p-4'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center'>
                    <FileText
                      className='mr-2 h-6 w-6 text-muted-foreground'
                      strokeWidth={1}
                    />
                    <div className='flex items-center'>View my resume</div>
                  </div>
                  <div className='group relative'>
                    <ExternalLink className='mr-4 h-4 w-4' />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ) : null}
        <div className='flex flex-col gap-4 rounded-lg bg-muted p-4'>
          <div className='flex items-center gap-4'>
            <Avatar className='rounded-md'>
              <AvatarFallback className='flex h-10 w-10 items-center justify-center rounded-md bg-muted-foreground text-background'>
                <User />
              </AvatarFallback>
            </Avatar>
            <h2 className='text-lg font-medium'>
              {resume.basics.firstName} {resume.basics.lastName}
            </h2>
          </div>

          <div className='grid grid-cols-1 gap-2'>
            <div className='flex items-center gap-2'>
              <Briefcase className='h-4 w-4' />
              <span>
                {resume.basics.currentJobTitle ? (
                  resume.basics.currentJobTitle
                ) : (
                  <div className='italic text-muted-foreground'>no data</div>
                )}{' '}
                at{' '}
                {resume.basics.currentCompany ? (
                  resume.basics.currentCompany
                ) : (
                  <em>no data</em>
                )}
              </span>
            </div>
            <div className='flex items-center gap-2'>
              <Phone className='h-4 w-4' />
              <span>
                {resume.basics.phone ? (
                  resume.basics.phone
                ) : (
                  <div className='italic text-muted-foreground'>no data</div>
                )}
              </span>
            </div>
            <div className='flex items-center gap-2'>
              <Mail className='h-4 w-4' />
              <span>
                {resume.basics.email ? (
                  resume.basics.email
                ) : (
                  <div className='italic text-muted-foreground'>no data</div>
                )}
              </span>
            </div>
            <div className='flex items-center gap-2'>
              <MapPin className='h-4 w-4' />
              <span className='text-sm'>
                {resume.basics.location.city ||
                resume.basics.location.state ||
                resume.basics.location.country ? (
                  <>
                    {resume.basics.location.city || (
                      <div className='italic text-muted-foreground'>
                        no data
                      </div>
                    )}
                    ,{' '}
                    {resume.basics.location.state || (
                      <div className='italic text-muted-foreground'>
                        no data
                      </div>
                    )}
                    ,{' '}
                    {resume.basics.location.country || (
                      <div className='italic text-muted-foreground'>
                        no data
                      </div>
                    )}
                  </>
                ) : (
                  <div className='italic text-muted-foreground'>no data</div>
                )}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className='text-md mb-3 font-medium'>Skills</h2>
        <div className='flex flex-wrap gap-2'>
          {resume.skills && resume.skills.length > 0 ? (
            resume.skills.map((skill, index) => (
              <Badge
                key={index}
                variant='secondary'
                className='text-md rounded-sm font-normal'
              >
                {skill}
              </Badge>
            ))
          ) : (
            <p className='text-sm text-muted-foreground'>No skills found</p>
          )}
        </div>
      </div>

      <div>
        <h2 className='text-md mb-3 font-medium'>Work Experience</h2>
        <div className='flex flex-col gap-6'>
          {resume.positions && resume.positions.length > 0 ? (
            resume.positions.map((position, index) => (
              <div key={index}>
                <div className='grid grid-cols-[max-content_1fr] items-center gap-4'>
                  <div className='flex h-14 w-14 items-center justify-center rounded-md bg-muted'>
                    <Building2
                      className='h-6 w-6 text-muted-foreground'
                      strokeWidth={1.5}
                    />
                  </div>
                  <div className='flex flex-col gap-1'>
                    <div className='text-md'>{position.title}</div>
                    <div className='flex items-center gap-4 text-sm text-muted-foreground'>
                      <div className='flex items-center gap-2'>
                        <Calendar size={16} strokeWidth={1.5} />
                        <p>
                          {position.start?.year
                            ? position.start.year
                            : 'Start date not found'}{' '}
                          -{' '}
                          {position.end?.year
                            ? position.end.year
                            : 'End date not found'}
                        </p>
                      </div>
                      <div className='flex items-center gap-2'>
                        <MapPin size={16} strokeWidth={1.5} />
                        <p>{position.location ? position.location : '---'}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {position.description ? (
                  <p className='mt-2'>{position.description}</p>
                ) : (
                  <p className='mt-2 text-sm text-muted-foreground'>
                    No description found
                  </p>
                )}
              </div>
            ))
          ) : (
            <p className='italic text-muted-foreground'>No experience found</p>
          )}
        </div>
      </div>

      <div>
        <h2 className='text-md mb-3 font-medium'>Education</h2>
        <div className='flex flex-col gap-6'>
          {resume.schools && resume.schools.length > 0 ? (
            resume.schools.map((school, index) => (
              <div key={index}>
                <div className='grid grid-cols-[max-content_1fr] items-center gap-4'>
                  <div className='flex h-14 w-14 items-center justify-center rounded-md bg-muted'>
                    <School
                      className='h-6 w-6 text-muted-foreground'
                      strokeWidth={1.5}
                    />
                  </div>
                  <div className='flex flex-col gap-1'>
                    <div className='text-md'>{school.degree}</div>
                    <div className='flex items-center gap-4 text-sm text-muted-foreground'>
                      <div className='flex items-center gap-2'>
                        <Calendar size={16} strokeWidth={1.5} />
                        <p>
                          {school.start?.year
                            ? school.start.year
                            : 'Start date not found'}{' '}
                          -{' '}
                          {school.end?.year
                            ? school.end.year
                            : 'End date not found'}
                        </p>
                      </div>
                      <div className='flex items-center gap-2'>
                        <MapPin size={16} strokeWidth={1.5} />
                        <p>{school.institution ? school.institution : '---'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className='text-sm text-muted-foreground'>No education found</p>
          )}
        </div>
      </div>

      <div>
        <h2 className='text-md mb-3 font-medium'>Certifications</h2>
        <div className='flex flex-col gap-4'>
          {resume.certificates && resume.certificates.length > 0 ? (
            resume.certificates.map((cert, index) => (
              <div key={index}>
                <div className='grid grid-cols-[max-content_1fr] items-center gap-4'>
                  <div className='flex h-14 w-14 items-center justify-center rounded-md bg-muted'>
                    <Award
                      className='h-6 w-6 text-muted-foreground'
                      strokeWidth={1.5}
                    />
                  </div>
                  <div className='flex flex-col gap-1'>
                    <div className='text-md'>{cert.title || '---'}</div>
                    <div className='flex items-center gap-4 text-sm text-muted-foreground'>
                      <div className='flex items-center gap-2'>
                        <Calendar size={16} strokeWidth={1.5} />
                        <p>
                          {cert.dateObtained
                            ? `${cert.dateObtained.year || '---'}-${cert.dateObtained.month || '---'}`
                            : '---'}
                        </p>
                      </div>
                      <div className='flex items-center gap-2'>
                        <Building2 size={16} strokeWidth={1.5} />
                        <p>{cert.issuingAuthority || '---'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className='text-sm text-muted-foreground'>No awards found</p>
          )}
        </div>
      </div>

      <div>
        <h2 className='text-md mb-3 font-medium'>Licenses</h2>
        <div className='flex flex-col gap-4'>
          {resume.licenses && resume.licenses.length > 0 ? (
            resume.licenses.map((license, index) => (
              <div key={index}>
                <div className='grid grid-cols-[max-content_1fr] items-center gap-4'>
                  <div className='flex h-14 w-14 items-center justify-center rounded-md bg-muted'>
                    <Award
                      className='h-6 w-6 text-muted-foreground'
                      strokeWidth={1.5}
                    />
                  </div>
                  <div className='flex flex-col gap-1'>
                    <div className='text-md'>
                      {license.licenseType || '---'}
                    </div>
                    <div className='flex items-center gap-4 text-sm text-muted-foreground'>
                      <div className='flex items-center gap-2'>
                        <Calendar size={16} strokeWidth={1.5} />
                        <p>
                          {license.issueDate
                            ? `${license.issueDate.year || '---'}-${license.issueDate.month || '---'}`
                            : '---'}
                        </p>
                      </div>
                      <div className='flex items-center gap-2'>
                        <Building2 size={16} strokeWidth={1.5} />
                        <p>{license.issuingAuthority || '---'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className='text-sm text-muted-foreground'>No license found</p>
          )}
        </div>
      </div>
    </div>
  );
}
