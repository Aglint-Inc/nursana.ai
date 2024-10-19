import {
  Award,
  Briefcase,
  FileText,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

import { type ResumeDetailsType } from '../types';

export default function ViewResume({
  data: resume,
}: {
  data: ResumeDetailsType;
}) {
  return (
    <Card className='w-full'>
      <CardHeader className='flex flex-row items-center gap-4'>
        <CardTitle>Resume Details</CardTitle>
      </CardHeader>
      <CardContent className='space-y-6'>
        <div>
          <h2 className='mb-2 text-lg font-semibold'>Basic Information</h2>
          <p className='text-lg'>
            {resume.basics.firstName} {resume.basics.lastName}
          </p>
          <p className='text-muted-foreground'>
            {resume.basics.currentJobTitle} at {resume.basics.currentCompany}
          </p>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
            <div className='flex items-center gap-2'>
              <Phone className='h-4 w-4' />
              <span>{resume.basics.phone}</span>
            </div>
            <div className='flex items-center gap-2'>
              <Mail className='h-4 w-4' />
              <span>{resume.basics.email}</span>
            </div>
            <div className='mt-2 flex items-center gap-2'>
              <MapPin className='h-4 w-4' />
              <span className='text-sm'>
                {resume.basics.location.city}, {resume.basics.location.state},{' '}
                {resume.basics.location.country}
              </span>
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h2 className='mb-2 text-lg font-semibold'>Skills</h2>
          <div className='flex flex-wrap gap-2'>
            {resume.skills.map((skill, index) => (
              <Badge key={index} variant='secondary'>
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        <Separator />

        <div>
          <h2 className='mb-2 text-lg font-semibold'>Work Experience</h2>
          <div className='space-y-4'>
            {resume.positions.map((position, index) => (
              <div
                key={index}
                className='border-b pb-4 last:border-b-0 last:pb-0'
              >
                <h3 className='flex items-center gap-2 font-semibold'>
                  <Briefcase className='h-4 w-4' />
                  {position.title} at {position.org}
                </h3>
                <p className='text-sm text-muted-foreground'>
                  {position.start.year} - {position.end.year} •{' '}
                  {position.location}
                </p>
                <p className='mt-2'>{position.description}</p>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div>
          <h2 className='mb-2 text-lg font-semibold'>Education</h2>
          <div className='space-y-4'>
            {resume.schools.map((school, index) => (
              <div key={index}>
                <h3 className='flex items-center gap-2 font-semibold'>
                  <GraduationCap className='h-4 w-4' />
                  {school.degree}
                </h3>
                <p className='text-sm text-muted-foreground'>
                  {school.institution} • {school.start.year} - {school.end.year}
                </p>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div>
          <h2 className='mb-2 text-lg font-semibold'>Certifications</h2>
          <div className='space-y-4'>
            {resume.certificates.map((cert, index) => (
              <div key={index}>
                <h3 className='flex items-center gap-2 font-semibold'>
                  <Award className='h-4 w-4' />
                  {cert.title}
                </h3>
                <p className='text-sm text-muted-foreground'>
                  {cert.issuingAuthority}
                </p>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div>
          <h2 className='mb-2 text-lg font-semibold'>Licenses</h2>
          <div className='space-y-4'>
            {resume.licenses.map((license, index) => (
              <div key={index}>
                <h3 className='flex items-center gap-2 font-semibold'>
                  <FileText className='h-4 w-4' />
                  {license.licenseType}
                </h3>
                <p className='text-sm text-muted-foreground'>
                  {license.issuingAuthority} • Issued: {license.issueDate.year}
                </p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
