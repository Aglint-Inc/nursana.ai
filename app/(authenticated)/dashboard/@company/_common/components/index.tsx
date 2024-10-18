/* eslint-disable jsx-a11y/label-has-associated-control */
'use client';

import { X } from 'lucide-react';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function HospitalHomePage() {
  const [openPositions, setOpenPositions] = useState([
    'Pediatric Nurse',
    'Critical Care Nurse',
    'Registered Nurse',
  ]);
  const [departments, setDepartments] = useState([
    'Emergency',
    'Pediatrics',
    'Surgery',
  ]);

  const removePosition = (position: string) => {
    setOpenPositions(openPositions.filter((p) => p !== position));
  };

  const removeDepartment = (department: string) => {
    setDepartments(departments.filter((d) => d !== department));
  };

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
        <div className='md:col-span-2'>
          <Card className='mb-6'>
            <CardContent className='p-4'>
              <h2 className='mb-4 text-xl font-semibold'>
                Recent Applications
              </h2>
              <Tabs defaultValue='all'>
                <TabsList className='mb-4'>
                  <TabsTrigger value='all'>All</TabsTrigger>
                  <TabsTrigger value='new'>New</TabsTrigger>
                  <TabsTrigger value='reviewed'>Reviewed</TabsTrigger>
                </TabsList>
                <TabsContent value='all'>
                  {/* List of all applications */}
                  <p>All applications will be listed here.</p>
                </TabsContent>
                <TabsContent value='new'>
                  {/* List of new applications */}
                  <p>New applications will be listed here.</p>
                </TabsContent>
                <TabsContent value='reviewed'>
                  {/* List of reviewed applications */}
                  <p>Reviewed applications will be listed here.</p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardContent className='p-4'>
              <h2 className='mb-4 text-xl font-semibold'>
                Hospital Statistics
              </h2>
              {/* Add hospital statistics here */}
              <p>Hospital statistics and charts will be displayed here.</p>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardContent className='p-6'>
              <h2 className='mb-4 text-xl font-semibold'>
                Manage Job Listings
              </h2>
              <p className='mb-6 text-sm text-gray-600'>
                Update your open positions and department information.
              </p>

              <div className='space-y-6'>
                <div>
                  <label className='mb-2 block text-sm font-medium'>
                    Open Positions
                  </label>
                  <div className='mb-2 flex flex-wrap gap-2'>
                    {openPositions.map((position, index) => (
                      <Badge
                        key={index}
                        variant='secondary'
                        className='flex items-center'
                      >
                        {position}
                        <Button
                          variant='ghost'
                          size='sm'
                          className='ml-1 h-auto p-0'
                          onClick={() => removePosition(position)}
                        >
                          <X className='h-3 w-3' />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder='Add new position' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='nurse'>Nurse</SelectItem>
                      <SelectItem value='doctor'>Doctor</SelectItem>
                      <SelectItem value='surgeon'>Surgeon</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className='mb-2 block text-sm font-medium'>
                    Departments
                  </label>
                  <div className='mb-2 flex flex-wrap gap-2'>
                    {departments.map((department, index) => (
                      <Badge
                        key={index}
                        variant='secondary'
                        className='flex items-center'
                      >
                        {department}
                        <Button
                          variant='ghost'
                          size='sm'
                          className='ml-1 h-auto p-0'
                          onClick={() => removeDepartment(department)}
                        >
                          <X className='h-3 w-3' />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder='Add new department' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='cardiology'>Cardiology</SelectItem>
                      <SelectItem value='neurology'>Neurology</SelectItem>
                      <SelectItem value='oncology'>Oncology</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className='mb-2 block text-sm font-medium'>
                    Hospital Type
                  </label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder='Select hospital type' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='general'>General Hospital</SelectItem>
                      <SelectItem value='specialized'>
                        Specialized Hospital
                      </SelectItem>
                      <SelectItem value='teaching'>
                        Teaching Hospital
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className='mb-2 block text-sm font-medium'>
                    Number of Beds
                  </label>
                  <Input type='number' placeholder='e.g., 500' />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
