/* eslint-disable no-unused-vars */
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_SUPABASE_URL: string;
      NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
      NEXT_PUBLIC_PUBLIC_URL_EXP: number;
      POSTGRES_URL: string;
      POSTGRES_PRISMA_URL: string;
      SUPABASE_URL: string;
      POSTGRES_URL_NON_POOLING: string;
      SUPABASE_JWT_SECRET: string;
      POSTGRES_USER: string;
      POSTGRES_PASSWORD: string;
      POSTGRES_DATABASE: string;
      SUPABASE_SERVICE_ROLE_KEY: string;
      POSTGRES_HOST: string;
      OPENAI_API_KEY: string;
      RETELL_API_KEY: string;
      DB_PASS: string;
      GOOGLE_PLACES_API_KEY: string;
    }
  }
}
export {};
