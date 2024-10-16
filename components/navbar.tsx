import Link from "next/link";
import React from "react";

import HeaderAuth from "@/components/header-auth";

import Section from "./section";

const Navbar: React.FC = () => {
  return (
    <Section>
      <nav className="w-full flex justify-center">
        <div className="w-full flex justify-between items-center py-6">
          <div className="flex gap-5 items-center font-semibold">
            <Link href="/" className="text-3xl font-light">
              <span className="font-medium ">Nursana</span>
              <span className="font-light text-purple-500">.ai</span>
            </Link>
          </div>
          <HeaderAuth />
        </div>
      </nav>
    </Section>
  );
};

export default Navbar;
