import { unstable_noStore } from "next/cache";

export default function Layout({ children }: { children: React.ReactNode }) {
  unstable_noStore();
  return (
    <div className="flex flex-col w-full h-screen px-4 overflow-auto pt-4">
      {children}
    </div>
  );
}
