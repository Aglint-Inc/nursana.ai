"use client";
import { format } from "date-fns";
import { Calendar, ExternalLink, FileText } from "lucide-react";
import { useState } from "react";

import { AudioPlayer } from "@/common/components/AudioPlayer";
import {
  type AIAnalysis,
  InterviewAnalysis,
} from "@/common/components/InterviewAnalysis";
import { InterviewTranscript } from "@/common/components/InterviewTranscript";
import { PreferencesEdit } from "@/common/components/PreferencesEdit";
import { PreferencesView } from "@/common/components/PreferencesView";
import {
  type ResumeData,
  ResumeReview,
} from "@/common/components/ResumeReview";
import { VideoPlayer } from "@/common/components/VideoPlayer";
import { useNurseData } from "@/common/hooks/useNurseData";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Section from "@/components/section";

export default function NurseHomePage() {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    refetch();
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  // interview ID cad4cf00-6371-46eb-b51a-5bb97bc5a930
  const nurseId = "d6b2cf82-3f60-4886-893e-b472fb56b9e8";
  const { data: nurseData, isLoading, error, refetch } = useNurseData(nurseId);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Section>
      <div className="py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <span className="text-lg text-muted-foreground">
              Hello, {nurseData?.nurse?.first_name || "to Nursera"} 👋🏻
            </span>
            <h1 className="text-2xl font-medium mb-4">
              Find you interview & resume feedback here
            </h1>
            <Tabs defaultValue="interview">
              <TabsList className="mb-4">
                <TabsTrigger value="interview">Interview Feedback</TabsTrigger>
                <TabsTrigger value="resume">Resume Review</TabsTrigger>
                <TabsTrigger value="transcript">
                  Interview Transcript
                </TabsTrigger>
              </TabsList>
              <TabsContent value="resume">
                {nurseData?.resume?.structured_resume ? (
                  <ResumeReview
                    data={nurseData.resume.structured_resume as ResumeData}
                  />
                ) : (
                  <p>No resume feedback available.</p>
                )}
              </TabsContent>
              <TabsContent value="interview">
                {nurseData?.analysis?.call_analysis && (
                  <InterviewAnalysis
                    analysis={nurseData.analysis.call_analysis as AIAnalysis}
                  />
                )}
              </TabsContent>
              <TabsContent value="transcript">
                {nurseData?.analysis?.transcript ? (
                  <InterviewTranscript
                    transcript={nurseData.analysis.transcript}
                  />
                ) : (
                  <p>No interview transcript available.</p>
                )}
              </TabsContent>
            </Tabs>
          </div>

          <div className="mt-[140px]">
            
           
            <Card className="overflow-hidden border-none shadow-none bg-secondary">
              <CardContent className="p-0">
                {nurseData?.analysis?.video_url ? (
                  <VideoPlayer videoUrl={nurseData.analysis.video_url} />
                ) : (
                  <AspectRatio ratio={16 / 9}>
                    <div className="flex items-center justify-center h-full bg-gray-200 text-gray-500">
                      No video available
                    </div>
                  </AspectRatio>
                )}
                {nurseData?.analysis?.audio_url && (
                  <AudioPlayer audioUrl={nurseData.analysis.audio_url} />
                )}



              <div className="flex items-center text-sm text-muted-foreground gap-2 p-4 pt-0">
                {/* */}
                <span>
                {nurseData?.interview?.created_at
                  ? format(
                      new Date(nurseData.interview.created_at),
                      "dd MMMM yyyy"
                    )
                  : "N/A"}
</span>
<span>
                at
                </span>
                <span>
                {nurseData?.interview?.created_at
                  ? format(new Date(nurseData.interview.created_at), "hh:mm a")
                  : "N/A"}
                  </span>
               
              </div>

              </CardContent>
            </Card>

            <Card className="group border-none bg-secondary my-4">
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <FileText
                      className="w-10 h-10 text-muted-foreground mr-2"
                      strokeWidth={1}
                    />

                    <div>
                      <p className="font-medium text-md">
                        {nurseData?.resume?.file_name || "No resume uploaded"}
                      </p>
                      <p className="text-sm  text-muted-foregroun">
                        {nurseData?.resume?.file_size || "N/A"}
                      </p>
                    </div>
                  </div>
                  {nurseData?.resume?.file_url && (
                    <div className="group relative">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      >
                        <a
                          href={nurseData.resume.file_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            {isEditing ? (
              <PreferencesEdit
                nurseData={nurseData?.nurse || null}
                onSave={handleSave}
                onCancel={handleCancel}
              />
            ) : (
              <PreferencesView
                nurseData={nurseData?.nurse || null}
                onEdit={handleEdit}
              />
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
