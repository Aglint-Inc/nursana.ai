import { zodResolver } from '@hookform/resolvers/zod';
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
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { versionUpdateSchema } from '@/supabase-types/zod-schema.types';

import { useVersion } from '../../../hooks/useVersion';
import { useDetails } from './Context';

const schema = versionUpdateSchema.pick({
  name: true,
  ai_ending_message: true,
  ai_instructions: true, //array
  ai_interview_duration: true,
  ai_questions: true,
  ai_welcome_message: true,
  candidate_estimated_time: true,
  candidate_instructions: true, // array
  candidate_overview: true, //array
});

export const EditForm = () => {
  const version = useVersion();
  // const [ai_instructions, setAiInstruction] = useState(version.ai_instructions);

  const { isPending, mutate } = useDetails();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: version,
  });

  // const { fields, append, remove } = useFieldArray({
  //   control: form.control,
  //   name: 'ai_instructions' as never,
  // });

  function onSubmit(values: z.infer<typeof schema>) {
    mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <ScrollArea className='max-h-[80vh] w-full overflow-y-auto'>
          <div className='flex flex-col gap-4'>
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
            <p>
              AI Details <Separator />
            </p>
            {/* <div className='flex flex-col gap-2'>
              {ai_instructions.map((ins) => (
                <div
                  key={ins}
                  className='leading-0 flex rounded-sm bg-gray-100 p-1'
                >
                  <p className='flex-1'>{ins}</p>
                  <Button
                    size={'sm'}
                    variant={'ghost'}
                    onClick={() => {
                      setAiInstruction((pre) =>
                        pre.filter((insOld) => insOld !== ins),
                      );
                    }}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <div className='flex gap-2'>
                <Input /> <Button>Add</Button>
              </div>
            </div> */}
            <FormField
              control={form.control}
              name='ai_ending_message'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>AI ending message</FormLabel>
                  <FormControl>
                    <Input
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
            <p>
              Candidate Details <Separator />
            </p>
            <FormField
              control={form.control}
              name='candidate_estimated_time'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estimated Time</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Enter welcome message'
                      {...field}
                      value={field.value || ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
