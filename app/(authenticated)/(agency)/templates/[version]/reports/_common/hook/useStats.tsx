import { api } from 'trpc/client';
import { useMatrixFilters } from '../context/matrixFilterProvider';

export function useStats() {
  const { filters } = useMatrixFilters();
  const { data, isPending, error } =
    api.authenticated.agency.reports.stats.useQuery(
      {
        campaign: filters.campaign,
        interview: filters.interview,
        dateRange: filters.dateRange && {
          startDate: filters.dateRange.from,
          endDate: filters.dateRange.to,
        },
      },
      {
        refetchOnWindowFocus: false,
      },
    );
  const initial = {
    total: 0,
    completed: 0,
    totalCallDurations: 0,
  };
  const returnData =
    data?.reduce((acc, campaign) => {
      const result = !!campaign ? calculateResult(campaign.interview) : initial;
      return {
        total: acc.total + result.total,
        completed: acc.completed + result.completed,
        totalCallDurations: acc.totalCallDurations + result.totalCallDurations,
      };
    }, initial) || initial;
  const completionRate =
    returnData.total > 0
      ? parseFloat(((returnData.completed / returnData.total) * 100).toFixed(1))
      : 0;
  const avgInterviewDuration = timeFormatter(
    Math.floor(returnData.totalCallDurations / returnData.completed),
  );
  return {
    data: { ...returnData, completionRate, avgInterviewDuration },
    isPending,
    error: error?.message,
  };
}

const calculateResult = (
  interviews: {
    interview_stage:
      | 'not_started'
      | 'resume_submitted'
      | 'interview_inprogress'
      | 'interview_completed';
    interview_analysis: {
      call_analysis: any;
    } | null;
  }[],
) => {
  const result = {
    total: 0,
    completed: 0,
    totalCallDurations: 0,
  };
  interviews.forEach((interview) => {
    result.total += 1;
    if (interview.interview_stage === 'interview_completed') {
      result.completed += 1;
      const callDuration =
        interview.interview_analysis?.call_analysis?.duration_minutes || 0;
      result.totalCallDurations += callDuration;
    }
  });

  return result;
};

function timeFormatter(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  let result = '';
  if (hours > 0) {
    result += `${hours}h `;
  }
  if (remainingMinutes > 0) {
    result += `${remainingMinutes}m`;
  }
  return result.trim() || '0m 0s';
}
