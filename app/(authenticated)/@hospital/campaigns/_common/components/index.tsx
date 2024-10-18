import { Create } from './Create';
import { List } from './List';

export const Campaigns = () => {
  return (
    <div className='grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3'>
      <List />
      <Create />
    </div>
  );
};
