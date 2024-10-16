"use client";

import { Calendar, Clock, FileText } from "lucide-react";
import { useRouter } from "next/navigation";
import { type InterviewData } from "src/types/types";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

import Footer from "./footer";
import NursanaLogo from "./nursana-logo";

interface InterviewSummaryProps {
  interviewId: string;
  interviewData: InterviewData;
}

export default function InterviewSummary({
  interviewData,
}: InterviewSummaryProps) {
  const router = useRouter();
  return (
    <div className=" flex flex-col items-center">
      <div className="h-[calc(100vh-72px)] pt-10 flex flex-col items-center">
        <div className="">
      <NursanaLogo/>
      </div>
      <div className="text-2xl font-medium text-center mb-1 flex">
        <span>Interview completed successfully 🎉</span>
      </div>
      <p className="text-center text-muted-foreground mb-6 max-w-xl">
        Interview successfully completed. Head to the dashboard for more
        details.
      </p>
      <Card className="w-full bg-secondary">
        <CardContent className="p-4">
          <h2 className="text-lf  font-medium mb-2">{interviewData.name}</h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center text-gray-600">
              <Clock className="w-5 h-5 mr-2" />
              <span>{interviewData.candidate_estimated_time}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Calendar className="w-5 h-5 mr-2" />
              <span>{new Date(Date.now()).toLocaleDateString()}</span>
            </div>
            
          </div>

        </CardContent>
        <CardFooter className="hidden  items-center space-x-4 border-t pt-4">
          <div className="flex items-center space-x-2 text-gray-600">
            <FileText className="w-5 h-5" />
            <div>
              <p className="text-sm font-medium">
                {interviewData.candidate_intro_video_url}
              </p>
              <p className="text-xs">
                {interviewData.candidate_intro_video_cover_image_url}
              </p>
            </div>
          </div>
          <Button
            variant="link"
            className="ml-auto text-blue-600 hover:text-blue-800"
          >
            view resume
          </Button>
        </CardFooter>
      </Card>
      <div className="mt-8 text-center">
        <Button
          className="w-full"
          size="lg"
          onClick={() => {
            router.push(`/magic-link`);
          }}
        >
          View Resume Feedback
        </Button>
      </div>
      </div>
      <Footer/>
    </div>
  );
}
