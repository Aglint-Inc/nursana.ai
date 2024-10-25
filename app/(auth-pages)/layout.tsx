import { unstable_noStore } from 'next/cache';
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  unstable_noStore();
  return (
    <div className='flex max-w-7xl flex-col items-start gap-12 w-full'>{children}</div>
  );
}
