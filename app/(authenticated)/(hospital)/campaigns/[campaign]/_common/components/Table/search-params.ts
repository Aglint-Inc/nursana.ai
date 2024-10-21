import {
  createParser,
  createSearchParamsCache,
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral,
  parseAsTimestamp,
} from 'nuqs/server';

// Note: import from 'nuqs/server' to avoid the "use client" directive
import {
  ARRAY_DELIMITER,
  INTERVIEW_STAGES,
  RANGE_DELIMITER,
} from '@/campaign/constants';

export const parseAsSort = createParser({
  parse(queryValue) {
    const [id, desc] = queryValue.split('.');
    if (!id && !desc) return null;
    return { id, desc: desc === 'desc' };
  },
  serialize(value) {
    return `${value.id}.${value.desc ? 'desc' : 'asc'}`;
  },
});

export const searchParamsParser = {
  // FILTERS
  name: parseAsString,
  email: parseAsString,
  job_title: parseAsString,
  interview_stage: parseAsArrayOf(
    parseAsStringLiteral(INTERVIEW_STAGES),
    ARRAY_DELIMITER,
  ),
  updated_at: parseAsArrayOf(parseAsTimestamp, RANGE_DELIMITER),
  size: parseAsInteger.withDefault(10),
  start: parseAsInteger.withDefault(0),
};

export const searchParamsCache = createSearchParamsCache(searchParamsParser);
