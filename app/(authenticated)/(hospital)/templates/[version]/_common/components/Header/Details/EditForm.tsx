import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil, Trash2 } from 'lucide-react';
import { type Dispatch, type SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import { type z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
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
  const [ai_instructions, setAiInstruction] = useState(version.ai_instructions);
  const [candidate_instructions, setCandidateInstructions] = useState(
    version.ai_instructions,
  );
  const [candidate_overview, setCandidateOverview] = useState(
    version.candidate_overview,
  );

  const { isPending, mutate } = useDetails();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: version,
  });

  function onSubmit(values: z.infer<typeof schema>) {
    console.log({
      ...values,
      ai_instructions,
      candidate_instructions,
      candidate_overview,
    });
    mutate({
      ...values,
      ai_instructions,
      candidate_instructions,
      candidate_overview,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <ScrollArea className='h-[calc(100vh-160px)] w-full'>
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
            <FormLabel>AI Instructions</FormLabel>
            <ArrayInput array={ai_instructions} setArray={setAiInstruction} />

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
            <FormLabel>Candidate Instructions</FormLabel>
            <ArrayInput
              array={candidate_instructions}
              setArray={setCandidateInstructions}
            />
            <FormLabel>Candidate Overview</FormLabel>
            <ArrayInput
              array={candidate_overview}
              setArray={setCandidateOverview}
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

const ArrayInput = ({
  array,
  setArray,
}: {
  array: string[];
  setArray: Dispatch<SetStateAction<string[]>>;
}) => {
  const [text, setText] = useState<string>('');
  const [Edit, setEdit] = useState('');
  return (
    <div className='flex flex-col gap-2'>
      {array.map((ins) => (
        <div
          key={ins}
          className='leading-0 flex rounded-sm bg-gray-100 p-1 pl-2'
        >
          <p className='flex-1'>{ins}</p>
          <Button
            size={'sm'}
            variant={'ghost'}
            onClick={() => {
              setArray((pre) => pre.filter((insOld) => insOld !== ins));
              setText(ins);
              setEdit(ins);
            }}
          >
            <Pencil />
          </Button>
          <Dialog>
            <DialogTrigger>
              <Button size={'sm'} variant={'ghost'}>
                <Trash2 />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete ?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  size={'sm'}
                  onClick={() => {
                    setArray((pre) => pre.filter((insOld) => insOld !== ins));
                  }}
                >
                  Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      ))}
      <div className='flex items-start gap-2'>
        <Input value={text} onChange={(e) => setText(e.target.value)} />
        <Button
          disabled={!text}
          onClick={() => {
            if (text) {
              if (Edit) setEdit('');
              setArray((pre) => [...pre, text]);
              setText('');
            }
          }}
        >
          {Edit ? 'Update' : 'Add'}
        </Button>
        {Edit && (
          <Button
            onClick={() => {
              setText('');
              setEdit('');
              setArray((pre) => [...pre, Edit]);
            }}
          >
            Cancel
          </Button>
        )}
      </div>
    </div>
  );
};
