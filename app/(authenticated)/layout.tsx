import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

import { AuthProvider } from "./_common/contexts/AuthContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="flex flex-col gap-20 min-h-[calc(100vh-156px)]">
        <AuthProvider>{children}</AuthProvider>
      </div>
      <Footer />
    </>
  );
}
