import { useVersion } from '@/version/hooks/useVersion';

export const Title = () => {
  const version = useVersion();
  return (
    <h1 className='flex flex-row items-center gap-2'>
      <p className='text-xl font-bold'>{version.template.name}</p>
      <p className='text-xl font-light'>{version.name}</p>
    </h1>
  );
};
