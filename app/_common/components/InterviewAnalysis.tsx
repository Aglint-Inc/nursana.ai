import React from "react";

import { Card, CardContent } from "@/components/ui/card";
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
      <CardContent className="flex flex-col gap-8 pt-6">
        <div className="flex flex-col gap-2">
          <div className="text-sm text-muted-foreground">
            Interview Analysis
          </div>
          <div className="grid grid-cols-2 gap-y-4 gap-x-10">
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
        </div>

        <div className="flex flex-col gap-2">
          <div className="text-sm text-muted-foreground">Key Strengths</div>
          {analysis.key_strengths?.map((strength, index) => (
            <div key={index}>{strength}</div>
          )) || <div>No key strengths available</div>}
        </div>

        <div className="flex flex-col gap-2">
          <div className="text-sm text-muted-foreground">
            Areas for Improvement
          </div>
          {analysis.areas_for_improvement?.map((area, index) => (
            <div key={index}>{area}</div>
          )) || <div>No key strengths available</div>}
        </div>

        <div className="flex flex-col gap-2">
          <div className="text-sm text-muted-foreground">
            Areas for Improvement
          </div>
          {analysis.communication_skills ? (
            <p>{analysis.communication_skills}</p>
          ) : (
            <p>---</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-sm text-muted-foreground">Recommended Fit</div>
          {analysis.recommended_fit ? (
            <p>{analysis.recommended_fit}</p>
          ) : (
            <p>---</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-sm text-muted-foreground">Overall Sentiment</div>
          {analysis.overall_sentiment ? (
            <p>{analysis.overall_sentiment}</p>
          ) : (
            <p>---</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-sm text-muted-foreground">
            Candidate Overall Score
          </div>
          {analysis.candidate_overall_score ? (
            <p>{analysis.candidate_overall_score}%</p>
          ) : (
            <p>---</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-sm text-muted-foreground">
            Follow-up Recommendation
          </div>
          {analysis.follow_up_recommendation ? (
            <p>{analysis.follow_up_recommendation}</p>
          ) : (
            <p>---</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export type { AIAnalysis };
