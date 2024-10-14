"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MultiSelect } from "@/components/ui/multi-select";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "@/lib/database.types";

type NurseRow = Database["public"]["Tables"]["nurses"]["Row"];

type PreferencesEditProps = {
  nurseData: NurseRow | null;
  onSave: () => void;
  onCancel: () => void;
};

// You might want to define these options somewhere else and import them
const jobTitleOptions = [
  "Registered Nurse",
  "Critical Care Nurse",
  "Emergency Room Nurse",
  "Pediatric Nurse",
  "Operating Room Nurse",
];
const locationOptions = [
  "New York, NY",
  "Los Angeles, CA",
  "Chicago, IL",
  "Houston, TX",
  "Phoenix, AZ",
  "Philadelphia, PA",
];

export function PreferencesEdit({
  nurseData,
  onSave,
  onCancel,
}: PreferencesEditProps) {
  const [preferredJobTitles, setPreferredJobTitles] = useState<string[]>(
    nurseData?.preferred_job_titles || []
  );
  const [preferredLocations, setPreferredLocations] = useState<string[]>(
    nurseData?.preferred_locations || []
  );
  const [jobType, setJobType] = useState(nurseData?.job_type || "");
  const [travelPreference, setTravelPreference] = useState(
    nurseData?.travel_preference || ""
  );
  const [expectedSalary, setExpectedSalary] = useState(
    nurseData?.expected_salary?.toString() || ""
  );

  useEffect(() => {
    if (nurseData) {
      setPreferredJobTitles(nurseData.preferred_job_titles || []);
      setPreferredLocations(nurseData.preferred_locations || []);
      setJobType(nurseData.job_type || "");
      setTravelPreference(nurseData.travel_preference || "");
      setExpectedSalary(nurseData.expected_salary?.toString() || "");
    }
  }, [nurseData]);

  const supabase = createClientComponentClient<Database>();

  const handleSave = async () => {
    if (!nurseData) return;

    const { error } = await supabase
      .from("nurses")
      .update({
        preferred_job_titles: preferredJobTitles,
        preferred_locations: preferredLocations,
        job_type: jobType,
        travel_preference: travelPreference,
        expected_salary: expectedSalary ? parseInt(expectedSalary) : null,
      })
      .eq("nurse_id", nurseData.nurse_id);

    if (error) {
      console.error("Error updating preferences:", error);
    } else {
      onSave();
    }
  };

  if (!nurseData) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Your Preferences</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label htmlFor="preferredJobTitles">Preferred Job Titles</label>
            <MultiSelect
              options={jobTitleOptions}
              selected={preferredJobTitles}
              onChange={setPreferredJobTitles}
              placeholder="Select job titles..."
            />
          </div>
          <div>
            <label htmlFor="preferredLocations">Preferred Locations</label>
            <MultiSelect
              options={locationOptions}
              selected={preferredLocations}
              onChange={setPreferredLocations}
              placeholder="Select locations..."
            />
          </div>
          <div>
            <label htmlFor="jobType">Job Type</label>
            <Select value={jobType} onValueChange={setJobType}>
              <SelectTrigger>
                <SelectValue placeholder="Select job type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Full-time">Full-time</SelectItem>
                <SelectItem value="Part-time">Part-time</SelectItem>
                <SelectItem value="Contract">Contract</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="travelPreference">Travel Preference</label>
            <Select
              value={travelPreference}
              onValueChange={setTravelPreference}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select travel preference" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Local">Local</SelectItem>
                <SelectItem value="Regional">Regional</SelectItem>
                <SelectItem value="National">National</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="expectedSalary">Expected Salary</label>
            <Input
              id="expectedSalary"
              type="number"
              value={expectedSalary}
              onChange={(e) => setExpectedSalary(e.target.value)}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button onClick={onCancel} variant="outline">
              Cancel
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
