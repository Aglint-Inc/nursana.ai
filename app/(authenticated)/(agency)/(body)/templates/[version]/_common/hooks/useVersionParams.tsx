import { useParams } from 'next/navigation';

export const useVersionParams = () => {
  const params = useParams() as any;
  return {
    version: params.version as string,
  };
};
