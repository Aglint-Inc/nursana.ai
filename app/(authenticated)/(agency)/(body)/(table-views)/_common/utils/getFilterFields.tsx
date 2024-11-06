import type {
  DataTableFilterField,
  Option,
} from '@/components/fancy-data-table/types';
import { INTERVIEW_STAGES } from '@/table-views/constants/interview_stages';
import { TAGS_COLOR } from '@/table-views/constants/tagsColor';
import type { ColumnSchema } from '@/table-views/types';
import { cn } from '@/utils/cn';

import { removeUnderscore } from './removeUnderscore';

// export const getFilterFields = (data: ColumnSchema[]) =>
export const getFilterFields = (data: ColumnSchema[]) =>
  [
    // {
    //   label: 'Updated At',
    //   value: 'updated_at',
    //   type: 'timerange',
    //   defaultOpen: true,
    //   commandDisabled: true,
    // },
    {
      label: 'Template',
      value: 'template',
      type: 'checkbox',
      options: Array.from(
        data.reduce((acc, { template }) => {
          acc.set(template.id, template.name);
          return acc;
        }, new Map<ColumnSchema['template']['id'], ColumnSchema['template']['name']>()),
      ).map(([id, name]) => ({
        label: name,
        value: id,
      })),
    },
    {
      label: 'Campaign Code',
      value: 'campaign_code',
      type: 'checkbox',
      options: Array.from(
        data.reduce((acc, { campaign_code }) => {
          acc.add(campaign_code);
          return acc;
        }, new Set<string>()),
      ).map((campaign_code) => ({
        label: campaign_code,
        value: campaign_code,
      })),
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
        if (typeof props.value === 'number') return null;
        return (
          <div className='flex w-full items-center justify-between gap-2'>
            <span className='truncate font-normal capitalize'>
              {removeUnderscore(props.value)}
            </span>
            <span
              className={cn(
                'h-2 w-2 rounded-full',
                TAGS_COLOR[props.value].dot,
              )}
            />
          </div>
        );
      },
      options: INTERVIEW_STAGES.map((tag) => ({
        label: removeUnderscore(tag),
        value: tag,
      })),
    },
    // {
    //   label: 'Terms accepted',
    //   value: 'terms_accepted',
    //   type: 'checkbox',
    //   options: [true, false].map((bool) => ({
    //     label: `${bool}` as any as string,
    //     value: bool,
    //   })),
    // },
  ] satisfies DataTableFilterField<ColumnSchema>[];
