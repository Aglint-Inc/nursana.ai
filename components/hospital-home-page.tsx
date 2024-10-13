"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

type Candidate = {
  id: string;
  name: string;
  jobTitle: string;
  avatarUrl: string;
  resumeScore: "Top Match" | "Good Match" | "Not a match";
  interviewImpression: "Outstanding" | "Excellent" | "Good" | "Below Average";
  city: string;
  state: string;
  country: string;
  interviewDate: string;
};

const candidates: Candidate[] = [
  {
    id: "1",
    name: "Cameron Williamson",
    jobTitle: "Nurse Anesthetist",
    avatarUrl: "/placeholder.svg?height=40&width=40",
    resumeScore: "Good Match",
    interviewImpression: "Excellent",
    city: "New York",
    state: "New York",
    country: "USA",
    interviewDate: "5 hours ago",
  },
  {
    id: "2",
    name: "Guy Hawkins",
    jobTitle: "Oncology Nurse",
    avatarUrl: "/placeholder.svg?height=40&width=40",
    resumeScore: "Top Match",
    interviewImpression: "Outstanding",
    city: "Toronto",
    state: "Ontario",
    country: "Canada",
    interviewDate: "2 weeks ago",
  },
  // Add more candidates here...
];

export default function HospitalCandidatesTable() {
  const [sortColumn, setSortColumn] = useState<keyof Candidate | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const sortedCandidates = [...candidates].sort((a, b) => {
    if (!sortColumn) return 0;
    if (a[sortColumn] < b[sortColumn]) return sortDirection === "asc" ? -1 : 1;
    if (a[sortColumn] > b[sortColumn]) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const handleSort = (column: keyof Candidate) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const getResumeScoreColor = (score: string) => {
    switch (score) {
      case "Top Match":
        return "bg-purple-100 text-purple-800";
      case "Good Match":
        return "bg-green-100 text-green-800";
      case "Not a match":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getInterviewImpressionColor = (impression: string) => {
    switch (impression) {
      case "Outstanding":
        return "bg-purple-100 text-purple-800";
      case "Excellent":
        return "bg-green-100 text-green-800";
      case "Good":
        return "bg-blue-100 text-blue-800";
      case "Below Average":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto py-10">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]" onClick={() => handleSort("name")}>
              Name
            </TableHead>
            <TableHead onClick={() => handleSort("resumeScore")}>
              Resume Score
            </TableHead>
            <TableHead onClick={() => handleSort("interviewImpression")}>
              Interview Impression
            </TableHead>
            <TableHead onClick={() => handleSort("city")}>City</TableHead>
            <TableHead onClick={() => handleSort("state")}>State</TableHead>
            <TableHead onClick={() => handleSort("country")}>Country</TableHead>
            <TableHead onClick={() => handleSort("interviewDate")}>
              Interview Date
            </TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedCandidates.map((candidate) => (
            <TableRow key={candidate.id}>
              <TableCell className="font-medium">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage
                      src={candidate.avatarUrl}
                      alt={candidate.name}
                    />
                    <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div>{candidate.name}</div>
                    <div className="text-sm text-gray-500">
                      {candidate.jobTitle}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant="secondary"
                  className={getResumeScoreColor(candidate.resumeScore)}
                >
                  {candidate.resumeScore}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  variant="secondary"
                  className={getInterviewImpressionColor(
                    candidate.interviewImpression
                  )}
                >
                  {candidate.interviewImpression}
                </Badge>
              </TableCell>
              <TableCell>{candidate.city}</TableCell>
              <TableCell>{candidate.state}</TableCell>
              <TableCell>{candidate.country}</TableCell>
              <TableCell>{candidate.interviewDate}</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Actions</span>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
