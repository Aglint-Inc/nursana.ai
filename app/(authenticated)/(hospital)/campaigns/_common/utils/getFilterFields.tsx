import { INTERVIEW_STAGES } from '@/campaigns/constants/interview_stages';
import { TAGS_COLOR } from '@/campaigns/constants/tagsColor';
import type { ColumnSchema } from '@/campaigns/types';
import type {
  DataTableFilterField,
  Option,
} from '@/components/fancy-data-table/types';
import { cn } from '@/utils/cn';

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
      options: data.map(({ email }) => ({ label: email, value: email })),
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
              className={cn(
                'h-2 w-2 rounded-full',
                TAGS_COLOR[props.value].dot,
              )}
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
