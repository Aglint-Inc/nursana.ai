import {
  createParser,
  createSearchParamsCache,
  parseAsArrayOf,
  parseAsBoolean,
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral,
  parseAsTimestamp,
} from 'nuqs/server';

// Note: import from 'nuqs/server' to avoid the "use client" directive
import { ARRAY_DELIMITER, RANGE_DELIMITER } from './delimiters';
import { INTERVIEW_STAGES } from './interview_stages';

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
  email: parseAsString,
  campaign_code: parseAsArrayOf(parseAsString, ARRAY_DELIMITER),
  interview_stage: parseAsArrayOf(
    parseAsStringLiteral(INTERVIEW_STAGES),
    ARRAY_DELIMITER,
  ),
  terms_accepted: parseAsArrayOf(parseAsBoolean, ARRAY_DELIMITER),
  updated_at: parseAsArrayOf(parseAsTimestamp, RANGE_DELIMITER),
  rows: parseAsInteger.withDefault(10),
  page: parseAsInteger.withDefault(0),
};

export const searchParamsCache = createSearchParamsCache(searchParamsParser);
