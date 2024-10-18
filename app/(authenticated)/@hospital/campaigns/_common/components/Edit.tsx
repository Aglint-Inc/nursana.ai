'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Suspense } from 'react';
import { useForm } from 'react-hook-form';
import { type z } from 'zod';

import { Loader } from '@/common/components/Loader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { campaignUpdateSchema } from '@/supabase-types/zod-schema.types';

import { useCampaign } from '../hooks/useCampaign';
import { useCampaignEdit } from '../hooks/useCampaignEdit';
import { useCampaignParams } from '../hooks/useCurrentCampaign';

const Comp = () => {
  const params = useCampaignParams();
  const { push } = useRouter();
  return (
    <Card className='flex flex-grow flex-col' x-chunk='dashboard-01-chunk-5'>
      <CardHeader>
        <CardTitle className='flex w-full flex-row items-center justify-between'>
          <div>Campaign Edit</div>
          <X onClick={() => push(`/campaigns/${params.campaign}`)} />
        </CardTitle>
      </CardHeader>
      <CardContent className='grid gap-8'>
        <EditForm />
      </CardContent>
    </Card>
  );
};

export const Edit = () => {
  return (
    <div className='flex flex-grow basis-2/3'>
      <Suspense fallback={<Loader />}>
        <Comp />
      </Suspense>
    </div>
  );
};

const schema = campaignUpdateSchema.pick({
  campaign_code: true,
  name: true,
});

const EditForm = () => {
  const campaign = useCampaign();
  const { mutate, isPending } = useCampaignEdit();
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
