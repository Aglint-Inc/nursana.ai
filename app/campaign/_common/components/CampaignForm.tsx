import React, { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

type Campaign = any;

interface CampaignFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (_campaign: Partial<Campaign>) => void;
  campaign?: Campaign;
}

export function CampaignForm({
  isOpen: _,
  onClose,
  onSubmit,
  campaign,
}: CampaignFormProps) {
  const [formData, setFormData] = useState<Partial<Campaign>>({
    name: '',
    description: '',
    code: '',
    status: 'draft',
  });

  useEffect(() => {
    if (campaign) {
      setFormData(campaign);
    }
  }, [campaign]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      status: value as Campaign['status'],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='space-y-4'>
        <div>
          <label
            htmlFor='name'
            className='block text-sm font-medium text-gray-700'
          >
            Name
          </label>
          <Input
            id='name'
            name='name'
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label
            htmlFor='description'
            className='block text-sm font-medium text-gray-700'
          >
            Description
          </label>
          <Textarea
            id='description'
            name='description'
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label
            htmlFor='code'
            className='block text-sm font-medium text-gray-700'
          >
            Code
          </label>
          <Input
            id='code'
            name='code'
            value={formData.code}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label
            htmlFor='status'
            className='block text-sm font-medium text-gray-700'
          >
            Status
          </label>
          <Select
            name='status'
            value={formData.status}
            onValueChange={handleStatusChange}
          >
            <SelectTrigger>
              <SelectValue placeholder='Select status' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='draft'>Draft</SelectItem>
              <SelectItem value='active'>Active</SelectItem>
              <SelectItem value='completed'>Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button type='button' variant='outline' onClick={onClose}>
        Cancel
      </Button>
      <Button type='submit'>{campaign ? 'Update' : 'Create'}</Button>
    </form>
  );
}
