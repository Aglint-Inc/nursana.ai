import { DBTable } from '@/server/db/types';

export type InterviewData = DBTable<'interview'> & {
  version: DBTable<'version'>;
};
