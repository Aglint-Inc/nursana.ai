"use client";

import { Sparkles, UploadCloud, UserCheck } from "lucide-react";
import React from "react";
import StepperCard from "../stepperCard";
import Section from "../section";



function HowItWorks() {
  return (
    <Section>
    <div className="flex flex-col gap-20">
      <div className="max-w-screen-xl flex flex-col gap-2 items-center">
        <h1 className="text-5xl font-medium">
          Nursera connects you with top-tier opportunities,
        </h1>
        <h1 className="text-5xl font-medium">
          opening doors you didn’t even know existed.
        </h1>
      </div>
      <div>
        <div className="grid grid-cols-3 gap-28">
          <StepperCard
            heading="Upload your resume"
            description=" Add your resume, choose your ideal job title, and get
                interview-ready.This helps us match you with the right
                opportunities!"
            icon={UploadCloud}
            color="blue"
          />

          <StepperCard
            heading="Take A Brief Interview"
            description=" Spend 10 minutes in a quick interview based on your job title and resume, which will be used to assess your suitability for the job."
            icon={Sparkles}
            color="orange"
          />

          <StepperCard
            heading="Sit back and relax!"
            description=" Set your preferences and watch as the AI instantly matches you with ideal job opportunities tailored just for you!"
            icon={UserCheck}
            color="green"
          />
        </div>
      </div>
    </div>
    </Section>
  );
}

export default HowItWorks;
