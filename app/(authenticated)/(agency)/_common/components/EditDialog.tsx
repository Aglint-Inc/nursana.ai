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
import { agencyUpdateSchema } from '@/supabase-types/zod-schema.types';

import { useAgency } from '../hooks/useAgency';
import { useAgencyEdit } from '../hooks/useAgencyEdit';

export const EditAgencyDialog = () => {
  const { isOpen, setIsOpen } = useAgencyEdit();
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Agency</DialogTitle>
          <DialogDescription>
            <EditForm />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

const schema = agencyUpdateSchema.pick({
  address: true,
  contact_email: true,
  contact_number: true,
  name: true,
});

const EditForm = () => {
  const agency = useAgency();

  const { isPending, mutate } = useAgencyEdit();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: agency,
  });

  function onSubmit(values: z.infer<typeof schema>) {
    mutate({
      ...values,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='name'
          rules={{
            required: 'Name cannot be empty',
          }}
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
          name='contact_number'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Number</FormLabel>
              <FormControl>
                <Input
                  placeholder='Enter a phone number'
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
          name='contact_email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Email</FormLabel>
              <FormControl>
                <Input
                  placeholder='Enter a contact email'
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
          name='address'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input
                  placeholder='Enter a address'
                  {...field}
                  value={field.value || ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' disabled={isPending}>
          Submit
        </Button>
      </form>
    </Form>
  );
};
