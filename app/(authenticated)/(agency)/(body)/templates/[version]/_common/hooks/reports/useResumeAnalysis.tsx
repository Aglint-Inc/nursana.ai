import { api } from 'trpc/client';

import type { get_resume_analytics_type } from '@/version/api/reports/resumeAnalysis';
import { useMatrixFilters } from '@/version/context/matrixFilterProvider';

const maxResults = 5;

export function useResumeAnalysis() {
  const { filters } = useMatrixFilters();
  const { data, isPending, error } =
    api.authenticated.agency.templates.version.reports.resumeAnalysis.useQuery(
      {
        campaign: filters.campaign!,
        // campaign: 'b253058d-5cbc-46da-8b67-8c9b26c13b76',
        interview: filters.interview,
        dateRange: filters.dateRange && {
          startDate: filters.dateRange.from.toDateString(),
          endDate: filters.dateRange.to.toDateString(),
        },
      },
      {
        refetchOnWindowFocus: false,
        enabled: !!filters.campaign,
      },
    );
  const experienceDistribution = getExperienceDistribution(data);
  const universityDistribution = getUniversityDistribution(data);
  const previousJobTitle = Object.entries(
    data
      ?.map((resume) => resume.x_job_title)
      .reduce(
        (acc, skill) => {
          if (acc[skill]) {
            acc[skill] += 1;
          } else {
            acc[skill] = 1;
          }
          return acc;
        },
        {} as { [key: string]: number },
      ) || {},
  ).map(([key, value]) => ({ name: key, value }));
  const skills = getSkills(data);
  const licensesDistribution = getLicensesDistribution(data);
  const locationsFrequency = getLocationFreq(data);
  return {
    data: {
      experienceDistribution,
      universityDistribution,
      previousJobTitle,
      skills,
      licensesDistribution,
      locationsFrequency,
    },
    isPending,
    error,
  };
}

function getExperienceDistribution(data?: get_resume_analytics_type) {
  const initialExperienceDistribution = {
    '0-1': 0,
    '1-3': 0,
    '3-5': 0,
    '5-10': 0,
    '10+': 0,
  };

  data?.forEach((resume) => {
    const experience = Number(resume.total_experience);
    if (experience < 12) {
      initialExperienceDistribution['0-1'] += 1;
    } else if (experience < 36) {
      initialExperienceDistribution['1-3'] += 1;
    } else if (experience < 60) {
      initialExperienceDistribution['3-5'] += 1;
    } else if (experience < 120) {
      initialExperienceDistribution['5-10'] += 1;
    } else {
      initialExperienceDistribution['10+'] += 1;
    }
  });
  return Object.entries(initialExperienceDistribution).map(([key, value]) => ({
    name: key,
    value,
  }));
}
function getUniversityDistribution(data?: get_resume_analytics_type) {
  const universityDistribution: { [key: string]: number } = {};
  data?.forEach((resume) => {
    resume.schools?.forEach((school) => {
      const university = school.institution;
      if (university) {
        if (universityDistribution[university]) {
          universityDistribution[university] += 1;
        } else {
          universityDistribution[university] = 1;
        }
      }
    });
  });
  const temp = Object.entries(universityDistribution).map(([key, value]) => ({
    name: key,
    value,
  }));
  return [
    ...temp.slice(0, maxResults),
    {
      name: 'Others',
      value: temp.slice(maxResults).reduce((acc, { value }) => acc + value, 0),
    },
  ];
}

function getLicensesDistribution(data?: get_resume_analytics_type) {
  const licensesDistribution: { [key: string]: number } = {};
  data?.forEach((resume) => {
    resume.licenses?.forEach((license) => {
      const licenseType = license.licenseType;
      if (licenseType) {
        if (licensesDistribution[licenseType]) {
          licensesDistribution[licenseType] += 1;
        } else {
          licensesDistribution[licenseType] = 1;
        }
      }
    });
  });
  return Object.entries(licensesDistribution).map(([key, value]) => ({
    name: key,
    value,
  }));
}

function getSkills(data?: get_resume_analytics_type) {
  const temp_skills = Object.entries(
    data
      ?.map((resume) => resume.skills || [])
      .flat()
      .reduce(
        (acc, skill) => {
          if (acc[skill]) {
            acc[skill] += 1;
          } else {
            acc[skill] = 1;
          }
          return acc;
        },
        {} as { [key: string]: number },
      ) || {},
  )
    .sort((a, b) => b[1] - a[1])
    .map(([key, value]) => ({ name: key, value }));
  const skills = [
    ...temp_skills.slice(0, maxResults),
    {
      name: 'Others',
      value: temp_skills
        .slice(maxResults)
        .reduce((acc, { value }) => acc + value, 0),
    },
  ];
  return skills;
}

function getLocationFreq(data?: get_resume_analytics_type) {
  const temp = Object.entries(
    data?.reduce(
      (acc, resume) => {
        const city = resume.location?.city;
        const state = resume.location?.state;

        const location = city || state ? `${city}, ${state}` : 'Not Provided';
        if (acc[location]) {
          acc[location] += 1;
        } else {
          acc[location] = 1;
        }
        return acc;
      },
      {} as { [key: string]: number },
    ) || {},
  ).map(([key, value]) => ({ name: key, value }));
  return [
    ...temp.slice(0, maxResults),
    {
      name: 'Others',
      value: temp.slice(maxResults).reduce((acc, { value }) => acc + value, 0),
    },
  ];
}
