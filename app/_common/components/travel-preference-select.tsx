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

type TravelPreference = Record<'value' | 'label', string>;

const TRAVEL_PREFERENCES: TravelPreference[] = [
  { value: 'no-travel', label: 'No Travel' },
  { value: 'occasional-travel', label: 'Occasional Travel' },
  { value: 'frequent-travel', label: 'Frequent Travel' },
  { value: 'up-to-50-travel', label: 'Up to 50% Travel' },
  { value: 'up-to-75-travel', label: 'Up to 75% Travel' },
  { value: '100-travel', label: '100% Travel' },
];

export function TravelPreferenceSelect() {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [openCombobox, setOpenCombobox] = React.useState(false);
  const [inputValue, setInputValue] = React.useState<string>('');
  const [selectedPreferences, setSelectedPreferences] = React.useState<
    TravelPreference[]
  >([]);

  const togglePreference = (preference: TravelPreference) => {
    setSelectedPreferences((currentPreferences) =>
      !currentPreferences.includes(preference)
        ? [...currentPreferences, preference]
        : currentPreferences.filter((p) => p.value !== preference.value),
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
              {selectedPreferences.length === 0 && 'Select travel preferences'}
              {selectedPreferences.length === 1 && selectedPreferences[0].label}
              {selectedPreferences.length === 2 &&
                selectedPreferences.map(({ label }) => label).join(', ')}
              {selectedPreferences.length > 2 &&
                `${selectedPreferences.length} travel preferences selected`}
            </span>
            <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-full p-0'>
          <Command loop>
            <CommandInput
              ref={inputRef}
              placeholder='Search travel preferences...'
              value={inputValue}
              onValueChange={setInputValue}
            />
            <CommandList>
              <CommandGroup className='max-h-[145px] overflow-auto'>
                {TRAVEL_PREFERENCES.map((preference) => {
                  const isActive = selectedPreferences.includes(preference);
                  return (
                    <CommandItem
                      key={preference.value}
                      value={preference.value}
                      onSelect={() => togglePreference(preference)}
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          isActive ? 'opacity-100' : 'opacity-0',
                        )}
                      />
                      <div className='flex-1'>{preference.label}</div>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <div className='mt-3'>
        {selectedPreferences.map(({ label, value }) => (
          <Badge key={value} variant='outline' className='mb-2 mr-2'>
            {label}
          </Badge>
        ))}
      </div>
    </div>
  );
}
