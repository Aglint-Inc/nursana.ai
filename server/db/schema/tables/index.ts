import type { Custom, CustomizableTypes } from '@/app/types';

import type { Database } from '../default';
import type { AgencyTable } from './agency';

type DatabaseTables = Database['public']['Tables'];
type DatabaseTableInsert<T extends keyof DatabaseTables> =
  DatabaseTables[T]['Insert'];
type DatabaseTableRow<T extends keyof DatabaseTables> =
  DatabaseTables[T]['Row'];
type DatabaseTableUpdate<T extends keyof DatabaseTables> =
  DatabaseTables[T]['Update'];

export type TableType<
  T extends keyof DatabaseTables,
  U extends DatabaseTableRow<T> extends infer R
    ? R extends CustomizableTypes<'Object'>
      ? { [_id in keyof Partial<R>]: unknown }
      : //@ts-expect-error
        { [_id in keyof Partial<R[number]>]: unknown }
    : never,
> = Required<
  Custom<
    DatabaseTables[T],
    //@ts-expect-error
    {
      //@ts-expect-error
      Row: Custom<DatabaseTableRow<T>, U>;
      //@ts-expect-error
      Insert: Custom<DatabaseTableInsert<T>, U>;
      //@ts-expect-error
      Update: Custom<DatabaseTableUpdate<T>, U>;
    }
  >
>;

export type Tables = Custom<
  DatabaseTables,
  {
    agency: AgencyTable;
  }
>;
