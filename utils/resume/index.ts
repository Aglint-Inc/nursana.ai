import axios from 'axios';

const RESUME_TO_JSON = process.env.NEXT_PUBLIC_RESUME_TO_JSON;
if (!RESUME_TO_JSON) {
  console.log('RESUME_TO_JSON not set', process.env);
  throw new Error('RESUME_TO_JSON not set');
}

export const getResumeJson = async (id: string, resume: string) => {
  console.log('@Score calling api', id);
  const { data } = await axios.post<ResumeJsonType>(RESUME_TO_JSON, {
    application_id: id,
    resume: resume,
  });
  return data;
};

export type ResumeJsonType = {
  basics: {
    email: string;
    phone: string;
    social: string[];
    lastName: string;
    linkedIn: string;
    location: string;
    firstName: string;
    currentCompany: string;
    currentJobTitle: string;
  };
  skills: string[];
  schools: {
    end: {
      year: number;
      month: number;
    };
    gpa: number;
    field: string;
    start: {
      year: number;
      month: number;
    };
    degree: string;
    institution: string;
  }[];
  overview: string;
  projects: {
    title: string;
    summary: string;
  }[];
  languages: string[];
  positions: {
    end: {
      year: number;
      month: number;
    };
    org: string;
    level: string;
    start: {
      year: number;
      month: number;
    };
    title: string;
    summary: string;
    description: string;
    location: string;
  }[];
  certificates: string[];
};
