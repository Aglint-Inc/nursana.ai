import axios from "axios";

// const GEO_LOCATION_API_KEY = process.env.GEO_LOCATION_API_KEY;
// if (!GEO_LOCATION_API_KEY) {
//   throw new Error("GEO_LOCATION_API_KEY environment variables are required.");
// }
export const getLocation = (address: string) => {
  return axios
    .get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyDO-310g2JDNPmN3miVdhXl2gJtsBRYUrI`
    )
    .then(({ data }) => {
      try {
        const result = data?.results[0];

        const city = result?.address_components.find((component: any) =>
          component.types.includes("locality")
        )?.long_name as string | undefined;
        const state = result?.address_components.find((component: any) =>
          component.types.includes("administrative_area_level_1")
        )?.long_name as string | undefined;
        const country = result?.address_components.find((component: any) =>
          component.types.includes("country")
        )?.long_name as string | undefined;

        // const city = cityObj ? cityObj.long_name : null;
        // const state = stateObj ? stateObj.long_name : null;
        // const country = countryObj ? countryObj.long_name : null;
        if (result?.geometry?.location.lng && result?.geometry?.location.lat)
          return {
            city,
            state,
            country,
            geolocation: `POINT(${result?.geometry?.location.lng} ${result?.geometry?.location.lat})`,
          };
        throw new Error("No location data");
      } catch (e) {
        throw new Error(`Error in getLocation: ${String(e)}`);
      }
    });
};
