import {
  DataTableFilterField,
  Option,
} from '@/components/fancy-data-table/types';
import { useCampaignInterviews } from './useCampaignInterviews';
import { tagsColor } from '@/campaign/components/Table/constants';
import { cn } from '@/utils/cn';
import { INTERVIEW_STAGES } from '@/campaign/constants';
import { ColumnSchema } from '@/campaign/types';

export const useFilterFields = () => {
  const data = useCampaignInterviews();
  return getFilterFields(data);
};

export const getFilterFields = (data: ColumnSchema[]) =>
  [
    {
      label: 'Updated At',
      value: 'updated_at',
      type: 'timerange',
      defaultOpen: true,
      commandDisabled: true,
    },
    {
      label: 'Email',
      value: 'email',
      type: 'input',
      options: data.map(({ email }) => {
        console.log(email);
        return { label: email, value: email };
      }),
    },
    {
      label: 'Interview Stage',
      value: 'interview_stage',
      type: 'checkbox',
      defaultOpen: true,
      // REMINDER: "use client" needs to be declared in the file - otherwise getting serialization error from Server Component
      component: (props: Option) => {
        if (typeof props.value === 'boolean') return null;
        if (typeof props.value === 'undefined') return null;
        return (
          <div className='flex w-full items-center justify-between gap-2'>
            <span className='truncate font-normal'>{props.value}</span>
            <span
              className={cn('h-2 w-2 rounded-full', tagsColor[props.value].dot)}
            />
          </div>
        );
      },
      options: INTERVIEW_STAGES.map((tag) => ({ label: tag, value: tag })),
    },
    {
      label: 'Terms accepted',
      value: 'terms_accepted',
      type: 'checkbox',
      options: [true, false].map((bool) => ({
        label: `${bool}` as any as string,
        value: bool,
      })),
    },
  ] satisfies DataTableFilterField<ColumnSchema>[];
