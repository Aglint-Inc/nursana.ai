import Link from 'next/link';

export const Navigation = () => {
  return (
    <>
      <Link href={'/camapigns'}>Campaigns</Link>
      <Link href={'/templates'}>Templates</Link>
      <Link href={'/Applications'}>Applications</Link>
    </>
  );
};
