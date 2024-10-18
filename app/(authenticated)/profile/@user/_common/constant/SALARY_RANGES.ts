type SalaryRange = Record<'value' | 'label', string>;

export const SALARY_RANGES: SalaryRange[] = [
  { value: '30k-40k', label: '$30,000 - $40,000' },
  { value: '40k-50k', label: '$40,000 - $50,000' },
  { value: '50k-60k', label: '$50,000 - $60,000' },
  { value: '60k-70k', label: '$60,000 - $70,000' },
  { value: '70k-80k', label: '$70,000 - $80,000' },
  { value: '80k-100k', label: '$80,000 - $100,000' },
  { value: '100k-120k', label: '$100,000 - $120,000' },
  { value: '120k-150k', label: '$120,000 - $150,000' },
  { value: '150k+', label: '$150,000+' },
  // Add more ranges as needed
];
