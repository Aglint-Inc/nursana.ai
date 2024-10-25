import { createTRPCRouter } from '../../trpc';
import { createInterviewRating } from './create-interview-rating';
import { getUserInterviewRating } from './get-interview-rating';

export const interviewFeedback = createTRPCRouter({
  getUserInterviewRating,
  createInterviewRating,
});
