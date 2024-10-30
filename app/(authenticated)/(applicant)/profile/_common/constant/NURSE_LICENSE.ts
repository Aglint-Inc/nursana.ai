import { type z } from 'zod';

import { type nurseLicenseSchema } from '@/supabase-types/zod-schema.types';
const licenses = [
  { value: 'registered-nurse', label: 'Registered Nurse (RN)' },
  { value: 'nurse-practitioner', label: 'Nurse Practitioner (NP)' },
  {
    value: 'licensed-practical-nurse',
    label: 'Licensed Practical Nurse (LPN) / Licensed Vocational Nurse (LVN)',
  },
  {
    value: 'clinical-nurse-specialist',
    label: 'Clinical Nurse Specialist (CNS)',
  },
  { value: 'certified-nurse-midwife', label: 'Certified Nurse Midwife (CNM)' },
  {
    value: 'advanced-practice-registered-nurse',
    label: 'Advanced Practice Registered Nurse (APRN)',
  },
  {
    value: 'certified-registered-nurse-anesthetist',
    label: 'Certified Registered Nurse Anesthetist (CRNA)',
  },
  { value: 'public-health-nurse', label: 'Public Health Nurse (PHN)' },
  {
    value: 'registered-nurse-board-certified',
    label: 'Registered Nurse, Board Certified (RN-BC)',
  },
  {
    value: 'certified-nursing-assistant',
    label: 'Certified Nursing Assistant (CNA)',
  },
  { value: 'home-health-aide', label: 'Home Health Aide (HHA)' },
  {
    value: 'acute-care-nurse-practitioner',
    label: 'Acute Care Nurse Practitioner (ACNP)',
  },
  {
    value: 'family-nurse-practitioner',
    label: 'Family Nurse Practitioner (FNP)',
  },
  {
    value: 'pediatric-nurse-practitioner',
    label: 'Pediatric Nurse Practitioner (PNP)',
  },
  {
    value: 'adult-gerontology-nurse-practitioner',
    label: 'Adult-Gerontology Nurse Practitioner (AGNP)',
  },
  {
    value: 'psychiatric-mental-health-nurse-practitioner',
    label: 'Psychiatric-Mental Health Nurse Practitioner (PMHNP)',
  },
  {
    value: 'travel-nurse-license-compact-license',
    label: 'Travel Nurse License (Compact License)',
  },
] as {
  value: z.infer<typeof nurseLicenseSchema>;
  label: string;
}[];

export const NURSE_LICENSE = licenses;
