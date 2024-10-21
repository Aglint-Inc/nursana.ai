import { Body } from '@/campaign/components/Body';
import { Table } from '@/campaign/components/Table';
import { SidebarInset } from '@/components/ui/sidebar';

const Page = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  return (
    <SidebarInset>
      <Body>
        <Table searchParams={searchParams} />
      </Body>
    </SidebarInset>
  );
};

export default Page;
