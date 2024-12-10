import React from 'react';

import EmployerHero from './employer-sections/hero';
import { EmployerMainContent } from './employer-sections/main-content';
import Footer from './footer';

function EmployerPage() {
  return (
    <div className='w-full overflow-auto'>
      <EmployerHero />
      <EmployerMainContent />
      <Footer />
    </div>
  );
}

export default EmployerPage;
