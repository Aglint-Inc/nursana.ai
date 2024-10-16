import Link from "next/link";
import React from "react";

import Section from "../section";
import { Button } from "../ui/button";

function CTA() {
  return (
    <Section>
      <div className="bg-muted h-96 rounded-lg p-16 flex flex-col items-center justify-center gap-6    text-center">
        <h1 className="text-5xl font-medium">
          Ready to Land Your Desired{" "}
          <span className="text-purple-600">Nursing Job?</span>
        </h1>
        <p className="text-lg text-muted-foreground">
          Join thousands of nurses using Nursana.ai to fast-track their careers.
          Don’t miss out on the perfect job opportunity.
        </p>
        <Link href="/sign-up">
          <Button size={"lg"}>Sign Up Today</Button>
        </Link>
      </div>
    </Section>
  );
}

export default CTA;
