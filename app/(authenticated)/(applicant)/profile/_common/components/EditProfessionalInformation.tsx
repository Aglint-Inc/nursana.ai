'use client';

import { debouncedAsync } from 'lib/debouncedAsync';
import { useCallback, useState } from 'react';

import { Loader } from '@/app/components/Loader';
import {
  useProfessionalInfo,
  useUpdateProfessionalInfo,
} from '@/applicant/hooks/useUserData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { type RouterInputs, type RouterOutputs } from '@/trpc/client';

import { PROFFESSIONAL_SECTION } from '../constant';

type ApplicantUser = RouterOutputs['user']['professionalInfo'];
type UpdateFieldsType = RouterInputs['user']['professionalInfo']['update'];

type FieldsType = {
  [K in keyof UpdateFieldsType]-?: NonNullable<UpdateFieldsType[K]> extends
    | boolean
    | null
    | undefined
    ? boolean
    : NonNullable<UpdateFieldsType[K]>;
};

export default function EditProfessionalInformation() {
  const { data: userInfo, error, isLoading } = useProfessionalInfo();
  if (isLoading || !userInfo || error) {
    return (
      <div className='flex h-full w-full items-center justify-center'>
        <Loader />
      </div>
    );
  }

  return <FormSections userInfo={userInfo} />;
}

