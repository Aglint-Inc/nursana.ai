'use client';

import { useState } from 'react';
import { FormProvider } from 'react-hook-form';
import { api } from 'trpc/client';

import { uploadFileSchema } from '@/server/api/routers/upload/room';
import { useZodFormData } from '@/utils/zod-form-data';

export default function Page() {
  const mutation = api.upload.sendMessage.useMutation({
    onError(err) {
      alert('Error from server: ' + err.message);
    },
    trpc: {
      context: {
        upload: true,
      },
    },
  });

  const form = useZodFormData({
    schema: uploadFileSchema,
    defaultValues: {
      name: 'whadaaaap',
    },
  });

  const [noJs, setNoJs] = useState(false);

  return (
    <>
      <h2 className='text-3xl font-bold'>Posts</h2>

      <FormProvider {...form}>
        <form
          method='post'
          action={`/api/trpc/${mutation.trpc.path}`}
          encType='multipart/form-data'
          onSubmit={(_event) => {
            if (noJs) {
              return;
            }
            void form.handleSubmit(async (_values, event) => {
              const res = await mutation.mutateAsync(
                new FormData(event?.target),
              );
              console.log(res);
            })(_event);
          }}
          style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
          ref={form.formRef}
        >
          <fieldset>
            <legend>Form with file upload</legend>
            <div style={{}}>
              <label htmlFor='name'>Enter your name</label>
              <input {...form.register('name')} />
              {form.formState.errors.name && (
                <div>{form.formState.errors.name.message}</div>
              )}
            </div>

            <div>
              <label>Required file, only images</label>
              <input type='file' {...form.register('image')} />
              {form.formState.errors.image && (
                <div>{form.formState.errors.image.message}</div>
              )}
            </div>

            <div>
              <label>Post without JS</label>
              <input
                type='checkbox'
                checked={noJs}
                onChange={(e) => {
                  setNoJs(e.target.checked);
                }}
              />
            </div>
            <div>
              <button type='submit' disabled={mutation.status === 'pending'}>
                submit
              </button>
            </div>
          </fieldset>
        </form>
      </FormProvider>
    </>
  );
}
