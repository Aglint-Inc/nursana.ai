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

type JobTitle = Record<'value' | 'label', string>;

const JOB_TITLES: JobTitle[] = [
  { value: 'registered-nurse', label: 'Registered Nurse' },
  { value: 'nurse-practitioner', label: 'Nurse Practitioner' },
  { value: 'licensed-practical-nurse', label: 'Licensed Practical Nurse' },
  { value: 'clinical-nurse-specialist', label: 'Clinical Nurse Specialist' },
  { value: 'certified-nurse-midwife', label: 'Certified Nurse Midwife' },
  // Add more job titles as needed
];

export function JobTitleSelect() {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [openCombobox, setOpenCombobox] = React.useState(false);
  const [inputValue, setInputValue] = React.useState<string>('');
  const [selectedTitles, setSelectedTitles] = React.useState<JobTitle[]>([]);

  const toggleTitle = (title: JobTitle) => {
    setSelectedTitles((currentTitles) =>
      !currentTitles.includes(title)
        ? [...currentTitles, title]
        : currentTitles.filter((t) => t.value !== title.value),
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
              {selectedTitles.length === 0 && 'Select job titles'}
              {selectedTitles.length === 1 && selectedTitles[0].label}
              {selectedTitles.length === 2 &&
                selectedTitles.map(({ label }) => label).join(', ')}
              {selectedTitles.length > 2 &&
                `${selectedTitles.length} job titles selected`}
            </span>
            <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-full p-0'>
          <Command loop>
            <CommandInput
              ref={inputRef}
              placeholder='Search job titles...'
              value={inputValue}
              onValueChange={setInputValue}
            />
            <CommandList>
              <CommandGroup className='max-h-[145px] overflow-auto'>
                {JOB_TITLES.map((title) => {
                  const isActive = selectedTitles.includes(title);
                  return (
                    <CommandItem
                      key={title.value}
                      value={title.value}
                      onSelect={() => toggleTitle(title)}
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          isActive ? 'opacity-100' : 'opacity-0',
                        )}
                      />
                      <div className='flex-1'>{title.label}</div>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <div className='mt-3'>
        {selectedTitles.map(({ label, value }) => (
          <Badge key={value} variant='outline' className='mb-2 mr-2'>
            {label}
          </Badge>
        ))}
      </div>
    </div>
  );
}
