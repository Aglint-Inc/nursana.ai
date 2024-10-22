type JobTitle = Record<'value' | 'label', string>;

export const JOB_TITLES: JobTitle[] = [
  { value: 'registered-nurse', label: 'Registered Nurse' },
  { value: 'nurse-practitioner', label: 'Nurse Practitioner' },
  { value: 'licensed-practical-nurse', label: 'Licensed Practical Nurse' },
  { value: 'clinical-nurse-specialist', label: 'Clinical Nurse Specialist' },
  { value: 'certified-nurse-midwife', label: 'Certified Nurse Midwife' },
  // Add more job titles as needed
];
