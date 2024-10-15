"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Database } from "@/lib/database.types";

type NurseRow = Database["public"]["Tables"]["users"]["Row"];

type PreferencesViewProps = {
  nurseData: NurseRow | null;
  onEdit: () => void;
};

export function PreferencesView({ nurseData, onEdit }: PreferencesViewProps) {
  if (!nurseData) return null;

  return (
    <Card className="bg-gray-50 border border-gray-200 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center text-md font-medium">
          Set Up Your Preferences
          <Button variant="outline" size="sm" onClick={onEdit}>
            Edit
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p>
            <strong>Preferred Job Titles:</strong>{" "}
            {nurseData.preferred_job_titles?.map((title, index) => (
              <span
                key={index}
                className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-1 mb-1"
              >
                {title}
              </span>
            )) || "Not specified"}
          </p>
          <p>
            <strong>Preferred Locations:</strong>{" "}
            {nurseData.preferred_locations?.map((location, index) => (
              <span
                key={index}
                className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mr-1 mb-1"
              >
                {location}
              </span>
            )) || "Not specified"}
          </p>
          <p>
            <strong>Job Type:</strong> {nurseData.job_type || "Not specified"}
          </p>
          <p>
            <strong>Travel Preference:</strong>{" "}
            {nurseData.travel_preference || "Not specified"}
          </p>
          <p>
            <strong>Expected Salary:</strong> $
            {nurseData.expected_salary?.toLocaleString() || "Not specified"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
