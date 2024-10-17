'use client';

import { Check, ChevronsUpDown } from 'lucide-react';
import * as React from 'react';
import { cn } from 'src/utils/cn';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

type JobType = Record<'value' | 'label', string>;

const JOB_TYPES: JobType[] = [
  { value: 'full-time', label: 'Full-Time' },
  { value: 'part-time', label: 'Part-Time' },
  { value: 'contract', label: 'Contract' },
  { value: 'temporary', label: 'Temporary' },
  { value: 'internship', label: 'Internship' },
];

export function JobTypeSelect() {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [jobTypes, setJobTypes] = React.useState<JobType[]>(JOB_TYPES);
  const [openCombobox, setOpenCombobox] = React.useState(false);
  const [inputValue, setInputValue] = React.useState<string>('');
  const [selectedTypes, setSelectedTypes] = React.useState<JobType[]>([]);

  const toggleType = (type: JobType) => {
    setSelectedTypes((currentTypes) =>
      !currentTypes.includes(type)
        ? [...currentTypes, type]
        : currentTypes.filter((t) => t.value !== type.value),
    );
    inputRef?.current?.focus();
  };

  const onComboboxOpenChange = (value: boolean) => {
    inputRef.current?.blur();
    setOpenCombobox(value);
  };

  return (
    <div className='w-full'>
      <Popover open={openCombobox} onOpenChange={onComboboxOpenChange}>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            role='combobox'
            aria-expanded={openCombobox}
            className='w-[200px] justify-between text-foreground'
          >
            <span className='truncate'>
              {selectedTypes.length === 0 && 'Select job type'}
              {selectedTypes.length === 1 && selectedTypes[0].label}
              {selectedTypes.length === 2 &&
                selectedTypes.map(({ label }) => label).join(', ')}
              {selectedTypes.length > 2 &&
                `${selectedTypes.length} job types selected`}
            </span>
            <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-full p-0'>
          <Command loop>
            <CommandInput
              ref={inputRef}
              placeholder='Search job types...'
              value={inputValue}
              onValueChange={setInputValue}
            />
            <CommandList>
              <CommandGroup className='max-h-[145px] overflow-auto'>
                {jobTypes.map((type) => {
                  const isActive = selectedTypes.includes(type);
                  return (
                    <CommandItem
                      key={type.value}
                      value={type.value}
                      onSelect={() => toggleType(type)}
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          isActive ? 'opacity-100' : 'opacity-0',
                        )}
                      />
                      <div className='flex-1'>{type.label}</div>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <div className='mt-3'>
        {selectedTypes.map(({ label, value }) => (
          <Badge key={value} variant='outline' className='mb-2 mr-2'>
            {label}
          </Badge>
        ))}
      </div>
    </div>
  );
}
