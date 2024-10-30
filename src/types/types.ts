import { DBTable } from '@/db/types';

export type InterviewData = DBTable<'interview'> & {
  version: DBTable<'version'>;
};
