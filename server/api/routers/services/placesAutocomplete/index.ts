import 'server-only'; /* eslint-disable no-console */

import axios from 'axios';
import { z } from 'zod';

import { type PublicProcedure, publicProcedure } from '@/server/api/trpc';

const schema = z.object({ text_query: z.string().nullish() });
const API_URL = 'https://maps.googleapis.com/maps/api/place/autocomplete/json';

type ResponsePrediction = {
  description: string;
  matched_substrings: {
    length: number;
    offset: number;
  }[];
  place_id: string;
  reference: string;
  structured_formatting: {
    main_text: string;
    main_text_matched_substrings: {
      length: number;
      offset: number;
    }[];
    secondary_text: string;
  };
  terms: {
    offset: number;
    value: string;
  }[];
  types: string[];
};

const query = async ({
  input: { text_query },
}: PublicProcedure<typeof schema>) => {
  if (!text_query || text_query?.length == 0) {
    return [];
  }
  const { data } = await axios.get(API_URL, {
    params: {
      input: text_query,
      types: 'geocode',
      key: process.env.GOOGLE_PLACES_API_KEY,
    },
  });
  const predictions = data.predictions as ResponsePrediction[];

  let response: Pick<ResponsePrediction, 'description' | 'place_id'>[] =
    predictions.map((pred) => ({
      description: pred.description,
      place_id: pred.place_id,
    }));
  if (response.length === 0) {
    response = [
      {
        description: 'No Results Found',
        place_id: '0',
      },
    ];
  }
  return response;
};

export const placesAutocomplete = publicProcedure.input(schema).mutation(query);
