export type CustomizableTypes<T extends 'Array' | 'Object'> = T extends 'Array'
  ? Record<string, unknown>[]
  : Record<string, unknown>;

export type Options<T extends CustomizableTypes<'Object'>> = Partial<{
  [_id in keyof T]: unknown;
}>;

export type CustomObject<
  T extends CustomizableTypes<'Object'>,
  U extends Options<T>,
> = keyof U extends infer R
  ? Nullable<
      T,
      //@ts-expect-error
      Omit<T, R> &
        Required<Pick<U, Extract<keyof RequiredOnly<T>, R>>> &
        Partial<Pick<U, Extract<keyof PartialOnly<T>, R>>>
    >
  : never;

export type Custom<
  T extends CustomizableTypes<'Object'> | CustomizableTypes<'Array'>,
  U extends T extends CustomizableTypes<'Object'>
    ? Options<T>
    : //@ts-expect-error
      Options<T[number]>,
> =
  T extends CustomizableTypes<'Object'>
    ? //@ts-expect-error
      CustomObject<T, U>
    : T extends CustomizableTypes<'Array'>
      ? CustomObject<T[number], U>
      : never;

type RequiredOnly<T extends CustomizableTypes<'Object'>> = Pick<
  T,
  {
    [id in keyof T]-?: undefined extends T[id] ? never : id;
  }[keyof T]
>;

type PartialOnly<T extends CustomizableTypes<'Object'>> = Omit<
  T,
  keyof RequiredOnly<T>
>;

type Nullable<
  T extends CustomizableTypes<'Object'>,
  U extends Options<T>,
  //@ts-expect-error
> = NullableOnly<T> extends infer R ? Omit<U, R> & Nullify<Pick<U, R>> : never;

type NullableOnly<T extends CustomizableTypes<'Object'>> = {
  [id in keyof T]: null extends T[id] ? id : never;
}[keyof T];

type Nullify<T extends CustomizableTypes<'Object'>> = {
  [id in keyof T]: T[id] | null;
};
