import { Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import Section from "../section";
import { Button } from "../ui/button";

function PoweredBy() {
  return (
    <Section>
      <div className="bg-[url('/images/gradientbg.jpg')] bg-cover bg-center rounded-lg p-8 py-20 text-black">
        <div className="grid grid-cols-2 gap-10">
          <div className="flex flex-col gap-8 px-8 h-full justify-center items-start">
            <div className="flex items-center gap-2 text-lg text-purple-700">
              <Sparkles strokeWidth={1.2} size={24} />
              Powered by Aglint AI
            </div>
            <h1 className="text-5xl font-medium">
              Get an Unbiased and Professional Evaluation of Your Resume.
            </h1>
            <p className="text-lg text-gray-600">
              Our AI-driven resume analysis delivers an objective assessment of
              your resume, providing tailored recommendations to enhance its
              effectiveness while eliminating bias. Trust nursera.ai to empower
              your job search by showcasing your qualifications in a way that
              stands out to potential employers.
            </p>
            <Link href="/sign-up">
              {/* If user is loggedin then redirect to dashboard. CTS should chaneg and say Explore Opportunites */}
              <Button size={"lg"}>Sign Up Today</Button>
            </Link>
          </div>
          <div className="w-full flex items-center justify-center">
            <Image
              alt="powered by aglint ai"
              src={"/images/powered-by.png"}
              width={500}
              height={700}
            />
          </div>
        </div>
      </div>
    </Section>
  );
}

export default PoweredBy;
