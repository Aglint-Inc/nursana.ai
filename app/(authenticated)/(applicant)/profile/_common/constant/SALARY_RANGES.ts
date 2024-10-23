type SalaryRange = Record<'value' | 'label', string>;

export const SALARY_RANGES: SalaryRange[] = [
  { value: '[30000,40000)', label: '$30,000 - $40,000' },
  { value: '[40000,50000)', label: '$40,000 - $50,000' },
  { value: '[50000,60000)', label: '$50,000 - $60,000' },
  { value: '[60000,70000)', label: '$60,000 - $70,000' },
  { value: '[70000,80000)', label: '$70,000 - $80,000' },
  { value: '[80000,100000)', label: '$80,000 - $100,000' },
  { value: '[100000,120000)', label: '$100,000 - $120,000' },
  { value: '[120000,150000)', label: '$120,000 - $150,000' },
  { value: '[150000,200000)', label: '$150,000 - $200,000' },
  // Add more ranges as needed
];
