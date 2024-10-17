import Link from "next/link";
import React from "react";

import HeaderAuth from "@/components/header-auth";

import NursanaLogo from "./nursana-logo";
import Section from "./section";

const Navbar: React.FC = () => {
  return (
    <Section>
      <nav className="w-full flex items-center justify-center h-20">
        <div className="w-full flex justify-between items-center">
          <div className="flex gap-5 items-center font-semibold">
            <Link href="/" className="flex items-center justify-center">
             <NursanaLogo variant="md"/>
            </Link>
          </div>
          <HeaderAuth />
        </div>
      </nav>
    </Section>
  );
};

export default Navbar;
