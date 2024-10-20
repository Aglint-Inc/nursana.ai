'use client';

import { Plus } from 'lucide-react';
import React from 'react';

import { Button } from '@/components/ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInput,
} from '@/components/ui/sidebar';

// Mock data for campaigns
const mockCampaigns = [
  {
    id: '1',
    name: 'Summer Nurse Recruitment',
    status: 'active',
    description: 'Recruiting nurses for the summer season',
  },
  {
    id: '2',
    name: 'ICU Specialist Drive',
    status: 'active',
    description: 'Hiring ICU specialists for the new wing',
  },
  {
    id: '3',
    name: 'Pediatric Nurse Outreach',
    status: 'draft',
    description: "Reaching out to pediatric nurses for the children's hospital",
  },
  {
    id: '4',
    name: 'Rural Health Initiative',
    status: 'completed',
    description: 'Recruiting nurses for rural health centers',
  },
  {
    id: '5',
    name: 'Emergency Room Staffing',
    status: 'active',
    description: 'Urgent hiring for ER nurses',
  },
];

export function CampaignSidebar() {
  return (
    <>
      <Sidebar collapsible='none' className='hidden flex-1 md:flex'>
        <SidebarHeader className='gap-3.5 border-b p-4'>
          <div className='flex w-full items-center justify-between'>
            <div className='text-base font-medium text-foreground'>
              Campaigns
            </div>
            <Button variant='outline' size='icon'>
              <Plus />
            </Button>
          </div>
          <SidebarInput placeholder='Type to search...' />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup className='px-0'>
            <SidebarGroupContent>
              {mockCampaigns.map((campaign) => (
                <a
                  href={`/campaign/${campaign.id}`}
                  key={campaign.id}
                  className='hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex flex-col items-start gap-2 whitespace-nowrap border-b p-4 text-sm leading-tight last:border-b-0'
                >
                  <div className='flex w-full items-center gap-2'>
                    <span>{campaign.name}</span>{' '}
                    <span
                      className={`ml-auto text-xs ${getStatusColor(campaign.status)}`}
                    >
                      {campaign.status}
                    </span>
                  </div>
                  <span className='line-clamp-2 w-[260px] whitespace-break-spaces text-xs'>
                    {campaign.description}
                  </span>
                </a>
              ))}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </>
  );
}

// Helper function to get status color
function getStatusColor(status: string): string {
  switch (status) {
    case 'active':
      return 'text-green-500';
    case 'draft':
      return 'text-yellow-500';
    case 'completed':
      return 'text-blue-500';
    default:
      return 'text-gray-500';
  }
}
