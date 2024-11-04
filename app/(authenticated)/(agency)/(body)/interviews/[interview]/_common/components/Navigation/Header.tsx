import { SidebarHeader } from '@/components/ui/sidebar';
import { useInterview } from '@/interview/hooks/useInterview';

export const Header = () => {
  return (
    <SidebarHeader className='w-full gap-3.5 border-b p-4'>
      <div className='flex items-center justify-between'>
        <Title />
      </div>
    </SidebarHeader>
  );
};

const Title = () => {
  const { user } = useInterview();
  return (
    <div className='line-clamp-1 text-base font-medium text-foreground'>
      {user.first_name}
    </div>
  );
};
