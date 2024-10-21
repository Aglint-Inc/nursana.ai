export function isArrayOfNumbers(arr: any): arr is number[] {
  if (!Array.isArray(arr)) return false;
  return arr.every((item) => typeof item === 'number');
}

export function isArrayOfDates(arr: any): arr is Date[] {
  if (!Array.isArray(arr)) return false;
  return arr.every((item) => item instanceof Date);
}

export function isArrayOfStrings(arr: any): arr is string[] {
  if (!Array.isArray(arr)) return false;
  return arr.every((item) => typeof item === 'string');
}

export function isArrayOfBooleans(arr: any): arr is boolean[] {
  if (!Array.isArray(arr)) return false;
  return arr.every((item) => typeof item === 'boolean');
}

export const INTERVIEW_STAGES = [
  'not_started',
  'interview_completed',
  'interview_inprogress',
  'resume_submitted',
] as const;

export const ARRAY_DELIMITER = ',';
export const SLIDER_DELIMITER = '-';
export const SPACE_DELIMITER = '_';
export const RANGE_DELIMITER = '-';
export const SORT_DELIMITER = '.';
