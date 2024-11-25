export const promptVideoAnalysis = (jobTitle: string) => {
  return `This is an interview for the job ${jobTitle}. Analyze the video and audio content provided, focusing on empathy, communication, and professionalism. Return the results in structured JSON format with the following parameters:

1. "empathy_score" (object):
   - "value" (number): A numerical rating from 0 to 10 reflecting the interviewee's empathy.
   - "reason" (string): A detailed explanation of why this score was assigned.

2. "sentiment" (object):
   - "value" (string): The overall sentiment (e.g., "positive", "neutral", "negative").
   - "confidence" (number): A numerical rating from 0 to 10 reflecting confidence score for the sentiment analysis.
   - "reason" (string): A detailed explanation of the detected sentiment.

3. "clarity_score" (object):
   - "value" (number): A numerical rating from 0 to 10 assessing the clarity of the interviewee's communication.
   - "reason" (string): A detailed explanation of why this score was assigned.

4. "professionalism" (object):
   - "value" (number): A numerical rating from 0 to 10 evaluating the professionalism exhibited.
   - "reason" (string): A detailed explanation of why this score was assigned.

5. "behavioral_traits" (object):
   - "traits" (array of strings): A list of behavioral traits observed (e.g., "active listening", "patience").
   - "reason" (string): A detailed explanation of why these traits were detected.

6. "stress_level" (object):
   - "value" (string): An evaluation of the stress level (e.g., "low", "medium", "high").
   - "confidence" (number): The confidence score for stress level analysis.
   - "reason" (string): A detailed explanation of the detected stress level.

7. "body_language" (object):
   - "eye_contact" (string): Assessment of eye contact (e.g., "consistent", "inconsistent").
   - "smiling" (string): Frequency of smiling (e.g., "frequent", "rare").
   - "gesture_use" (string): Use of gestures (e.g., "adequate", "excessive", "minimal").
   - "reason" (string): A detailed explanation of the observed body language.

8. "audio_analysis" (object):
   - "tone" (string): Analysis of the tone of voice (e.g., "calm", "neutral", "anxious").
   - "speech_speed" (string): Speed of speech (e.g., "slow", "medium", "fast").
   - "pauses" (string): Frequency of pauses (e.g., "frequent", "minimal").
   - "reason" (string): A detailed explanation of the audio analysis.

9. "confidence" (object):
   - "value" (number): A numerical rating from 0 to 10 reflecting overall confidence score of this analysis.
   - "reason" (string): A detailed explanation of the confidence score.

Ensure the JSON is properly formatted and includes all the requested fields, even if some values are null. Provide detailed explanations in the "reason" fields to justify the assigned values.
`;
};
