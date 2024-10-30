import 'server-only'; /* eslint-disable no-console */

import axios from 'axios';
import { z } from 'zod';

import { type PublicProcedure, publicProcedure } from '@/server/api/trpc';

const schema = z.object({ text_query: z.string().nullish() });
const API_URL = 'https://places.googleapis.com/v1/places:autocomplete';

type ResponsePrediction = {
  placePrediction: {
    place: string;
    placeId: string;
    text: {
      text: string;
      matches: {
        endOffset: number;
      }[];
    };
    structuredFormat: {
      mainText: {
        text: string;
        matches: {
          endOffset: number;
        }[];
      };
      secondaryText: {
        text: string;
      };
    };
    types: string[];
  };
};

const query = async ({
  input: { text_query },
}: PublicProcedure<typeof schema>) => {
  if (!text_query || text_query?.length == 0) {
    return [];
  }
  const { data } = await axios.post(
    API_URL,
    {
      input: text_query,
      includedPrimaryTypes: ['(regions)'],
    },
    {
      headers: {
        'X-Goog-Api-Key': process.env.GOOGLE_PLACES_API_KEY,
      },
    },
  );
  console.log('debug', data);
  const predictions = data.suggestions as ResponsePrediction[];

  let response: {
    description: string;
    place_id: string;
  }[] = predictions.map(({ placePrediction }) => ({
    description: placePrediction.text.text,
    place_id: placePrediction.placeId,
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
