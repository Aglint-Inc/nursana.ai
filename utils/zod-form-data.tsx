'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRef } from 'react';
import type { UseFormProps } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';

/**
 * zod-form-data wraps zod in an effect where the original type is a `FormData`
 */
type UnwrapZodEffect<TType extends z.ZodType> =
  TType extends z.ZodEffects<infer U, any, any> ? U : TType;

type GetInput<TType extends z.ZodType> = UnwrapZodEffect<TType>['_input'];

export function useZodFormData<TSchema extends z.ZodType>(
  props: Omit<UseFormProps<GetInput<TSchema>>, 'resolver'> & {
    schema: TSchema;
  },
) {
  const formRef = useRef<HTMLFormElement>(null);
  const _resolver = zodResolver(props.schema, undefined, {
    raw: false,
  });

  const form = useForm<GetInput<TSchema>>({
    ...props,
    resolver: (_, ctx, opts) => {
      if (!formRef.current) {
        return {
          values: {},
          errors: {
            root: {
              message: 'Form not mounted',
            },
          },
        };
      }
      const values = new FormData(formRef.current);
      return _resolver(values, ctx, opts);
    },
  });

  return { ...form, formRef };
}
