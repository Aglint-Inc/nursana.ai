'use client';

import { Command as CommandPrimitive } from 'cmdk';
import { X } from 'lucide-react';
import * as React from 'react';

import { Badge } from '@/components/ui/badge';
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command';

type ItemType = Record<'value' | 'label', string>;

export function UIMultiSelect({
  defaultValue = [],
  listItems = [],
  onChange,
  level = 'item',
  onDelete,
  onInputChnage,
}: {
  defaultValue?: string[];
  listItems: ItemType[];
  onChange: (_x: string[], _value: string) => void;
  level?: string;
  onDelete: (_value: string) => void;
  onInputChnage?: (_value: string) => void;
}) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<string[]>(defaultValue);
  const [inputValue, setInputValue] = React.useState('');

  const handleUnselect = React.useCallback((item: string) => {
    setSelected((prev) => {
      onDelete(item);
      return prev.filter((s) => s !== item);
    });
  }, []);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === 'Delete' || e.key === 'Backspace') {
          if (input.value === '') {
            setSelected((prev) => {
              const newSelected = [...prev];
              const deleted = newSelected.pop();
              onChange(
                newSelected.map((ele) => ele),
                newSelected[0],
              );
              if (deleted) {
                handleUnselect(deleted);
              }
              return newSelected;
            });
          }
        }
        // This is not a default behaviour of the <input /> field
        if (e.key === 'Escape') {
          input.blur();
        }
      }
    },
    [],
  );

  const selectables = listItems.filter(
    (item) => !selected.includes(item.value),
  );

  return (
    <Command
      onKeyDown={handleKeyDown}
      className='overflow-visible bg-transparent'
    >
      <div className='group rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2'>
        <div className='mb-1 flex flex-wrap gap-2'>
          {listItems
            .filter((item) => selected.includes(item.value))
            .map((item) => {
              return (
                <Badge
                  key={item.value}
                  variant='secondary'
                  className='disabled rounded-md text-sm font-medium'
                >
                  {item.label}
                  <button
                    className='ml-1 rounded-md outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2'
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleUnselect(item.value);
                      }
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onClick={() => handleUnselect(item.value)}
                  >
                    <X className='h-3 w-3 text-muted-foreground hover:text-foreground' />
                  </button>
                </Badge>
              );
            })}
          {/* Avoid having the "Search" Icon */}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={(value) => {
              if (onInputChnage) {
                onInputChnage(value);
              }
              setInputValue(value);
            }}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder={`Select ${level}...`}
            className='ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground'
          />
        </div>
      </div>
      <div className='relative mt-2'>
        <CommandList>
          {open && selectables.length > 0 ? (
            <div className='absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in'>
              <CommandGroup className='h-full overflow-auto'>
                {selectables.map((item) => {
                  return (
                    <CommandItem
                      key={item.value}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onSelect={(_value) => {
                        setInputValue('');
                        setSelected((prev) => {
                          onChange([...prev, item.value], item.value);
                          return [...prev, item.value];
                        });
                      }}
                      className={'cursor-pointer'}
                    >
                      {item.label}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </div>
          ) : null}
        </CommandList>
      </div>
    </Command>
  );
}
