'use client';

import { Search } from 'lucide-react';

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

import { PROFFESSIONAL_SECTION } from '../constant';

export default function EditProfessionalInformation() {
  //
  //
  //
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
                value={''}
                id='first_name'
                placeholder={'RN, CN'}
                onChange={(e) => {
                  // setFirstName(e.target.value);
                }}
              />
            </div>
          </div>
          <div className='col-span-2'>
            <Label>Specialties</Label>
            <div className='mt-2 grid grid-cols-2 gap-4'>
              {PROFFESSIONAL_SECTION.SPECIALTIES.map((specialty) => (
                <div key={specialty.id} className='flex items-center gap-2'>
                  <Checkbox id={`specialty-${specialty.id}`} />
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
              />
              <Search className='absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-500' />
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
              <Select>
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
              <Select>
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
              <Input placeholder='Enter license number' />
            </div>
          </div>

          <div className='col-span-1'>
            <Label>State of Licensure</Label>
            <div className='mt-2'>
              <Select>
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
                  <Checkbox id={`agency-${agency.id}`} />
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
                  <Checkbox id={`membership-${membership}`} />
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
                <input type='radio' id='malpractice-yes' name='malpractice' />
                <Label htmlFor='malpractice-yes'>Yes</Label>
              </div>
              <div className='flex items-center gap-2'>
                <input type='radio' id='malpractice-no' name='malpractice' />
                <Label htmlFor='malpractice-no'>No</Label>
              </div>
            </div>
          </div>

          <div className='col-span-1'>
            <Label>Income level</Label>
            <div className='mt-2'>
              <Select>
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
              <Input type='number' placeholder='Enter number' />
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
                />
                <Label htmlFor='preceptorship-yes'>Yes</Label>
              </div>
              <div className='flex items-center gap-2'>
                <input
                  type='radio'
                  id='preceptorship-no'
                  name='preceptorship'
                />
                <Label htmlFor='preceptorship-no'>No</Label>
              </div>
            </div>
          </div>

          <div className='col-span-2'>
            <Label>Are you interested in employment opportunities?</Label>
            <div className='mt-2 flex gap-4'>
              <div className='flex items-center gap-2'>
                <input type='radio' id='employment-yes' name='employment' />
                <Label htmlFor='employment-yes'>Yes</Label>
              </div>
              <div className='flex items-center gap-2'>
                <input type='radio' id='employment-no' name='employment' />
                <Label htmlFor='employment-no'>No</Label>
              </div>
            </div>
          </div>

          <div className='col-span-2'>
            <Label>Favorite thing about my profession</Label>
            <div className='mt-2'>
              <Textarea placeholder='Enter your favorite thing' />
            </div>
          </div>
          <div className='col-span-2'>
            <Label>Professional achievements</Label>
            <div className='mt-2'>
              <Textarea placeholder='Enter your favorite thing' />
            </div>
          </div>
          <div className='col-span-2'>
            <Label>Virtues</Label>
            <div className='mt-2'>
              <Textarea placeholder='Enter your favorite thing' />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
