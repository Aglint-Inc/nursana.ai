"use client";

import { Calendar, CheckCircle, Clock, FileText } from "lucide-react";
import { useRouter } from "next/navigation";
import { type InterviewData } from "src/types/types";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface InterviewSummaryProps {
  interviewId: string;
  interviewData: InterviewData;
}

export default function InterviewSummary({
  interviewData,
}: InterviewSummaryProps) {
  const router = useRouter();
  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <div className="text-center mb-8">
        <div className="inline-block p-3 bg-green-100 rounded-full mb-4">
          <CheckCircle className="w-16 h-16 text-green-500" />
        </div>
        <h1 className="text-3xl font-bold mb-2">
          Interview completed successfully
        </h1>
        <p className="text-gray-600">
          Interview successfully completed. Head to the dashboard for more
          details.
        </p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-4">{interviewData.name}</h2>
          <div className="space-y-2">
            <div className="flex items-center text-gray-600">
              <Clock className="w-5 h-5 mr-2" />
              <span>{interviewData.candidate_estimated_time} Minutes</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Calendar className="w-5 h-5 mr-2" />
              <span>{new Date(Date.now()).toLocaleDateString()}</span>
            </div>
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full inline-flex items-center">
              <span className="text-sm font-medium">Completed</span>
              <span className="text-xs ml-2">
                {new Date(Date.now()).toLocaleTimeString()}
              </span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex items-center space-x-4 border-t pt-4">
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
          Go to dashboard
        </Button>
      </div>
    </div>
  );
}
