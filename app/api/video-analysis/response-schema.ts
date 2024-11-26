import { SchemaType } from '@google-cloud/vertexai';

export const response_schema = {
  type: SchemaType.OBJECT,
  properties: {
    empathy_score: {
      type: SchemaType.OBJECT,
      properties: {
        value: { type: SchemaType.NUMBER },
        reason: { type: SchemaType.STRING }, // Explanation for empathy score
      },
    },
    sentiment: {
      type: SchemaType.OBJECT,
      properties: {
        value: { type: SchemaType.STRING },
        confidence: { type: SchemaType.NUMBER },
        reason: { type: SchemaType.STRING }, // Explanation for sentiment analysis
      },
    },
    clarity_score: {
      type: SchemaType.OBJECT,
      properties: {
        value: { type: SchemaType.NUMBER },
        reason: { type: SchemaType.STRING }, // Explanation for clarity score
      },
    },
    professionalism: {
      type: SchemaType.OBJECT,
      properties: {
        value: { type: SchemaType.NUMBER },
        reason: { type: SchemaType.STRING }, // Explanation for professionalism score
      },
    },
    behavioral_traits: {
      type: SchemaType.OBJECT,
      properties: {
        traits: {
          type: SchemaType.ARRAY,
          items: { type: SchemaType.STRING },
        },
        reason: { type: SchemaType.STRING }, // Explanation for detected traits
      },
    },
    stress_level: {
      type: SchemaType.OBJECT,
      properties: {
        value: { type: SchemaType.STRING },
        confidence: { type: SchemaType.NUMBER },
        reason: { type: SchemaType.STRING }, // Explanation for stress level
      },
    },
    body_language: {
      type: SchemaType.OBJECT,
      properties: {
        eye_contact: { type: SchemaType.STRING },
        smiling: { type: SchemaType.STRING },
        gesture_use: { type: SchemaType.STRING },
        reason: { type: SchemaType.STRING }, // Explanation for body language
      },
    },
    audio_analysis: {
      type: SchemaType.OBJECT,
      properties: {
        tone: { type: SchemaType.STRING },
        speech_speed: { type: SchemaType.STRING },
        pauses: { type: SchemaType.STRING },
        reason: { type: SchemaType.STRING }, // Explanation for audio analysis
      },
    },
    confidence: {
      type: SchemaType.OBJECT,
      properties: {
        value: { type: SchemaType.NUMBER },
        reason: { type: SchemaType.STRING }, // Explanation for overall confidence
      },
    },
  },
  required: [
    'empathy_score',
    'sentiment',
    'clarity_score',
    'professionalism',
    'behavioral_traits',
    'stress_level',
    'body_language',
    'audio_analysis',
    'confidence',
  ],
};

export interface ResponseSchemaVideoAnalysis {
  empathy_score: {
    value: number;
    reason: string;
  };
  sentiment: {
    value: string;
    confidence: number;
    reason: string;
  };
  clarity_score: {
    value: number;
    reason: string;
  };
  professionalism: {
    value: number;
    reason: string;
  };
  behavioral_traits: {
    traits: string[];
    reason: string;
  };
  stress_level: {
    value: string;
    confidence: number;
    reason: string;
  };
  body_language: {
    eye_contact: string;
    smiling: string;
    gesture_use: string;
    reason: string;
  };
  audio_analysis: {
    tone: string;
    speech_speed: string;
    pauses: string;
    reason: string;
  };
  confidence: {
    value: number;
    reason: string;
  };
}
