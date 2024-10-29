import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { type z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { campaignInsertSchema } from '@/supabase-types/zod-schema.types';
import { useTemplates } from '@/templates/hooks/useTemplates';

import { useAction } from './Context';

const schema = campaignInsertSchema.pick({
  name: true,
  campaign_code: true,
  description: true,
  status: true,
  version_id: true,
});

export const AddForm = () => {
  const { isPending, mutate, setIsOpen } = useAction();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { status: 'archived' },
  });

  const {
    register,
    setValue,
    control,
    clearErrors,
    formState: { errors },
  } = form;

  async function onSubmit(values: z.infer<typeof schema>) {
    await mutate({
      ...values,
    });
  }
  const templates = useTemplates();

  const [tempId, setTempId] = useState<string>('');
  const [versions, setVersions] = useState<
    (typeof templates)[number]['version'] | null
  >(null);

  useEffect(() => {
    const selectedVersion =
      templates.find((temp) => temp.id === tempId)?.version || null;

    setVersions(selectedVersion);
  }, [tempId]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <ScrollArea className='h-[calc(100vh-120px)] w-full rounded-lg border border-border bg-muted'>
          <div className='flex flex-col gap-4 p-4 text-foreground'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter a name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='campaign_code'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Campaign Code</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter a campaign code' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Enter a description'
                      {...field}
                      className='h-40'
                      value={field.value || ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='status'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Switch
                      {...register('status')}
                      onCheckedChange={(value) => {
                        clearErrors('status');
                        setValue('status', value ? 'active' : 'archived', {
                          shouldDirty: true,
                        });
                      }}
                    />
                  </FormControl>
                  <p>{field.value || 'archived'}</p>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex flex-col gap-4'>
              <FormLabel className='font-normal text-muted-foreground'>
                Template
              </FormLabel>
              <Select
                onValueChange={(value) => {
                  setTempId(value);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select template' />
                </SelectTrigger>
                <SelectContent>
                  {templates.map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.version_id && !tempId && (
                <p className='text-red-600'>Please Select Template</p>
              )}
            </div>
            {versions && (
              <FormField
                control={control}
                name='version_id'
                render={({ field: { value } }) => (
                  <FormItem>
                    <FormLabel className='font-normal text-muted-foreground'>
                      Version
                    </FormLabel>
                    <FormControl>
                      <Select
                        {...register('version_id')}
                        onValueChange={(value) => {
                          clearErrors('version_id');
                          setValue('version_id', value, { shouldDirty: true });
                        }}
                        value={value || ''}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder='Select version' />
                        </SelectTrigger>
                        <SelectContent>
                          {versions.map((version) => (
                            <SelectItem key={version.id} value={version.id}>
                              {version.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>
          <ScrollBar />
        </ScrollArea>
        <div className='mt-3 flex justify-end gap-2'>
          <Button
            variant={'secondary'}
            type='button'
            onClick={() => setIsOpen(false)}
            size={'sm'}
          >
            Cancel
          </Button>
          <Button type='submit' size={'sm'} disabled={isPending}>
            Add
          </Button>
        </div>
      </form>
    </Form>
  );
};
