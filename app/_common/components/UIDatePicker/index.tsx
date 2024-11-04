import { Calendar as CalendarIcon } from 'lucide-react';
import * as React from 'react';
import { cn } from 'src/utils/cn';

import { dayjsLocal } from '@/app/utils/dayjsLocal';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export function UIDatePicker({
  value,
  onAccept,
  closeOnSelect,
  minDate,
  maxDate,
}: {
  value: Date;
  onAccept: (_value: Date) => void;
  closeOnSelect?: boolean;
  minDate?: Date;
  maxDate?: Date;
}) {
  const [open, setOpen] = React.useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-full justify-start text-left font-normal',
            !value && 'text-muted-foreground',
          )}
        >
          <CalendarIcon className='mr-2 h-4 w-4' />
          {value ? (
            dayjsLocal(value).format('DD MMM, YYYY')
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0'>
        <Calendar
          mode='single'
          required
          selected={value}
          onSelect={(date: Date) => {
            if (date) {
              onAccept(date);
              closeOnSelect && setOpen(false);
            }
          }}
          disabled={(date: Date) => {
            return (minDate && date < minDate) || (maxDate && date > maxDate)
              ? true
              : false;
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
