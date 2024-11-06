import { unstable_noStore } from "next/cache";

export default function Layout({ children }: { children: React.ReactNode }) {
  unstable_noStore();
  return (
    // <div className="flex flex-col w-full h-screen overflow-auto items-center">
    <>
      {children}
      </>
    // </div>
  );
}
