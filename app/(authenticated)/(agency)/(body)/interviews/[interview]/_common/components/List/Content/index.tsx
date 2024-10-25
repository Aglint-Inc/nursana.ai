import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
} from '@/components/ui/sidebar';

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
      <Card path='home' />
      <Card path='resume' />
      <Card path='transcript' />
      <Card path='review' />
    </>
  );
};
