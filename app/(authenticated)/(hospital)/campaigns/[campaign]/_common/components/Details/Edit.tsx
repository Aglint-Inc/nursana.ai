import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { type z } from 'zod';

import { useCampaign } from '@/campaign/hooks/useCampaign';
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
import {
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { campaignUpdateSchema } from '@/supabase-types/zod-schema.types';

import { useDetails } from './Context';

export const Edit = () => {
  return (
    <>
      <Header />
      <Body />
    </>
  );
};

const Header = () => {
  return (
    <SheetHeader className='translate-y-[-16px]'>
      <SheetTitle className='flex flex-row items-center gap-2'>
        Edit Campaign
        <Back />
      </SheetTitle>
    </SheetHeader>
  );
};

const Back = () => {
  const { setMode } = useDetails();
  return (
    <Button variant={'ghost'} onClick={() => setMode('view')}>
      <ArrowLeft size={16} />
    </Button>
  );
};

const Body = () => {
  return (
    <SheetDescription>
      <EditForm />
    </SheetDescription>
  );
};

const schema = campaignUpdateSchema.pick({
  campaign_code: true,
  name: true,
});

const EditForm = () => {
  const campaign = useCampaign();

  const { isPending, mutate } = useDetails();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: campaign,
  });

  function onSubmit(values: z.infer<typeof schema>) {
    mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='campaign_code'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Campaign code</FormLabel>
              <FormControl>
                <Input placeholder='Campaign code' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder='Name' {...field} />
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
