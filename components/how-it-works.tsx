"use client";

import { Sparkles, UploadCloud, UserCheck } from "lucide-react";
import React from "react";
import StepperCard from "./stepperCard";



function HowItWorks() {
  return (
    <div className="flex flex-col gap-16">
      <div className="max-w-screen-xl flex flex-col gap-2 items-center">
        <h1 className="text-4xl font-bold">
          Nursera connects you with top-tier opportunities,
        </h1>
        <h1 className="text-4xl font-bold">
          opening doors you didn’t even know existed.
        </h1>
      </div>
      <div>
        <div className="grid grid-cols-[1fr_max-content_1fr_max-content_1fr] gap-8">
          <StepperCard
            heading="Upload your resume"
            description=" Add your resume, choose your ideal job title, and get
                interview-ready.This helps us match you with the right
                opportunities!"
            icon={UploadCloud}
            color="blue"
          />
          <div className="w-1"></div>
          <StepperCard
            heading="Take A Brief Interview"
            description=" Spend 10 minutes in a quick interview based on your job title and resume, which will be used to assess your suitability for the job."
            icon={Sparkles}
            color="orange"
          />
          <div className="w-1"></div>
          <StepperCard
            heading="Sit back and relax while matches come to you!"
            description=" Set your preferences and watch as the AI matches you with
                suitable job opportunities!"
            icon={UserCheck}
            color="green"
          />
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;
