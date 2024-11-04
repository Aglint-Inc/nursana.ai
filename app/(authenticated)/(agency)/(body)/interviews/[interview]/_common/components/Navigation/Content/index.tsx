import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
} from '@/components/ui/sidebar';
import { PATHS } from '@/interview/constants/paths';

import { Card } from './Card';

export const Content = () => {
  return (
    <SidebarContent>
      <SidebarGroup className='px-0'>
        <SidebarGroupContent>
          <List />
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
};

const List = () => {
  return (
    <>
      {PATHS.map((path) => (
        <Card key={path} path={path} />
      ))}
    </>
  );
};