function FormSections({
  userInfo,
}: {
  userInfo: NonNullable<ApplicantUser['get']>;
}) {
  const [fields, setFields] = useState<FieldsType>({
    proffessional_titles: userInfo.proffessional_titles ?? '',
    licenced_year: userInfo.licenced_year ?? '',
    licensed_state: userInfo.licensed_state ?? '',
    malpractice_insurance: userInfo.malpractice_insurance ?? false,
    memberships: userInfo.memberships ?? [],
    npi_number: userInfo.npi_number ?? '',
    open_to_work: userInfo.open_to_work ?? false,
    patients_attend_per_week: userInfo.patients_attend_per_week ?? 0,
    preceptorship_interest: userInfo.preceptorship_interest ?? false,
    professional_highlight: userInfo.professional_highlight ?? '',
    salary_range: userInfo.salary_range ?? {},
    specialties: userInfo.specialties ?? [],
    virtues: userInfo.virtues ?? '',
    user_id: userInfo.id,
    certification_agency: userInfo.certification_agency ?? [],
    education_level: userInfo.education_level ?? '',
    employment_interest: userInfo.employment_interest ?? '',
    income_level: userInfo.income_level ?? '',
    licence_number: userInfo.licence_number ?? '',
  });
  const { updateProffessionalInfo } = useUpdateProfessionalInfo();

  // Create memoized debounced function
  const debouncedUpdate: (_updates: Partial<FieldsType>) => Promise<void> =
    useCallback(
      debouncedAsync(
        (updates: Partial<FieldsType>) =>
          updateProffessionalInfo({ ...updates, user_id: userInfo.id }),
        1000,
      ),
      [updateProffessionalInfo],
    ) as unknown as any;

  async function handleUpdateField(fields: Partial<FieldsType>) {
    setFields((p) => ({
      ...p,
      ...fields,
    }));
    await debouncedUpdate({
      ...fields,
    });
  }

  return (
    <Card className='mb-[200px] w-full bg-gray-50'>
      <CardHeader className='p-4'>
        <div className='flex flex-row items-center justify-between'>
          <CardTitle className='text-lg font-medium'>
            Edit Professional Information
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-2 gap-4'>
          <div className='col-span-2'>
            <Label>Proffessional Titles</Label>
            <div className='mt-2 flex flex-col'>
              <Input
                value={fields.proffessional_titles}
                id='first_name'
                placeholder={'RN, CN'}
                onChange={(e) => {
                  handleUpdateField({
                    proffessional_titles: e.target.value,
                  });
                }}
              />
            </div>
          </div>
          <div className='col-span-2'>
            <Label>Specialties</Label>
            <div className='mt-2 grid grid-cols-2 gap-4'>
              {PROFFESSIONAL_SECTION.SPECIALTIES.map((specialty) => (
                <div key={specialty.id} className='flex items-center gap-2'>
                  <Checkbox
                    id={`specialty-${specialty.id}`}
                    checked={fields.specialties.includes(specialty.name)}
                    onCheckedChange={(checked) => {
                      handleUpdateField({
                        specialties: checked
                          ? [...fields.specialties, specialty.name]
                          : fields.specialties.filter(
                              (s) => s !== specialty.name,
                            ),
                      });
                    }}
                  />
                  <Label htmlFor={`specialty-${specialty.id}`}>
                    {specialty.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          <div className='col-span-2'>
            <Label htmlFor='npi_number'>NPI Number</Label>
            <div className='relative mt-2'>
              <Input
                id='npi_number'
                placeholder='Enter your 10 digit NPI number'
                pattern='\d{10}'
                value={fields.npi_number ?? ''}
                onChange={(e) => {
                  handleUpdateField({
                    npi_number: e.target.value,
                  });
                }}
              />
            </div>
            <span className='mt-1 text-xs text-gray-500'>
              If you don&apos;t know your NPI number, you can look it up{' '}
              <a
                href='https://npiregistry.cms.hhs.gov/search'
                className='text-blue-500'
                target='_blank'
                rel='noopener noreferrer'
              >
                here
              </a>{' '}
              or leave this field blank. Please contact support at{' '}
              <a
                href='mailto:support@aglinthq.com'
                className='text-blue-500'
                target='_blank'
                rel='noopener noreferrer'
              >
                contact support
              </a>{' '}
              if you are having trouble finding or validating your number.
            </span>
          </div>
          <div className='col-span-1'>
            <Label>Year Licensed/Expected</Label>
            <div className='mt-2'>
              <Select
                value={fields.licenced_year ?? undefined}
                onValueChange={(value) => {
                  handleUpdateField({
                    licenced_year: value,
                  });
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select year' />
                </SelectTrigger>
                <SelectContent>
                  {Array.from(
                    { length: 50 },
                    (_, i) => new Date().getFullYear() - i,
                  ).map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className='col-span-1'>
            <Label>Education Level</Label>
            <div className='mt-2'>
              <Select
                value={fields.education_level ?? undefined}
                onValueChange={(value) => {
                  handleUpdateField({
                    education_level: value,
                  });
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select education level' />
                </SelectTrigger>
                <SelectContent>
                  {PROFFESSIONAL_SECTION.EDUCATION_LEVELS.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className='col-span-1'>
            <Label>License Number</Label>
            <div className='mt-2'>
              <Input
                placeholder='Enter license number'
                value={fields.licence_number ?? ''}
                onChange={(e) => {
                  handleUpdateField({
                    licence_number: e.target.value,
                  });
                }}
              />
            </div>
          </div>

          <div className='col-span-1'>
            <Label>State of Licensure</Label>
            <div className='mt-2'>
              <Select
                value={fields.licensed_state ?? undefined}
                onValueChange={(value) => {
                  handleUpdateField({
                    licensed_state: value,
                  });
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select state' />
                </SelectTrigger>
                <SelectContent>
                  {/* Add US states here */}
                  <SelectItem value='AL'>Alabama</SelectItem>
                  <SelectItem value='AK'>Alaska</SelectItem>
                  {/* ... add other states ... */}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className='col-span-2'>
            <Label>Certification Agencies</Label>
            <div className='mt-2 grid grid-cols-4 gap-4'>
              {PROFFESSIONAL_SECTION.CERTIFICATION_AGENCIES.map((agency) => (
                <div key={agency.id} className='flex items-center gap-2'>
                  <Checkbox
                    id={`agency-${agency.id}`}
                    checked={fields.certification_agency.includes(agency.label)}
                    onCheckedChange={(checked) => {
                      handleUpdateField({
                        certification_agency: checked
                          ? [...fields.certification_agency, agency.label]
                          : fields.certification_agency.filter(
                              (s) => s !== agency.label,
                            ),
                      });
                    }}
                  />
                  <Label htmlFor={`agency-${agency.id}`}>{agency.label}</Label>
                </div>
              ))}
            </div>
          </div>

          <div className='col-span-2'>
            <Label>Memberships</Label>
            <div className='mt-2 grid grid-cols-4 gap-4'>
              {[
                'AACN',
                'AANA',
                'AANN',
                'AAOHN',
                'AAPA',
                'AHNA',
                'AMSN',
                'ANA',
                'ANA District',
                'ANNA',
                'ANPD',
                'AONE',
                'AONL',
                'AORN',
                'APNA',
                'APRN',
                'ARIN',
                'ARN',
                'ASPAN',
                'ASPMN',
                'AVA',
                'CNLA',
                'CNS',
                'DDNA',
                'DNA',
                'ENA',
                'HPNA',
                'IAFN',
                'INS',
                'ITNS',
                'NACNS',
                'NAHN',
                'NANN',
                'NASN',
                'NBNA',
                'NLN',
                'NSNA',
                'ONS',
                'PCNA',
                'SGNA',
                'SNA',
                'STTI',
                'SUNA',
                'WOCN',
              ].map((membership) => (
                <div key={membership} className='flex items-center gap-2'>
                  <Checkbox
                    id={`membership-${membership}`}
                    checked={fields.memberships.includes(membership)}
                    onCheckedChange={(checked) => {
                      handleUpdateField({
                        memberships: checked
                          ? [...fields.memberships, membership]
                          : fields.memberships.filter((s) => s !== membership),
                      });
                    }}
                  />
                  <Label htmlFor={`membership-${membership}`}>
                    {membership}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className='col-span-2'>
            <Label>Do you buy your own malpractice insurance?</Label>
            <div className='mt-2 flex gap-4'>
              <div className='flex items-center gap-2'>
                <input
                  type='radio'
                  id='malpractice-yes'
                  name='malpractice'
                  checked={fields.malpractice_insurance}
                  onChange={(e) => {
                    handleUpdateField({
                      malpractice_insurance: e.target.checked,
                    });
                  }}
                />
                <Label htmlFor='malpractice-yes'>Yes</Label>
              </div>
              <div className='flex items-center gap-2'>
                <input
                  type='radio'
                  id='malpractice-no'
                  name='malpractice'
                  checked={!fields.malpractice_insurance}
                  onChange={(e) => {
                    handleUpdateField({
                      malpractice_insurance: !e.target.checked,
                    });
                  }}
                />
                <Label htmlFor='malpractice-no'>No</Label>
              </div>
            </div>
          </div>

          <div className='col-span-1'>
            <Label>Income level</Label>
            <div className='mt-2'>
              <Select
                value={fields.income_level ?? undefined}
                onValueChange={(value) => {
                  handleUpdateField({
                    income_level: value,
                  });
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select income level' />
                </SelectTrigger>
                <SelectContent>
                  {/* Add income levels here */}
                  <SelectItem value='50000'>$50,000</SelectItem>
                  <SelectItem value='100000'>$100,000</SelectItem>
                  {/* ... add other income levels ... */}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className='col-span-1'>
            <Label>How many patients do you see weekly?</Label>
            <div className='mt-2'>
              <Input
                value={fields.patients_attend_per_week ?? ''}
                onChange={(e) => {
                  handleUpdateField({
                    patients_attend_per_week: Number(e.target.value),
                  });
                }}
                type='number'
                placeholder='Enter number'
              />
            </div>
          </div>

          <div className='col-span-2'>
            <Label>
              Are you currently offering or interested in offering a
              preceptorship?
            </Label>
            <div className='mt-2 flex gap-4'>
              <div className='flex items-center gap-2'>
                <input
                  type='radio'
                  id='preceptorship-yes'
                  name='preceptorship'
                  checked={fields.preceptorship_interest}
                  onChange={(e) => {
                    handleUpdateField({
                      preceptorship_interest: e.target.checked,
                    });
                  }}
                />
                <Label htmlFor='preceptorship-yes'>Yes</Label>
              </div>
              <div className='flex items-center gap-2'>
                <input
                  type='radio'
                  id='preceptorship-no'
                  name='preceptorship'
                  checked={!fields.preceptorship_interest}
                  onChange={(e) => {
                    handleUpdateField({
                      preceptorship_interest: !e.target.checked,
                    });
                  }}
                />
                <Label htmlFor='preceptorship-no'>No</Label>
              </div>
            </div>
          </div>

          <div className='col-span-2'>
            <Label>Are you interested in employment opportunities?</Label>
            <div className='mt-2 flex gap-4'>
              <div className='flex items-center gap-2'>
                <input
                  type='radio'
                  id='employment-yes'
                  name='employment'
                  checked={fields.open_to_work}
                  onChange={(e) => {
                    handleUpdateField({
                      open_to_work: e.target.checked,
                    });
                  }}
                />
                <Label htmlFor='employment-yes'>Yes</Label>
              </div>
              <div className='flex items-center gap-2'>
                <input
                  type='radio'
                  id='employment-no'
                  name='employment'
                  checked={!fields.open_to_work}
                  onChange={(e) => {
                    handleUpdateField({
                      open_to_work: !e.target.checked,
                    });
                  }}
                />
                <Label htmlFor='employment-no'>No</Label>
              </div>
            </div>
          </div>

          <div className='col-span-2'>
            <Label>Favorite thing about my profession</Label>
            <div className='mt-2'>
              <Textarea
                value={fields.professional_highlight ?? ''}
                onChange={(e) => {
                  handleUpdateField({
                    professional_highlight: e.target.value,
                  });
                }}
              />
            </div>
          </div>
          <div className='col-span-2'>
            <Label>Professional achievements</Label>
            <div className='mt-2'>
              <Textarea
                value={fields.employment_interest ?? ''}
                onChange={(e) => {
                  handleUpdateField({
                    employment_interest: e.target.value,
                  });
                }}
              />
            </div>
          </div>
          <div className='col-span-2'>
            <Label>Virtues</Label>
            <div className='mt-2'>
              <Textarea
                value={fields.virtues ?? ''}
                onChange={(e) => {
                  handleUpdateField({
                    virtues: e.target.value,
                  });
                }}
                placeholder='Enter your favorite thing'
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
