export interface InterviewTemplate {
  id: string;
  name: string;
  description: string;
  campaignIds: string[];
  ai_ending_message: string | null;
  ai_instructions: string[] | null;
  ai_interview_duration: number;
  ai_questions: string | null;
  ai_welcome_message: string | null;
  candidate_estimated_time: string | null;
  candidate_instructions: string[] | null;
  candidate_intro_video_cover_image_url: string | null;
  candidate_intro_video_url: string | null;
  candidate_overview: string[] | null;
}

export const mockInterviewTemplates: InterviewTemplate[] = [
  {
    id: 'template1',
    name: 'General Nurse Interview',
    description: 'Standard interview template for general nursing positions',
    campaignIds: ['1', '3', '4', '5'],
    ai_ending_message: "Thank you for participating in this interview. We appreciate your time and responses.",
    ai_instructions: [
      "Ask questions in a friendly, conversational tone",
      "Allow the candidate time to respond fully before moving to the next question",
      "If a response is unclear, ask for clarification"
    ],
    ai_interview_duration: 30,
    ai_questions: "1. Can you describe your experience in nursing?\n2. How do you handle stressful situations?\n3. What's your approach to patient care?",
    ai_welcome_message: "Welcome to your nursing interview. We're excited to learn more about you and your experience in healthcare.",
    candidate_estimated_time: "30-40 minutes",
    candidate_instructions: [
      "Ensure you're in a quiet environment",
      "Speak clearly and at a normal pace",
      "Feel free to ask for clarification if needed"
    ],
    candidate_intro_video_cover_image_url: "https://example.com/nurse-interview-cover.jpg",
    candidate_intro_video_url: "https://example.com/nurse-interview-intro.mp4",
    candidate_overview: [
      "This interview will assess your nursing skills and experience",
      "We'll discuss your approach to patient care and teamwork",
      "You'll have the opportunity to ask questions at the end"
    ]
  },
  {
    id: 'template2',
    name: 'ICU Specialist Interview',
    description: 'In-depth interview template for ICU specialist positions',
    campaignIds: ['2'],
    ai_ending_message: "Thank you for sharing your ICU experience with us. Your insights are valuable.",
    ai_instructions: [
      "Focus on technical questions related to ICU procedures",
      "Assess the candidate's ability to handle high-pressure situations",
      "Explore their experience with various medical equipment"
    ],
    ai_interview_duration: 45,
    ai_questions: "1. Describe a challenging case you handled in the ICU.\n2. How do you prioritize patient care in a busy ICU setting?\n3. What's your experience with ventilator management?",
    ai_welcome_message: "Welcome to the ICU specialist interview. We're looking forward to discussing your critical care experience.",
    candidate_estimated_time: "45-60 minutes",
    candidate_instructions: [
      "Be prepared to discuss specific ICU scenarios",
      "Have examples ready of how you've handled emergencies",
      "Feel free to use medical terminology as appropriate"
    ],
    candidate_intro_video_cover_image_url: "https://example.com/icu-interview-cover.jpg",
    candidate_intro_video_url: "https://example.com/icu-interview-intro.mp4",
    candidate_overview: [
      "This interview will assess your specialized ICU knowledge and skills",
      "We'll discuss complex patient care scenarios and your decision-making process",
      "There will be questions about your experience with ICU-specific equipment and procedures"
    ]
  },
  {
    id: 'template3',
    name: 'Pediatric Nurse Interview',
    description: 'Specialized interview template for pediatric nursing roles',
    campaignIds: [],
    ai_ending_message: "Thank you for sharing your experience in pediatric nursing. We appreciate your dedication to children's healthcare.",
    ai_instructions: [
      "Use a warm and friendly tone appropriate for someone working with children",
      "Ask about specific pediatric care experiences",
      "Explore the candidate's ability to communicate with both children and parents"
    ],
    ai_interview_duration: 40,
    ai_questions: "1. How do you approach comforting a distressed child?\n2. Describe your experience with pediatric medication administration.\n3. How do you involve parents in their child's care?",
    ai_welcome_message: "Welcome to our pediatric nursing interview. We're excited to learn about your experience in caring for young patients.",
    candidate_estimated_time: "40-50 minutes",
    candidate_instructions: [
      "Consider preparing examples of how you've worked with children of different ages",
      "Be ready to discuss how you handle both patients and their families",
      "Feel free to share any specialized pediatric training you've received"
    ],
    candidate_intro_video_cover_image_url: "https://example.com/pediatric-interview-cover.jpg",
    candidate_intro_video_url: "https://example.com/pediatric-interview-intro.mp4",
    candidate_overview: [
      "This interview focuses on your skills and experience in pediatric nursing",
      "We'll discuss your approach to child-friendly healthcare",
      "You'll have the chance to share your experiences in family-centered care"
    ]
  },
  {
    id: 'template4',
    name: 'Emergency Room Nurse Interview',
    description: 'Fast-paced interview template for ER nursing positions',
    campaignIds: [],
    ai_ending_message: "Thank you for discussing your ER nursing experience with us. Your ability to handle high-stress situations is crucial.",
    ai_instructions: [
      "Focus on the candidate's ability to make quick decisions",
      "Assess their experience with a wide range of emergency situations",
      "Explore their teamwork skills in a fast-paced environment"
    ],
    ai_interview_duration: 35,
    ai_questions: "1. Describe a time when you had to quickly prioritize multiple incoming patients.\n2. How do you stay calm under pressure in the ER?\n3. What's your experience with triage procedures?",
    ai_welcome_message: "Welcome to the ER nurse interview. We're keen to hear about your experiences in emergency care.",
    candidate_estimated_time: "35-45 minutes",
    candidate_instructions: [
      "Be prepared to discuss how you handle high-pressure situations",
      "Consider examples of how you've worked effectively in a team during emergencies",
      "Feel free to share any specialized emergency care certifications you hold"
    ],
    candidate_intro_video_cover_image_url: "https://example.com/er-interview-cover.jpg",
    candidate_intro_video_url: "https://example.com/er-interview-intro.mp4",
    candidate_overview: [
      "This interview will assess your ability to work in a fast-paced ER environment",
      "We'll discuss your experience with various types of medical emergencies",
      "There will be questions about your decision-making process in critical situations"
    ]
  }
];