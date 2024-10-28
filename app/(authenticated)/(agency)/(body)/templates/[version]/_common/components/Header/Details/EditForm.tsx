import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { type z } from 'zod';

import RichTextEditor from '@/common/components/RichTextEditor';
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
import { Textarea } from '@/components/ui/textarea';
import { versionUpdateSchema } from '@/supabase-types/zod-schema.types';
import { useVersion } from '@/version/hooks/useVersion';

import { useDetails } from './Context';

const schema = versionUpdateSchema.pick({
  name: true,
  ai_ending_message: true,
  ai_instructions: true,
  ai_interview_duration: true,
  ai_questions: true,
  ai_welcome_message: true,
  candidate_estimated_time: true,
  candidate_instructions: true,
  candidate_overview: true,
  candidate_intro_video_url: true,
  candidate_intro_video_cover_image_url: true,
});

export const EditForm = () => {
  const version = useVersion();

  const { isPending, mutate } = useDetails();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: version,
  });

  async function onSubmit(values: z.infer<typeof schema>) {
    await mutate({
      ...values,
    });
  }

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
            <div className='flex w-full flex-col gap-4'>
              <FormField
                control={form.control}
                name='ai_welcome_message'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>AI Welcome Message</FormLabel>
                    <FormControl>
                      <Textarea
                        className='h-[100px] overflow-auto'
                        placeholder='Enter welcome message'
                        {...field}
                        value={field.value || ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='ai_ending_message'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>AI ending message</FormLabel>
                    <FormControl>
                      <Textarea
                        className='h-[100px] overflow-auto'
                        placeholder='Enter AI ending message'
                        {...field}
                        value={field.value || ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='ai_interview_duration'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Interview Duration</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        placeholder='Enter interview duration'
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value
                            ? parseFloat(e.target.value)
                            : '';
                          field.onChange(value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='ai_questions'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Questions</FormLabel>
                    <FormControl>
                      <Textarea
                        className='h-[500px] overflow-auto'
                        placeholder='Enter questions'
                        {...field}
                        value={field.value || ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='ai_instructions'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>AI Instructions</FormLabel>
                    <FormControl>
                      <Textarea
                        className='h-[100px] overflow-auto'
                        placeholder='Enter AI Instructions'
                        {...field}
                        value={field.value || ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='flex flex-col gap-4'>
              <FormField
                control={form.control}
                name='candidate_estimated_time'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Candidate Estimated Time</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Enter Candidate Estimated Time'
                        {...field}
                        value={field.value || ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='candidate_intro_video_cover_image_url'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Video cover image url</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Enter cover image url'
                        {...field}
                        value={field.value || ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='candidate_intro_video_url'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Video url</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Enter video url '
                        {...field}
                        value={field.value || ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='candidate_overview'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Candidate Overview</FormLabel>
                    <FormControl>
                      <RichTextEditor
                        placeholder='Enter Candidate Overview'
                        {...field}
                        value={field.value || ''}
                        onChange={(value) => {
                          field.onChange(value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='candidate_instructions'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Candidate Instructions</FormLabel>
                    <FormControl>
                      <RichTextEditor
                        {...field}
                        value={field.value || ''}
                        onChange={(value) => {
                          field.onChange(value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <ScrollBar />
        </ScrollArea>
        <div className='mt-3 flex justify-end gap-2'>
          <Button variant={'secondary'} size={'sm'}>
            Cancel
          </Button>
          <Button type='submit' size={'sm'} disabled={isPending}>
            Update Changes
          </Button>
        </div>
      </form>
    </Form>
  );
};
