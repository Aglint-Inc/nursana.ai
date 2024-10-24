import Link from 'next/link';
import React from 'react';

import Section from '../section';
import { Button } from '../ui/button';

function CTA() {
  return (
    <Section>
      <div className="flex flex-col md:items-center justify-center gap-4 md:gap-6 rounded-lg bg-muted p-6 md:p-16 text-left md:text-center h-auto md:h-96">
        <h1 className="text-3xl md:text-5xl font-medium">
          Ready to Land Your Desired{' '}
          <span className="text-purple-600">Nursing Job?</span>
        </h1>
        <p className="text-base md:text-lg text-muted-foreground">
          Join thousands of nurses using Nursana.ai to fast-track their careers.
          Don’t miss out on the perfect job opportunity.
        </p>
        <Link href="/campaign/?campaign_code=SUMMER23NURSE">
          <Button size="lg">Get Started</Button>
        </Link>
      </div>
    </Section>
  );
}

export default CTA;