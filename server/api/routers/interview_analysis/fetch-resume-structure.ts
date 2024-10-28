import axios from 'axios';
import { z } from 'zod';

import { type PrivateProcedure, privateProcedure } from '../../trpc';

const schema = z.object({
  resume_id: z.string(),
  resume: z.string(),
  env: z.enum(['dev', 'prod']),
});
const query = async ({ input }: PrivateProcedure<typeof schema>) => {
  const { env, resume, resume_id } = input;
  const url =
    'https://northamerica-northeast2-aglint-cloud-381414.cloudfunctions.net/nursera_ai_process_resume_v1';
  const payload = {
    resume_id,
    resume,
    env,
  };

  await axios
    .post(url, payload)
    .then((res) => {
      return { res: res.data };
    })
    .catch((err) => {
      return {
        res: err,
      };
    });
};

export const fetchResumeStructure = privateProcedure
  .input(schema)
  .mutation(query);
