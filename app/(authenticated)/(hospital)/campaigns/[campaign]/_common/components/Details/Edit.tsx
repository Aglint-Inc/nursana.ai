import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { campaignUpdateSchema } from '@/supabase-types/zod-schema.types';
import { useTemplates } from '@/templates/hooks/useTemplates';

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
  version_id: true,
  description: true,
  status: true,
});

const EditForm = () => {
  const templates = useTemplates();

  const campaign = useCampaign();

  const { isPending, mutate } = useDetails();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: campaign,
  });

  const { register, control, setValue, clearErrors } = form;

  function onSubmit(values: z.infer<typeof schema>) {
    // mutate(values);
    console.table(values);
  }

  // template and version selection --------------------------

  const [seletedTempId, setSeletedTempId] = useState('');
  const [seletedVersions, setSeletedVersions] = useState<
    (typeof templates)[number]['version'] | null
  >(null);

  function findCurrentTempId(ver_id: string) {
    for (const item of templates) {
      if (
        item.version.some(
          (v) => v.id === ver_id || v.id === campaign.version_id,
        )
      ) {
        return item.id;
      }
    }
    return '';
  }

  useEffect(() => {
    const tempId = seletedTempId || findCurrentTempId(campaign.version_id);
    if (!seletedTempId && campaign)
      setSeletedTempId(findCurrentTempId(campaign.version_id));
    if (templates && tempId) {
      const selTemp = templates.find((temp) => temp.id === tempId);
      if (selTemp) setSeletedVersions(selTemp.version);
    }
  }, [templates, seletedTempId, campaign]);

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
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Enter description'
                  {...field}
                  value={field.value || ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <p className='mb-1 font-medium'>Active status</p>
          <FormField
            control={form.control}
            name='status'
            render={({ field: { value } }) => (
              <FormItem>
                <FormControl>
                  <Switch
                    {...register('status')}
                    onCheckedChange={(value) => {
                      clearErrors('status');
                      setValue('status', value ? 'active' : 'archived', {
                        shouldDirty: true,
                      });
                    }}
                    value={value || ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div>
          <p className='mb-1 font-medium'>Templates</p>
          <Select
            onValueChange={(value) => {
              setSeletedTempId(value);
              const selTemp = templates.find(
                (temp) => temp.id === seletedTempId,
              );
              console.log(selTemp);
              if (selTemp) {
                setSeletedVersions(selTemp.version);
              }
            }}
            value={seletedTempId}
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
        </div>

        {seletedVersions && (
          <FormField
            control={control}
            name='version_id'
            render={({ field: { value } }) => (
              <FormItem>
                <FormLabel>Version</FormLabel>
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
                      {seletedVersions.map((version) => (
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

        <Button type='submit' disabled={isPending}>
          Submit
        </Button>
      </form>
    </Form>
  );
};
