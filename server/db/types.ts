import type { Custom } from '@/app/types';
import type { Database, Tables } from '@/db/schema';

export type DB = Custom<
  Database,
  {
    public: Custom<Database['public'], { Tables: Tables }>;
  }
>;

type _Tables = DB['public']['Tables'];

export type DBTable<
  T extends keyof _Tables,
  U extends keyof _Tables[T] = 'Row',
> = _Tables[T][U];

export type DBEnums<T extends keyof DB['public']['Enums']> =
  DB['public']['Enums'][T];
