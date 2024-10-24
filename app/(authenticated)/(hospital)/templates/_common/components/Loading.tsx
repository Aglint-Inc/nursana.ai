import Loader from '@/common/components/Loading';
import { SidebarInset } from '@/components/ui/sidebar';

export const Loading = () => {
  return (
    <SidebarInset>
      <div>
        <Loader />
      </div>
    </SidebarInset>
  );
};
