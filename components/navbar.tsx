import React from 'react';
import Link from 'next/link';
import HeaderAuth from "@/components/header-auth";

const Navbar: React.FC = () => {
    return (
      <nav className="w-full flex justify-center   h-16">
        <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
          <div className="flex gap-5 items-center font-semibold">
            <Link href="/" className="text-2xl font-light">
             <span className='font-medium '>Nursera</span><span className='font-light text-purple-500'>.ai</span>
            </Link>
          </div>
          <HeaderAuth />
        </div>
      </nav>
    );
  };
  
  export default Navbar;