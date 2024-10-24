import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { useVersion } from '@/version/hooks/useVersion';

export const Title = () => {
  const version = useVersion();
  const { push } = useRouter();
  return (
    <h1 className='flex flex-row items-center gap-2'>
      <p className='text-xl font-bold'>{version.template.name}</p>
      <p className='text-xl font-light'>{version.name}</p>
      <Button onClick={() => push('/templates')} size={'sm'} variant={'ghost'}>
        Back
      </Button>
    </h1>
  );
};
