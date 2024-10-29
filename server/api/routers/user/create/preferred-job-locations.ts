/* eslint-disable no-unused-vars */
import 'server-only';

import axios from 'axios';
import { z } from 'zod';

import { type ApplicantProcedure, applicantProcedure } from '@/server/api/trpc';
import { createPublicClient } from '@/server/db';
const API_URL = 'https://places.googleapis.com/v1/places/';

export const schema = z.object({
  maps_place_id: z.string(),
  place_description: z.string(),
});
type AddressComponentType = {
  long_name: string;
  short_name: string;
  types: AddressType[];
};

enum AddressType {
  SublocalityLevel3 = 'sublocality_level_3',
  SublocalityLevel2 = 'sublocality_level_2',
  SublocalityLevel1 = 'sublocality_level_1',
  Locality = 'locality',
  AdministrativeAreaLevel3 = 'administrative_area_level_3',
  AdministrativeAreaLevel2 = 'administrative_area_level_2',
  AdministrativeAreaLevel1 = 'administrative_area_level_1',
  Country = 'country',
  PostalCode = 'postal_code',
  Political = 'political',
  Sublocality = 'sublocality',
}

type AddressResult = {
  addressComponents: AddressComponentType[];
};
const mutation = async ({
  ctx: { user_id },
  input: { maps_place_id, place_description },
}: ApplicantProcedure<typeof schema>) => {
  const supabase = createPublicClient();

  const { city, country, state } = await getPlaceDetails(maps_place_id);
  const { data: location_list } = await supabase
    .from('locations_list')
    .upsert({
      city: city.long_name,
      country: country.long_name,
      level: place_description,
      state: state.long_name,
      place_id: maps_place_id,
    })
    .select()
    .single()
    .throwOnError();
  if (!location_list) {
    throw Error('locations list undefined');
  }
  const { data } = await supabase
    .from('preferred_locations')
    .upsert({
      applicant_id: user_id,
      location_id: location_list.id,
    })
    .select()
    .single()
    .throwOnError();
};

export const createPreferredJobLocations = applicantProcedure
  .input(schema)
  .mutation(mutation);

const getPlaceDetails = async (place_id: string) => {
  const { data } = await axios.get(API_URL + '/' + place_id, {
    headers: {
      'X-Goog-Api-Key': process.env.GOOGLE_PLACES_API_KEY,
      'X-Goog-FieldMask': '*',
    },
  });
  const address = data as AddressResult;
  const addressComponents = address.addressComponents;
  const city = addressComponents.find((component) =>
    component.types.includes(AddressType.Locality),
  );
  const state = addressComponents.find((component) =>
    component.types.includes(AddressType.AdministrativeAreaLevel1),
  );
  const country = addressComponents.find((component) =>
    component.types.includes(AddressType.Country),
  );
  const postal_code = addressComponents.find((component) =>
    component.types.includes(AddressType.PostalCode),
  );
  if (!city || !state || !country || !postal_code) {
    throw new Error('Invalid place_id');
  }
  return {
    city,
    state,
    country,
    postal_code,
  };
};
