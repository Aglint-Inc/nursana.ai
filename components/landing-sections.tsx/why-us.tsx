import React from "react";
import Section from "../section";
import Image from "next/image";
import { Button } from "../ui/button";

function WhyUS() {
  return (
    <Section>
      <div className="flex flex-col gap-10">
        <div className="grid grid-cols-2 gap-10 items-center">
          <div className="flex flex-col gap-4 items-start">
            <h1 className="text-5xl font-medium">Why Nursera?</h1>
            <p className="text-lg text-muted-foreground">
              Our AI-driven resume analysis delivers an objective assessment of
              your resume, providing tailored recommendations to enhance its
              effectiveness while eliminating bias. Trust nursera.ai to empower
              your job search by showcasing your qualifications in a way that
              stands out to potential employers.
            </p>
            <Button>Sign Up Today</Button>
          </div>

          <div className="w-full flex items-center justify-end">
            <Image
              alt="Nurse Interview"
              src={"/images/interview.png"}
              width={480}
              height={700}
            />
          </div>
        </div>
        <div className="grid  grid-cols-3 gap-10">
          <div className="p-8 flex flex-col gap-4 bg-muted rounded-lg">
            <div className="text-xl font-medium">
              AI-Driven Interviews for Perfect Job Matches
            </div>
            <div className="text-lg text-muted-foreground">
              Nurses can take AI interviews that assess their skills and
              preferences. Based on the analysis, you'll receive job matches
              that align with your qualifications and career goals, ensuring you
              find the right fit in no time
            </div>
          </div>
          <div className="p-8 flex flex-col gap-4 bg-muted rounded-lg">
            <div className="text-xl font-medium">AI-Powered Resume Review</div>
            <div className="text-lg text-muted-foreground">
              Receive comprehensive feedback on your resume with our advanced AI
              technology. Our tools analyze your resume and provide personalized
              recommendations to enhance your chances of landing interviews with
              top employers.
            </div>
          </div>
          <div className="p-8 flex flex-col gap-4 bg-muted rounded-lg">
            <div className="text-xl font-medium">
              Seamless Process for Quick Matches
            </div>
            <div className="text-lg text-muted-foreground">
              The process is simple: take an AI interview, and let Nursera.ai do
              the rest. Our platform efficiently connects you with job
              opportunities that meet your criteria, making your job search
              smooth and hassle-free.
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default WhyUS;
