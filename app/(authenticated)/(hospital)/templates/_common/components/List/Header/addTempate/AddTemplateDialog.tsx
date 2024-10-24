import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { type z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
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
import { ScrollArea } from '@/components/ui/scroll-area';
import { templateAddSchema } from '@/templates/schema/template.schema';

import { useAction } from './Context';

export const AddTemplateDialog = () => {
  const { isOpen, setIsOpen } = useAction();
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add template and version</DialogTitle>
          <DialogDescription>
            <AddForm />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
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
        <ScrollArea className='h-[calc(100vh-600px)] w-full pr-4'>
          <div className='mx-auto flex flex-col gap-4 p-2'>
            <FormField
              control={form.control}
              name='template.name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Template name</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter a template name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <Button disabled={isPending} type='submit'>
              Add
            </Button>
          </div>
        </ScrollArea>
      </form>
    </Form>
  );
};
