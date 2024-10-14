"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Calendar, FileText, Play, X } from "lucide-react";
import Image from "next/image";
import { useNurseData } from "@/app/hooks/useNurseData";
import { format } from "date-fns";
import { useAuth } from "@/app/contexts/AuthContext";

export default function NurseHomePage() {
  const [preferredJobTitles, setPreferredJobTitles] = useState([
    "Pediatric Nurse",
    "Critical Care Nurse",
    "Registered Nurse",
  ]);
  const [preferredLocations, setPreferredLocations] = useState([
    "Great Falls, Maryland",
    "Corona, Michigan",
    "Lansing, Illinois",
  ]);

  const { userId } = useAuth();
  console.log("userId from the nurse home page", userId);
  const nurseId = "d3122c67-70b9-421b-9a6d-0fdea60fc856";
  const { data: nurseData, isLoading, error } = useNurseData(nurseId);
  console.log("nurseData from the nurse home page", nurseData);
  const removeJobTitle = (title: string) => {
    setPreferredJobTitles(preferredJobTitles.filter((t) => t !== title));
  };

  const removeLocation = (location: string) => {
    setPreferredLocations(preferredLocations.filter((l) => l !== location));
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h1 className="text-2xl font-bold mb-4">
            Interview for {nurseData?.nurse?.job_title || "Nurse"}
          </h1>
          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {nurseData?.analysis?.duration
                ? `${Math.round(nurseData.analysis.duration / 60)} Minutes`
                : "N/A"}
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {nurseData?.interview?.created_at
                ? format(
                    new Date(nurseData.interview.created_at),
                    "dd MMMM yyyy"
                  )
                : "N/A"}
            </div>
            <div>
              {nurseData?.interview?.created_at
                ? format(new Date(nurseData.interview.created_at), "hh:mm a")
                : "N/A"}
            </div>
          </div>

          <Card className="mb-6">
            <CardContent className="p-4 flex items-center space-x-4">
              <FileText className="w-8 h-8 text-red-500" />
              <div>
                <p className="font-medium">
                  {nurseData?.resume?.file_name || "No resume uploaded"}
                </p>
                <p className="text-sm text-gray-500">
                  {nurseData?.resume?.file_size || "N/A"}
                </p>
              </div>
              {nurseData?.resume?.file_url && (
                <Button variant="link" className="ml-auto">
                  <a
                    href={nurseData.resume.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    view resume
                  </a>
                </Button>
              )}
            </CardContent>
          </Card>

          <Card className="mb-6 overflow-hidden">
            <CardContent className="p-0 relative">
              <Image
                src="/images/interview-cover.png"
                alt="Interview video thumbnail"
                className="w-full h-auto"
                width={600}
                height={338}
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <Button
                  variant="secondary"
                  size="lg"
                  className="flex items-center"
                >
                  <Play className="w-6 h-6 mr-2" />
                  Replay Interview
                </Button>
              </div>
              <div className="absolute top-4 right-4 bg-white p-2 rounded-lg">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-full"></div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold flex items-center mb-4">
                <span className="text-purple-600 mr-2">✦</span> AI Feedback
              </h2>
              <Tabs defaultValue="resume">
                <TabsList className="mb-4">
                  <TabsTrigger value="resume">Resume Review</TabsTrigger>
                  <TabsTrigger value="interview">
                    Interview Feedback
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="resume">
                  {nurseData?.analysis?.structured_analysis ? (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: nurseData.analysis.structured_analysis,
                      }}
                    />
                  ) : (
                    <p>No resume feedback available.</p>
                  )}
                </TabsContent>
                <TabsContent value="interview">
                  {nurseData?.analysis?.structured_analysis ? (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: nurseData.analysis.structured_analysis,
                      }}
                    />
                  ) : (
                    <p>No interview feedback available.</p>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                Set Up Your Preferences
              </h2>
              <p className="text-sm text-gray-600 mb-6">
                Tailor your preferences to help us match you with the most
                suitable job opportunities.
              </p>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Preferred Job Titles
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {preferredJobTitles.map((title, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="flex items-center"
                      >
                        {title}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="ml-1 h-auto p-0"
                          onClick={() => removeJobTitle(title)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose from the list" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nurse">Nurse</SelectItem>
                      <SelectItem value="doctor">Doctor</SelectItem>
                      <SelectItem value="surgeon">Surgeon</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Preferred Locations
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {preferredLocations.map((location, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="flex items-center"
                      >
                        {location}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="ml-1 h-auto p-0"
                          onClick={() => removeLocation(location)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose from the list" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newyork">New York, NY</SelectItem>
                      <SelectItem value="losangeles">
                        Los Angeles, CA
                      </SelectItem>
                      <SelectItem value="chicago">Chicago, IL</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Job Type
                  </label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Full time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fulltime">Full time</SelectItem>
                      <SelectItem value="parttime">Part time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Travel
                  </label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Yes" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Desired Salary (yearly)
                  </label>
                  <Input type="text" placeholder="eg: $20000" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
