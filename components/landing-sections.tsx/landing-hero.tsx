import React from "react";
import Section from "../section";
import { Sparkle } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";

function LandingHero() {
  return (
    <Section>
      <div className="flex flex-col items-center justify-center gap-8 text-center ">
        <div className="flex flex-col gap-4 items-center justify-center">
          <h1 className="text-5xl font-medium max-w-4xl leading-tight">
            Fast-Track Your Nursing Career with AI-Powered Interviews.
          </h1>
          <p className="max-w-xl text-lg text-muted-foreground">
            Get hired quicker with AI-driven resume feedback and interviews
            designed to match you with the perfect job.
          </p>
        </div>
        <div
          className="rounded-md"
          style={{
            boxShadow: "0 0px 50px rgba(138, 43, 226, 0.3)",
          }}
        >
          <Image
            src={"/images/hero-image.png"}
            width={600}
            height={400}
            alt="nursera.ai"
          />
        </div>
        <Link href="/sign-up">
          <Button size="lg" className="text-lg">
            Sign Up Today
          </Button>
        </Link>
      </div>
    </Section>
  );
}

export default LandingHero;
