import { File, UploadCloud, X } from 'lucide-react';
import React, {
  type Dispatch,
  type SetStateAction,
  useCallback,
  useState,
} from 'react';

import LoadingWapper from '@/common/components/LoadingWapper';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { type FormCampaign } from '../types';

function ResumeUpload({
  form,
  setForm,
  saving,
}: {
  form: FormCampaign;
  setForm: Dispatch<SetStateAction<FormCampaign>>;
  saving: boolean;
}) {
  const [dragActive, setDragActive] = useState(false);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setForm({ ...form, file: event.target.files[0] });
    }
  };

  const handleDrag = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setForm({ ...form, file: e.dataTransfer.files[0] });
    }
  }, []);

  return (
    <LoadingWapper loading={saving}>
      <div className='flex flex-col gap-1'>
        {!form.file ? (
          <div
            className={`mt-2 relative flex justify-center rounded-lg border border-dashed ${
              dragActive ? 'bg-background' : 'bg-background'
            } px-6 py-6`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className='flex w-full flex-col items-center justify-center gap-2 text-center'>
              <UploadCloud
                className='h-12 w-12 text-muted-foreground'
                aria-hidden='true'
                strokeWidth={1.2}
              />
              <div>
                <div className='flex flex-row gap-2 text-sm leading-6 text-gray-600'>
                  <label
                    htmlFor='file-upload'
                    className='rounded-md font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 hover:text-primary/80'
                  >
                    <span>Upload a file</span>
                    <Input
                      id='file-upload'
                      name='file-upload'
                      type='file'
                      className=' absolute z-20 w-full left-0 opacity-0 h-full top-0 cursor-pointer'
                      onChange={handleFileChange}
                      accept='.pdf,.doc,.docx'
                    />
                  </label>

                  <p className='text-muted-foreground'> or drag and drop</p>
                </div>
                <p className='text-xs leading-5 text-muted-foreground'>
                  PDF, DOC up to 10MB
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className='mt-2'>
            <div className='flex items-center justify-between rounded border-input bg-background px-4 py-6 shadow-none'>
              <div className='flex items-center gap-3'>
                <File size={30} className='text-muted-foreground' />
                <span className='text-md truncate'>{form.file?.name}</span>
              </div>

              <Button
                variant='ghost'
                onClick={() => setForm({ ...form, file: null })}
              >
                <X className='h-4 w-4' />
              </Button>
            </div>
          </div>
        )}
      </div>
    </LoadingWapper>
  );
}

export default ResumeUpload;
