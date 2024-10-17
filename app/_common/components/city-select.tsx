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

type City = Record<'value' | 'label', string>;

const CITIES: City[] = [
  { value: 'new-york-ny', label: 'New York, NY' },
  { value: 'los-angeles-ca', label: 'Los Angeles, CA' },
  { value: 'chicago-il', label: 'Chicago, IL' },
  { value: 'houston-tx', label: 'Houston, TX' },
  { value: 'phoenix-az', label: 'Phoenix, AZ' },
  // Add more cities as needed
];

export function CitySelect() {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [openCombobox, setOpenCombobox] = React.useState(false);
  const [inputValue, setInputValue] = React.useState<string>('');
  const [selectedCities, setSelectedCities] = React.useState<City[]>([]);

  const toggleCity = (city: City) => {
    setSelectedCities((currentCities) =>
      !currentCities.includes(city)
        ? [...currentCities, city]
        : currentCities.filter((c) => c.value !== city.value),
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
              {selectedCities.length === 0 && 'Select cities'}
              {selectedCities.length === 1 && selectedCities[0].label}
              {selectedCities.length === 2 &&
                selectedCities.map(({ label }) => label).join(', ')}
              {selectedCities.length > 2 &&
                `${selectedCities.length} cities selected`}
            </span>
            <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-full p-0'>
          <Command loop>
            <CommandInput
              ref={inputRef}
              placeholder='Search cities...'
              value={inputValue}
              onValueChange={setInputValue}
            />
            <CommandList>
              <CommandGroup className='max-h-[145px] overflow-auto'>
                {CITIES.map((city) => {
                  const isActive = selectedCities.includes(city);
                  return (
                    <CommandItem
                      key={city.value}
                      value={city.value}
                      onSelect={() => toggleCity(city)}
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          isActive ? 'opacity-100' : 'opacity-0',
                        )}
                      />
                      <div className='flex-1'>{city.label}</div>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <div className='mt-3'>
        {selectedCities.map(({ label, value }) => (
          <Badge key={value} variant='outline' className='mb-2 mr-2'>
            {label}
          </Badge>
        ))}
      </div>
    </div>
  );
}
