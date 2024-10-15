import { unstable_noStore } from "next/cache";
import { api, HydrateClient } from "trpc/server";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  unstable_noStore();
  void api.user.auth.prefetch();
  return (
    <HydrateClient>
      <Navbar />
      <div className="flex flex-col gap-20 min-h-[calc(100vh-156px)]">
        {children}
      </div>
      <Footer />
    </HydrateClient>
  );
}
