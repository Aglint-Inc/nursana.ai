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
      <div className='container flex py-8'>
        <div className='flex flex-1 flex-col gap-4 overflow-y-auto p-4 pt-0'>
          {children}
        </div>
      </div>
    </HydrateClient>
  );
}

export default Layout;
