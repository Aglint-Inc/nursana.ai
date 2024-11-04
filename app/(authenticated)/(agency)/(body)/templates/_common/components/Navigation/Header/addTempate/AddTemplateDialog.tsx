import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { type z } from 'zod';

import RichTextEditor from '@/app/components/RichTextEditor';
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
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import { templateAddSchema } from '@/templates/template.schema';

import { useAction } from './Context';

export const AddTemplateDialog = () => {
  const { isOpen, setIsOpen } = useAction();
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className='min-w-[700px]'>
        <SheetHeader className='translate-y-[-16px]'>
          <SheetTitle className='flex flex-row items-center gap-2'>
            Add Template
          </SheetTitle>
        </SheetHeader>
        <AddForm />
      </SheetContent>
    </Sheet>
  );
};

const AddForm = () => {
  const { isPending, mutate } = useAction();

  const form = useForm<z.infer<typeof templateAddSchema>>({
    resolver: zodResolver(templateAddSchema),
  });

  async function onSubmit(values: z.infer<typeof templateAddSchema>) {
    await mutate({
      ...values,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=''>
        <ScrollArea className='h-[calc(100vh-130px)] w-full pr-4'>
          <div className='mx-auto flex flex-col gap-4 p-2'>
            <FormField
              control={form.control}
              name='template.name'
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Template name</FormLabel> */}
                  <FormControl>
                    <Input placeholder='Enter a template name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='mt-4 flex items-center gap-3'>
            <p className='h-[1px] w-full bg-slate-200'></p>
            <p className='min-w-fit text-sm text-slate-600'>Add Version</p>
            <p className='h-[1px] w-full bg-slate-200'></p>
          </div>

          <div className='mb-2 mt-4 text-lg'>AI Details</div>
          <div className='mx-auto flex flex-col gap-4 px-2 pb-2'>
            <FormField
              control={form.control}
              name='version.name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Version name</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter a version name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='version.ai_welcome_message'
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
              name='version.ai_ending_message'
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
              name='version.ai_interview_duration'
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
              name='version.ai_questions'
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
              name='version.ai_instructions'
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

            <FormField
              control={form.control}
              name='version.candidate_estimated_time'
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
              name='version.candidate_intro_video_cover_image_url'
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
              name='version.candidate_intro_video_url'
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
          </div>

          <div className='mb-2 mt-4 text-lg'>Candidate details</div>
          <div className='mx-auto flex flex-col gap-4 px-2 pb-2'>
            <FormField
              control={form.control}
              name='version.candidate_overview'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Candidate Overview</FormLabel>
                  <FormControl>
                    <RichTextEditor
                      minHeight='200px'
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
              name='version.candidate_instructions'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Candidate Instructions</FormLabel>
                  <FormControl>
                    <RichTextEditor
                      minHeight='200px'
                      placeholder='Enter Candidate Instructions'
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
        </ScrollArea>
        <Button disabled={isPending} className='mt-2' type='submit'>
          Add
        </Button>
      </form>
    </Form>
  );
};
