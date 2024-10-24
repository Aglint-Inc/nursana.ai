import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { type z } from 'zod';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
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
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <ScrollArea className='h-[calc(100vh-150px)] w-full pr-4'>
          <div className='mx-auto p-2'>
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
            <Accordion type='single' collapsible className='w-full'>
              <AccordionItem value='ai_details'>
                <AccordionTrigger>AI Details</AccordionTrigger>
                <AccordionContent>
                  <div className='flex w-full flex-col gap-4 p-2'>
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
                      name='ai_welcome_message'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Welcome Message</FormLabel>
                          <FormControl>
                            <Textarea
                              className='min-h-[200px]'
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
                              className='min-h-[200px]'
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
                      name='ai_questions'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Questions</FormLabel>
                          <FormControl>
                            <Textarea
                              className='min-h-[200px]'
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
                              className='min-h-[200px]'
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
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value='candidate_details'>
                <AccordionTrigger>Candidate Details</AccordionTrigger>
                <AccordionContent>
                  <div className='flex flex-col gap-4 p-2'>
                    <FormField
                      control={form.control}
                      name='candidate_estimated_time'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Estimated Time</FormLabel>
                          <FormControl>
                            <Input
                              placeholder='Enter Estimated Time'
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
                            <Textarea
                              className='min-h-[150px]'
                              placeholder='Enter Candidate Overview'
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
                      name='candidate_instructions'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Candidate Instructions</FormLabel>
                          <FormControl>
                            <Textarea
                              className='min-h-[150px]'
                              placeholder='Enter Candidate Instructions'
                              {...field}
                              value={field.value || ''}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <ScrollBar />
        </ScrollArea>
        <Button type='submit' disabled={isPending}>
          Submit
        </Button>
      </form>
    </Form>
  );
};
