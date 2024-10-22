import { Loader } from '@/common/components/Loader';
import Section from '@/components/section';

const Loading = () => {
  return (
    <Section>
      <div className='flex h-[calc(100vh-164px)] w-full items-center justify-center'>
        <Loader />
      </div>
    </Section>
  );
};

export default Loading;
