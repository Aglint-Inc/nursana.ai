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

type SalaryRange = Record<'value' | 'label', string>;

const SALARY_RANGES: SalaryRange[] = [
  { value: '30k-40k', label: '$30,000 - $40,000' },
  { value: '40k-50k', label: '$40,000 - $50,000' },
  { value: '50k-60k', label: '$50,000 - $60,000' },
  { value: '60k-70k', label: '$60,000 - $70,000' },
  { value: '70k-80k', label: '$70,000 - $80,000' },
  { value: '80k-100k', label: '$80,000 - $100,000' },
  { value: '100k-120k', label: '$100,000 - $120,000' },
  { value: '120k-150k', label: '$120,000 - $150,000' },
  { value: '150k+', label: '$150,000+' },
  // Add more ranges as needed
];

export function SalaryRangeSelect() {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [salaryRanges, setSalaryRanges] =
    React.useState<SalaryRange[]>(SALARY_RANGES);
  const [openCombobox, setOpenCombobox] = React.useState(false);
  const [inputValue, setInputValue] = React.useState<string>('');
  const [selectedRanges, setSelectedRanges] = React.useState<SalaryRange[]>([]);

  const toggleRange = (range: SalaryRange) => {
    setSelectedRanges((currentRanges) =>
      !currentRanges.includes(range)
        ? [...currentRanges, range]
        : currentRanges.filter((r) => r.value !== range.value),
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
              {selectedRanges.length === 0 && 'Select salary range'}
              {selectedRanges.length === 1 && selectedRanges[0].label}
              {selectedRanges.length === 2 &&
                selectedRanges.map(({ label }) => label).join(', ')}
              {selectedRanges.length > 2 &&
                `${selectedRanges.length} ranges selected`}
            </span>
            <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-full p-0'>
          <Command loop>
            <CommandInput
              ref={inputRef}
              placeholder='Search salary range...'
              value={inputValue}
              onValueChange={setInputValue}
            />
            <CommandList>
              <CommandGroup className='max-h-[145px] overflow-auto'>
                {salaryRanges.map((range) => {
                  const isActive = selectedRanges.includes(range);
                  return (
                    <CommandItem
                      key={range.value}
                      value={range.value}
                      onSelect={() => toggleRange(range)}
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          isActive ? 'opacity-100' : 'opacity-0',
                        )}
                      />
                      <div className='flex-1'>{range.label}</div>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <div className='mt-3'>
        {selectedRanges.map(({ label, value }) => (
          <Badge key={value} variant='outline' className='mb-2 mr-2'>
            {label}
          </Badge>
        ))}
      </div>
    </div>
  );
}
