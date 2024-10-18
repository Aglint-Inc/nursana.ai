export type FormCampaign = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  file: File | null;
  role: Role;
};

export type Role = 'nurse' | 'doctor' | 'therapist';
