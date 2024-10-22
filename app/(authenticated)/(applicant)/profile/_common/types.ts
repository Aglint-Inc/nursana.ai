export type ResumeDetailsType = {
  basics: {
    email: string;
    phone: string;
    social: string[];
    lastName: string;
    linkedIn: string | null;
    location: {
      city: string;
      state: string;
      country: string;
    };
    firstName: string;
    currentCompany: string;
    currentJobTitle: string;
    professionalSummary: string | null;
    totalExperienceInMonths: number;
  };
  skills: string[];
  schools: {
    end: {
      year: number;
      month: number | null;
    };
    gpa: number | null;
    field: string;
    start: {
      year: number;
      month: number | null;
    };
    degree: string;
    institution: string;
  }[];
  licenses: {
    state: string;
    issueDate: {
      year: number;
      month: number | null;
    };
    licenseType: string;
    expirationDate: string | null;
    issuingAuthority: string;
  }[];
  languages: string[];
  positions: {
    end: {
      year: number;
      month: number | null;
    };
    org: string;
    level: string;
    start: {
      year: number;
      month: number | null;
    };
    title: string;
    location: string;
    description: string;
  }[];
  achievements: string[];
  certificates: {
    title: string;
    dateObtained: {
      year: number | null;
      month: number | null;
    };
    issuingAuthority: string;
  }[];
  geoDataAndExp: {
    state: string;
    country: string;
    geolocation: string;
    experience_in_months: number;
  };
  volunteerWork: string[];
  specializations: string[];
  clinicalExperience: string[];
};
