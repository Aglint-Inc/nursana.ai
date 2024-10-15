import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type AIAnalysis = {
  teamwork: number;
  adaptability: number;
  empathy_score: number;
  key_strengths: string[];
  recommended_fit: string;
  overall_sentiment: string;
  calm_under_pressure: number;
  self_care_awareness: number;
  communication_skills: string;
  areas_for_improvement: string[];
  candidate_overall_score: number;
  follow_up_recommendation: string;
};

type InterviewAnalysisProps = {
  analysis: AIAnalysis;
};

const SkillBar: React.FC<{ label: string; value: number }> = ({
  label,
  value,
}) => (
  <div className="space-y-1">
    <div className="flex justify-between text-sm">
      <span>{label}</span>
      <span>{value}%</span>
    </div>
    <Progress value={value} className="h-2" />
  </div>
);

export function InterviewAnalysis({ analysis }: InterviewAnalysisProps) {
  if (!analysis) {
    return <div>No analysis available.</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Interview Analysis</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <SkillBar label="Teamwork" value={analysis.teamwork} />
          <SkillBar label="Adaptability" value={analysis.adaptability} />
          <SkillBar label="Empathy Score" value={analysis.empathy_score} />
          <SkillBar
            label="Calm Under Pressure"
            value={analysis.calm_under_pressure}
          />
          <SkillBar
            label="Self-Care Awareness"
            value={analysis.self_care_awareness}
          />
        </div>

        <div>
          <h3 className="font-semibold mb-2">Key Strengths</h3>
          <ul className="list-disc pl-5">
            {analysis.key_strengths?.map((strength, index) => (
              <li key={index}>{strength}</li>
            )) || <li>No key strengths available</li>}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Areas for Improvement</h3>
          <ul className="list-disc pl-5">
            {analysis.areas_for_improvement?.map((area, index) => (
              <li key={index}>{area}</li>
            )) || <li>No areas for improvement available</li>}
          </ul>
        </div>

        <div className="space-y-2">
          <p>
            <strong>Communication Skills:</strong>{" "}
            {analysis.communication_skills}
          </p>
          <p>
            <strong>Recommended Fit:</strong> {analysis.recommended_fit}
          </p>
          <p>
            <strong>Overall Sentiment:</strong> {analysis.overall_sentiment}
          </p>
          <p>
            <strong>Candidate Overall Score:</strong>{" "}
            {analysis.candidate_overall_score}%
          </p>
          <p>
            <strong>Follow-up Recommendation:</strong>{" "}
            {analysis.follow_up_recommendation}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export type { AIAnalysis };
