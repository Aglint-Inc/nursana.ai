import React from 'react';

import { useUserData } from '@/authenicated/hooks/useUserData';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const SkillBar: React.FC<{ label: string; value: number }> = ({
  label,
  value,
}) => (
  <div className='space-y-1'>
    <div className='flex justify-between text-sm'>
      <span>{label}</span>
      <span>{value}%</span>
    </div>
    <Progress value={value} className='h-2' />
  </div>
);

export function InterviewAnalysis() {
  const { userData } = useUserData();
  const analysis = userData?.analysis?.structured_analysis;

  if (!analysis) {
    return <div>No analysis available.</div>;
  }

  return (
    <Card>
      <CardContent className='flex flex-col gap-8 pt-6'>
        <div className='flex flex-col gap-2'>
          <div className='text-sm text-muted-foreground'>
            Interview Analysis
          </div>
          <div className='grid grid-cols-2 gap-x-10 gap-y-4'>
            <SkillBar label='Teamwork' value={analysis.teamwork} />
            <SkillBar label='Adaptability' value={analysis.adaptability} />
            <SkillBar label='Empathy Score' value={analysis.empathy_score} />
            <SkillBar
              label='Calm Under Pressure'
              value={analysis.calm_under_pressure}
            />
            <SkillBar
              label='Self-Care Awareness'
              value={analysis.self_care_awareness}
            />
          </div>
        </div>

        <div className='flex flex-col gap-2'>
          <div className='text-sm text-muted-foreground'>Key Strengths</div>
          {analysis.key_strengths?.map((strength: string, index: number) => (
            <div key={index}>{strength}</div>
          )) || <div>No key strengths available</div>}
        </div>

        <div className='flex flex-col gap-2'>
          <div className='text-sm text-muted-foreground'>
            Areas for Improvement
          </div>
          {analysis.areas_for_improvement?.map(
            (area: string, index: number) => <div key={index}>{area}</div>,
          ) || <div>No key strengths available</div>}
        </div>

        <div className='flex flex-col gap-2'>
          <div className='text-sm text-muted-foreground'>
            Areas for Improvement
          </div>
          {analysis.communication_skills ? (
            <p>{analysis.communication_skills}</p>
          ) : (
            <p>---</p>
          )}
        </div>
        <div className='flex flex-col gap-2'>
          <div className='text-sm text-muted-foreground'>Recommended Fit</div>
          {analysis.recommended_fit ? (
            <p>{analysis.recommended_fit}</p>
          ) : (
            <p>---</p>
          )}
        </div>
        <div className='flex flex-col gap-2'>
          <div className='text-sm text-muted-foreground'>Overall Sentiment</div>
          {analysis.overall_sentiment ? (
            <p>{analysis.overall_sentiment}</p>
          ) : (
            <p>---</p>
          )}
        </div>
        <div className='flex flex-col gap-2'>
          <div className='text-sm text-muted-foreground'>
            Candidate Overall Score
          </div>
          {analysis.candidate_overall_score ? (
            <p>{analysis.candidate_overall_score}%</p>
          ) : (
            <p>---</p>
          )}
        </div>
        <div className='flex flex-col gap-2'>
          <div className='text-sm text-muted-foreground'>
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
