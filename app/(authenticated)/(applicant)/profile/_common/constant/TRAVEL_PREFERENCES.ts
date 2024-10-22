type TravelPreference = Record<'value' | 'label', string>;
export const TRAVEL_PREFERENCES: TravelPreference[] = [
  { value: 'no-travel', label: 'No Travel' },
  { value: 'occasional-travel', label: 'Occasional Travel' },
  { value: 'frequent-travel', label: 'Frequent Travel' },
  { value: 'up-to-50-travel', label: 'Up to 50% Travel' },
  { value: 'up-to-75-travel', label: 'Up to 75% Travel' },
  { value: '100-travel', label: '100% Travel' },
];
