'use client';

import React, { useState } from 'react';

import { Loader } from '@/common/components/Loader';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { SidebarTrigger } from '@/components/ui/sidebar';

import { ApplicantsTable } from './../_common/components/ApplicantsTable';
import { CampaignForm } from './../_common/components/CampaignForm';
import { useCampaign } from './../_common/hooks/useCampaign';

const Campaign = () => {
  const { isLoading } = useCampaign();
  const [isEditing, setIsEditing] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  const mockCampaigns = [
    {
      id: '1',
      name: 'Summer Nurse Recruitment',
      status: 'active',
      description: 'Recruiting nurses for the summer season',
      applicants: [],
    },
    {
      id: '2',
      name: 'ICU Specialist Drive',
      status: 'active',
      description: 'Hiring ICU specialists for the new wing',
      applicants: [
        {
          id: 'a1',
          name: 'Emma Johnson',
          email: 'emma.johnson@example.com',
          status: 'new',
          jobTitle: 'ICU Nurse',
          city: 'Chicago',
          state: 'IL',
          zip: '60601',
          previousOrganization: 'Northwestern Memorial Hospital',
          school: 'University of Illinois at Chicago',
          licenses: ['RN', 'CCRN', 'ACLS'],
        },
        {
          id: 'a2',
          name: 'Michael Chen',
          email: 'michael.chen@example.com',
          status: 'interviewed',
          jobTitle: 'Critical Care Specialist',
          city: 'San Francisco',
          state: 'CA',
          zip: '94122',
          previousOrganization: 'UCSF Medical Center',
          school: 'University of California, San Francisco',
          licenses: ['RN', 'CCRN', 'ACLS', 'PALS'],
        },
        {
          id: 'a3',
          name: 'Sophia Rodriguez',
          email: 'sophia.rodriguez@example.com',
          status: 'offered',
          jobTitle: 'ICU Charge Nurse',
          city: 'Miami',
          state: 'FL',
          zip: '33101',
          previousOrganization: 'Jackson Memorial Hospital',
          school: 'University of Miami',
          licenses: ['RN', 'CCRN', 'ACLS', 'BLS'],
        },
        {
          id: 'a4',
          name: 'Aiden Patel',
          email: 'aiden.patel@example.com',
          status: 'rejected',
          jobTitle: 'ICU Staff Nurse',
          city: 'Houston',
          state: 'TX',
          zip: '77001',
          previousOrganization: 'Houston Methodist Hospital',
          school: 'Texas Womans University',
          licenses: ['RN', 'ACLS'],
        },
        {
          id: 'a5',
          name: 'Olivia Kim',
          email: 'olivia.kim@example.com',
          status: 'new',
          jobTitle: 'Cardiac ICU Nurse',
          city: 'Boston',
          state: 'MA',
          zip: '02108',
          previousOrganization: 'Massachusetts General Hospital',
          school: 'Boston College',
          licenses: ['RN', 'CCRN', 'ACLS', 'PALS', 'BLS'],
        },
        {
          id: 'a6',
          name: 'Ethan Brown',
          email: 'ethan.brown@example.com',
          status: 'interviewed',
          jobTitle: 'Neuro ICU Specialist',
          city: 'Seattle',
          state: 'WA',
          zip: '98101',
          previousOrganization: 'Harborview Medical Center',
          school: 'University of Washington',
          licenses: ['RN', 'CCRN', 'ACLS', 'SCRN'],
        },
        {
          id: 'a7',
          name: 'Ava Martinez',
          email: 'ava.martinez@example.com',
          status: 'new',
          jobTitle: 'Pediatric ICU Nurse',
          city: 'Phoenix',
          state: 'AZ',
          zip: '85001',
          previousOrganization: "Phoenix Children's Hospital",
          school: 'Arizona State University',
          licenses: ['RN', 'CCRN-K', 'PALS'],
        },
        {
          id: 'a8',
          name: 'Noah Taylor',
          email: 'noah.taylor@example.com',
          status: 'offered',
          jobTitle: 'Trauma ICU Nurse',
          city: 'Denver',
          state: 'CO',
          zip: '80201',
          previousOrganization: 'Denver Health Medical Center',
          school: 'University of Colorado Denver',
          licenses: ['RN', 'TCRN', 'ACLS', 'PALS'],
        },
        {
          id: 'a9',
          name: 'Isabella Wilson',
          email: 'isabella.wilson@example.com',
          status: 'interviewed',
          jobTitle: 'ICU Float Nurse',
          city: 'Atlanta',
          state: 'GA',
          zip: '30301',
          previousOrganization: 'Emory University Hospital',
          school: 'Emory University',
          licenses: ['RN', 'CCRN', 'ACLS', 'BLS'],
        },
        {
          id: 'a10',
          name: 'Liam Garcia',
          email: 'liam.garcia@example.com',
          status: 'new',
          jobTitle: 'ICU New Graduate Nurse',
          city: 'Las Vegas',
          state: 'NV',
          zip: '89101',
          previousOrganization: 'N/A',
          school: 'University of Nevada, Las Vegas',
          licenses: ['RN', 'BLS'],
        },
      ],
    },
    {
      id: '3',
      name: 'Pediatric Nurse Outreach',
      status: 'draft',
      description:
        "Reaching out to pediatric nurses for the children's hospital",
      applicants: [],
    },
    {
      id: '4',
      name: 'Rural Health Initiative',
      status: 'completed',
      description: 'Recruiting nurses for rural health centers',
      applicants: [],
    },
    {
      id: '5',
      name: 'Emergency Room Staffing',
      status: 'active',
      description: 'Urgent hiring for ER nurses',
      applicants: [],
    },
  ];

  const mockCampaign = mockCampaigns[1];

  if (isLoading) {
    return (
      <div className='flex h-full items-center justify-center'>
        <Loader />
      </div>
    );
  }

  const handleEditSubmit = (updatedCampaign: Partial<typeof mockCampaign>) => {
    // Here you would typically update the campaign data
    console.log('Updated campaign:', updatedCampaign);
    setIsEditing(false);
  };

  return (
    <div className='flex flex-col p-4'>
      <div className='flex flex-row justify-between gap-2'>
        <div className='flex flex-col items-center gap-2'>
          <h1 className='mb-4 text-xl font-bold'>
            <SidebarTrigger />
            {mockCampaign.name}{' '}
            <Badge variant='outline'>{mockCampaign.status}</Badge>
          </h1>
        </div>
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <Button variant='outline' size='sm'>
              Details
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>
                {isEditing ? 'Edit Campaign' : 'Campaign Details'}
              </SheetTitle>
            </SheetHeader>
            {isEditing ? (
              <CampaignForm
                isOpen={true}
                onClose={() => setIsEditing(false)}
                onSubmit={handleEditSubmit}
                campaign={mockCampaign}
              />
            ) : (
              <div className='mt-4 space-y-4'>
                <div>
                  <h3 className='font-semibold'>Name</h3>
                  <p>{mockCampaign.name}</p>
                </div>
                <div>
                  <h3 className='font-semibold'>Description</h3>
                  <p>{mockCampaign.description}</p>
                </div>
                <div>
                  <h3 className='font-semibold'>Status</h3>
                  <Badge variant='outline'>{mockCampaign.status}</Badge>
                </div>
                <Button onClick={() => setIsEditing(true)}>Edit</Button>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </div>
      {mockCampaign.applicants.length > 0 ? (
        <ApplicantsTable applicants={mockCampaign.applicants} />
      ) : (
        <p className='text-center text-muted-foreground'>
          No applicants yet for this campaign.
        </p>
      )}
    </div>
  );
};

export default Campaign;
