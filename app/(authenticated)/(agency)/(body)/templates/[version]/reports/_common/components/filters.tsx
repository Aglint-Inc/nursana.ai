'use client';
// import { useToast } from '@/components/hooks/use-toast';
import {
  endOfDay,
  endOfMonth,
  endOfQuarter,
  endOfWeek,
  endOfYear,
  format,
  startOfDay,
  startOfMonth,
  startOfQuarter,
  startOfWeek,
  startOfYear,
  subDays,
} from 'date-fns';
import { BriefcaseBusiness, Building, CalendarIcon, X } from 'lucide-react';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { capitalizeFirstLetter } from '@/utils/utils';

import { useMatrixFilters } from '../context/matrixFilterProvider';

export default function MatrixFilter() {
  const {
    filtersOptions,
    filters: init_filters,
    handleSetFilter,
  } = useMatrixFilters();

  const [filters, setFilter] = useState(init_filters);
  const [dateOption, setDateOption] = useState<string>('');

  const handleDateOptionChange = (value: string) => {
    setDateOption(value);
    const { from, to } = MapDateOption(value);
    if (!from || !to) {
      //   toast({
      //     variant: 'destructive',
      //     title: 'failed to update date range',
      //   });
      return;
    }
    handleFilterChange({
      dateRange:
        from && to ? { from: startOfDay(from), to: endOfDay(to) } : undefined,
    });
  };

  const handleFilterChange: typeof handleSetFilter = (data) => {
    setFilter((pre) => ({ ...pre, ...data }));
  };

  const clearFilter = (filter: keyof typeof filters) => {
    handleFilterChange({ [filter]: '' });
  };

  const clearAllFilter = () => {
    handleFilterChange({
      campaign: undefined,
      interview: undefined,
      dateRange: undefined,
    });
  };

  const applyFilter = (newFilters: typeof filters) => {
    handleSetFilter(newFilters);
  };
  const clear_all =
    filters.campaign || filters.interview || filters.dateRange || false;
  const renderSelect = <
    X extends keyof typeof filtersOptions,
    T extends (typeof filtersOptions)[X][number],
  >(
    value: T['id'],
    // eslint-disable-next-line no-unused-vars
    onChange: (value: T['id']) => void,
    placeholder: keyof typeof filters,
    options: T[],
    icon: React.ReactNode,
  ) => {
    return (
      <div className='relative flex items-center space-x-2'>
        <div className='flex-grow'>
          {/* @ts-ignore */}
          <Select value={value || ''} onValueChange={onChange}>
            <SelectTrigger className='h-9 w-auto min-w-[120px]'>
              <div className='flex items-center space-x-2'>
                {icon}
                <SelectValue
                  placeholder={capitalizeFirstLetter(String(placeholder))}
                  className='ml-2'
                />
              </div>
            </SelectTrigger>
            <SelectContent className='border border-border'>
              {options.map((option) => (
                // @ts-ignore
                <SelectItem key={option.id} value={option.id}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {value && (
          <Button
            variant='outline'
            // size='icon'
            className='h-9 w-9 flex-shrink-0'
            onClick={() => clearFilter(placeholder)}
          >
            <X
              style={
                {
                  // transform: 'scale(6.5)',
                }
              }
            />
          </Button>
        )}
      </div>
    );
  };

  return (
    <div className='mt-4 flex w-full items-center justify-between space-x-2 px-4'>
      <div className='flex items-center space-x-2'>
        {renderSelect(
          filters.campaign,
          (campaign) => handleFilterChange({ campaign: campaign }),
          'campaign',
          filtersOptions.campaign,
          <BriefcaseBusiness className='h-4 w-4' />,
        )}

        {renderSelect(
          filters.interview,
          (interview) => handleFilterChange({ interview: interview }),
          'interview',
          filtersOptions.interview,
          <Building className='h-4 w-4' />,
        )}

        <Popover>
          <PopoverTrigger asChild>
            <Button variant='outline' size='sm' className='h-9 min-w-[120px]'>
              <CalendarIcon className='mr-2 h-4 w-4' />
              {filters.dateRange
                ? `${format(filters.dateRange.from, 'PP')} - ${format(filters.dateRange.to, 'PP')}`
                : 'Date Range'}
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className='w-auto border border-border p-4'
            align='start'
          >
            <div className='space-y-4'>
              <Select value={dateOption} onValueChange={handleDateOptionChange}>
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='Select date range' />
                </SelectTrigger>
                <SelectContent className='border border-border'>
                  {dateOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {dateOption === 'custom' && (
                <Calendar
                  mode='range'
                  selected={filters.dateRange ?? undefined}
                  // onSelect={setDateRange}
                  // initialFocus
                />
              )}
            </div>
          </PopoverContent>
        </Popover>
        {Boolean(filters.dateRange?.to) && (
          <Button
            variant='outline'
            // size='icon'
            className='h-9 w-9 flex-shrink-0'
            onClick={() => handleFilterChange({ dateRange: undefined })}
          >
            <X
              style={{
                transform: 'scale(6.5)',
              }}
            />
          </Button>
        )}
      </div>
      <div className='flex items-center space-x-2'>
        {clear_all && (
          <Button variant='outline' onClick={clearAllFilter}>
            <X className='mr-2 h-4 w-4 text-muted-foreground' />
            Clear All
          </Button>
        )}
        <Button
          onClick={() => {
            applyFilter(filters);
          }}
          size='sm'
          className='h-9 min-w-[120px]'
        >
          Apply Filters
        </Button>
      </div>
    </div>
  );
}

const dateOptions = [
  { value: 'today', label: 'Today' },
  { value: 'yesterday', label: 'Yesterday' },
  { value: 'thisWeek', label: 'This Week' },
  { value: 'thisMonth', label: 'This Month' },
  { value: 'thisQuarter', label: 'This Quarter' },
  { value: 'thisYear', label: 'This Year' },
  { value: 'yearToDate', label: 'Year to Date' },
  { value: 'custom', label: 'Custom Range' },
];

const MapDateOption = (value: string) => {
  const today = new Date();
  let from: Date | undefined, to: Date | undefined;
  switch (value) {
    case 'today':
      from = to = today;
      break;
    case 'yesterday':
      from = to = subDays(today, 1);
      break;
    case 'thisWeek':
      from = startOfWeek(today);
      to = endOfWeek(today);
      break;
    case 'thisMonth':
      from = startOfMonth(today);
      to = endOfMonth(today);
      break;
    case 'thisQuarter':
      from = startOfQuarter(today);
      to = endOfQuarter(today);
      break;
    case 'thisYear':
      from = startOfYear(today);
      to = endOfYear(today);
      break;
    case 'yearToDate':
      from = startOfYear(today);
      to = today;
      break;
  }
  return { from, to };
};
