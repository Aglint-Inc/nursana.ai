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

export default function Component() {
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

  const removeJobTitle = (title: string) => {
    setPreferredJobTitles(preferredJobTitles.filter((t) => t !== title));
  };

  const removeLocation = (location: string) => {
    setPreferredLocations(preferredLocations.filter((l) => l !== location));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h1 className="text-2xl font-bold mb-4">
            Interview for Pediatric Nurse
          </h1>
          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              12 Minutes
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              24 September 2024
            </div>
            <div>07:24 PM</div>
          </div>

          <Card className="mb-6">
            <CardContent className="p-4 flex items-center space-x-4">
              <FileText className="w-8 h-8 text-red-500" />
              <div>
                <p className="font-medium">caty-pery-pediatric.pdf</p>
                <p className="text-sm text-gray-500">94 KB</p>
              </div>
              <Button variant="link" className="ml-auto">
                view resume
              </Button>
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
                  <p className="mb-4">
                    Your resume presents a solid background in pediatric
                    nursing, highlighting your education and hands-on experience
                    in various healthcare settings. Below are a few suggestions
                    for improvement:
                  </p>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold flex items-center">
                        Experience{" "}
                        <Badge variant="secondary" className="ml-2">
                          High 85%
                        </Badge>
                      </h3>
                      <p className="text-sm text-gray-600">
                        Extensive experience in pediatric emergency care,
                        administering vaccinations, managing chronic illnesses,
                        and supporting recovery from surgical procedures. Proven
                        ability to collaborate with interdisciplinary teams to
                        deliver holistic child care.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold flex items-center">
                        Skill{" "}
                        <Badge variant="secondary" className="ml-2">
                          Medium 78%
                        </Badge>
                      </h3>
                      <p className="text-sm text-gray-600">
                        Expertise in child development, pain management, and
                        handling sensitive pediatric cases. Skilled in
                        child-centric communication and education for both
                        patients and parents to ensure comfort and
                        understanding.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold flex items-center">
                        Education{" "}
                        <Badge variant="secondary" className="ml-2">
                          High 95%
                        </Badge>
                      </h3>
                      <p className="text-sm text-gray-600">
                        Comprehensive understanding of pediatric nursing
                        principles, backed by formal education and ongoing
                        training in the latest child healthcare techniques and
                        practices.
                      </p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="interview">
                  <p>
                    Interview feedback will be available here after the
                    interview is completed.
                  </p>
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
