import type { z } from 'zod';

import type { nerseTitlesSchema } from '@/db/zod';

const titles = [
  { value: 'registered-nurse', label: 'Registered Nurse (RN)' },
  {
    value: 'licensed-practical-nurse',
    label: 'Licensed Practical Nurse (LPN) / Licensed Vocational Nurse (LVN)',
  },
  { value: 'nurse-practitioner', label: 'Nurse Practitioner (NP)' },
  {
    value: 'certified-registered-nurse-anesthetist',
    label: 'Certified Registered Nurse Anesthetist (CRNA)',
  },
  { value: 'certified-nurse-midwife', label: 'Certified Nurse Midwife (CNM)' },
  {
    value: 'clinical-nurse-specialist',
    label: 'Clinical Nurse Specialist (CNS)',
  },
  { value: 'cardiac-nurse', label: 'Cardiac Nurse' },
  { value: 'oncology-nurse', label: 'Oncology Nurse' },
  { value: 'pediatric-nurse', label: 'Pediatric Nurse' },
  { value: 'geriatric-nurse', label: 'Geriatric Nurse' },
  { value: 'orthopedic-nurse', label: 'Orthopedic Nurse' },
  { value: 'neonatal-nurse', label: 'Neonatal Nurse' },
  {
    value: 'perioperative-operating-room-nurse',
    label: 'Perioperative / Operating Room (OR) Nurse',
  },
  { value: 'emergency-trauma-nurse', label: 'Emergency / Trauma Nurse' },
  { value: 'critical-care-icu-nurse', label: 'Critical Care / ICU Nurse' },
  {
    value: 'psychiatric-mental-health-nurse',
    label: 'Psychiatric / Mental Health Nurse',
  },
  { value: 'rehabilitation-nurse', label: 'Rehabilitation Nurse' },
  { value: 'infection-control-nurse', label: 'Infection Control Nurse' },
  { value: 'public-health-nurse', label: 'Public Health Nurse' },
  { value: 'community-health-nurse', label: 'Community Health Nurse' },
  { value: 'home-health-nurse', label: 'Home Health Nurse' },
  { value: 'school-nurse', label: 'School Nurse' },
  { value: 'nurse-educator', label: 'Nurse Educator' },
  { value: 'nurse-researcher', label: 'Nurse Researcher' },
  { value: 'nurse-informaticist', label: 'Nurse Informaticist' },
  {
    value: 'nurse-administrator-nurse-executive',
    label: 'Nurse Administrator / Nurse Executive',
  },
  { value: 'nurse-case-manager', label: 'Nurse Case Manager' },
  { value: 'nurse-consultant', label: 'Nurse Consultant' },
  { value: 'quality-improvement-nurse', label: 'Quality Improvement Nurse' },
  { value: 'forensic-nurse', label: 'Forensic Nurse' },
  { value: 'holistic-nurse', label: 'Holistic Nurse' },
  { value: 'telehealth-nurse', label: 'Telehealth Nurse' },
  { value: 'flight-transport-nurse', label: 'Flight / Transport Nurse' },
  { value: 'military-nurse', label: 'Military Nurse' },
  { value: 'occupational-health-nurse', label: 'Occupational Health Nurse' },
  {
    value: 'hospice-palliative-care-nurse',
    label: 'Hospice / Palliative Care Nurse',
  },
] as {
  value: z.infer<typeof nerseTitlesSchema>;
  label: string;
}[];

export const JOB_TITLES = titles;
