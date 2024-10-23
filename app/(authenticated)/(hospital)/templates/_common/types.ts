import { type Read } from '@/templates/api/read';

export type Templates = Read['output'];
export type Template = Read['output'][number];
