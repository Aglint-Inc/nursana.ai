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
    <Card className="shadow-none ">
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center text-md font-medium">
          Set Up Your Preferences
          <Button variant="outline" size="sm" onClick={onEdit}>
            Edit
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className="text-sm ">
              Preferred Job Titles
            </div>
            <div className="flex flex-wrap gap-1.5">
              {nurseData.preferred_job_titles?.map((title, index) => (
                <span
                  key={index}
                  className="inline-block bg-secondary text-sm px-2 py-1 rounded-sm mr-1 mb-1"
                >
                  {title}
                </span>
              )) || "Not specified"}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="text-sm ">
              Preferred Locations
            </div>
            <div className="flex flex-wrap gap-1.5">
              {nurseData.preferred_locations?.map((location, index) => (
                <span
                  key={index}
                  className="inline-block bg-secondary text-sm px-2 py-1 rounded-sm mr-1 mb-1"
                >
                  {location}
                </span>
              )) || "Not specified"}
            </div>
          </div>

          <div className="flex flex-col gap-2 items-start">
            <div className="text-sm ">Job Type</div>
            {nurseData.job_type ? (
              <span className="inline-block bg-secondary text-sm px-2 py-1 rounded-sm mr-1 mb-1">
                {nurseData.job_type}
              </span>
            ) : (
              <span className="text-sm text-muted-foreground italic">
                Not specified
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2 items-start">
            <div className="text-sm ">Travel Preference</div>
            {nurseData.travel_preference ? (
              <span className="inline-block bg-secondary text-sm px-2 py-1 rounded-sm mr-1 mb-1">
                {nurseData.travel_preference}
              </span>
            ) : (
              <span className="text-sm text-muted-foreground italic">
                Not specified
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2 items-start">
            <div className="text-sm ">Expected Salary</div>
            {nurseData.expected_salary ? (
              <span className="inline-block bg-secondary text-sm px-2 py-1 rounded-sm mr-1 mb-1">
                {nurseData.expected_salary}
              </span>
            ) : (
              <span className="text-sm text-muted-foreground italic">
                Not specified
              </span>
            )}
          </div>

         
        </div>
      </CardContent>
    </Card>
  );
}
