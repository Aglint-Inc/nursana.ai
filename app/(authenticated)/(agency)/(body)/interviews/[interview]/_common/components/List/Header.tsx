import { SidebarHeader } from '@/components/ui/sidebar';
import { useInterview } from '@/interview/hooks/useInterview';

// import { useList } from './Context';

export const Header = () => {
  return (
    <SidebarHeader className='w-full gap-3.5 border-b p-4'>
      <div className='flex items-center justify-between'>
        <Title />
        {/* <Actions /> */}
      </div>
      {/* <Search /> */}
    </SidebarHeader>
  );
};

const Title = () => {
  const { id } = useInterview();
  return (
    <div className='line-clamp-1 text-base font-medium text-foreground'>
      Interview {id}
    </div>
  );
};

// const _Actions = () => {
//   return (
//     <Button variant='outline' size='icon'>
//       <Plus />
//     </Button>
//   );
// };

// const Search = () => {
//   const { search, setSearch } = useList();
//   return (
//     <SidebarInput
//       placeholder='Type to search...'
//       type='text'
//       value={search}
//       onChange={(e) => setSearch(e.target.value)}
//     />
//   );
// };
