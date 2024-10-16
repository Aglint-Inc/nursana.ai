import { unstable_noStore } from "next/cache";

export default function Layout({ children }: { children: React.ReactNode }) {
  unstable_noStore();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      {children}
    </div>
  );
}
