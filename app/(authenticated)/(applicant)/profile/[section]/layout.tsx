import { unstable_noStore } from 'next/cache';
import { api, HydrateClient } from 'trpc/server';

function Layout({ children }: { children: React.ReactNode }) {
  unstable_noStore();
  void api.user.get_data.prefetch();
  void api.user.getPreferredJobTitles.prefetch();
  void api.user.getPreferredJobTypes.prefetch();
  void api.user.getPreferredJobLocations.prefetch();
  void api.getLocationList.prefetch();
  return (
    <HydrateClient>
      <div className='lg:container flex lg:py-8 py-5 max-lg:w-full'>
        <div className='lg:flex lg:flex-1 flex-col gap-4 overflow-y-auto lg:p-4 pt-0'>
          {children}
        </div>
      </div>
    </HydrateClient>
  );
}

export default Layout;
