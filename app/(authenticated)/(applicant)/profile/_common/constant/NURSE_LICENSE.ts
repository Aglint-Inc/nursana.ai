import type { z } from 'zod';

import type { nurseLicenseSchema } from '@/db/zod';
const licenses = [
  { value: 'registered-nurse', label: 'RN' },
  { value: 'nurse-practitioner', label: 'NP' },
  {
    value: 'licensed-practical-nurse',
    label: 'LPN/LVN',
  },
  {
    value: 'clinical-nurse-specialist',
    label: 'CNS',
  },
  { value: 'certified-nurse-midwife', label: 'CNM' },
  {
    value: 'advanced-practice-registered-nurse',
    label: 'APRN',
  },
  {
    value: 'certified-registered-nurse-anesthetist',
    label: 'CRNA',
  },
  { value: 'public-health-nurse', label: 'PHN' },
  {
    value: 'registered-nurse-board-certified',
    label: 'RN-BC',
  },
  {
    value: 'certified-nursing-assistant',
    label: 'CNA',
  },
  { value: 'home-health-aide', label: 'HHA' },
  {
    value: 'acute-care-nurse-practitioner',
    label: 'ACNP',
  },
  {
    value: 'family-nurse-practitioner',
    label: 'FNP',
  },
  {
    value: 'pediatric-nurse-practitioner',
    label: 'PNP',
  },
  {
    value: 'adult-gerontology-nurse-practitioner',
    label: 'AGNP',
  },
  {
    value: 'psychiatric-mental-health-nurse-practitioner',
    label: 'PMHNP',
  },
  {
    value: 'travel-nurse-license-compact-license',
    label: 'Compact License',
  },
] as {
  value: z.infer<typeof nurseLicenseSchema>;
  label: string;
}[];

export const NURSE_LICENSE = licenses;
