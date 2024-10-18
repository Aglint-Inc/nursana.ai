import { type QueryParams } from "src/definitions/queryParams";

import { type PATHS } from "./allPaths";
import type { TYPE_SAFE_PARAMS } from "./typeSafeParams";

export type TYPE_SAFE_PATHS<
  key extends (typeof PATHS)[number] = (typeof PATHS)[number],
> = OmitNever<{
  params: key extends keyof (typeof TYPE_SAFE_PARAMS)["pages"]
    ? { [_ in (typeof TYPE_SAFE_PARAMS)["pages"][key][number]]: string }
    : never;
  searchParams: key extends keyof QueryParams ? QueryParams[key] : never;
}>;

type OmitNever<T> = { [K in keyof T as T[K] extends never ? never : K]: T[K] };
