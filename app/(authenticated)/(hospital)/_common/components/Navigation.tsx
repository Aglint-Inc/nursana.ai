import Link from 'next/link';

export const Navigation = () => {
  return (
    <>
      <Link href={'/campaigns'}>Campaigns</Link>
      <Link href={'/templates'}>Templates</Link>
      <Link href={'/applications'}>Applications</Link>
    </>
  );
};
