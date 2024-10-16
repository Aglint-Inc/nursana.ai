export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex min-h-[calc(100vh-156px)] flex-col gap-20'>
      {children}
    </div>
  );
}
