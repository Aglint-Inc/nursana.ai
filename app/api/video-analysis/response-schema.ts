import { SchemaType } from '@google-cloud/vertexai';

export const response_schema = {
  type: SchemaType.OBJECT,
  properties: {
    empathy_score: { type: SchemaType.NUMBER },
    sentiment: {
      type: SchemaType.OBJECT,
      properties: {
        value: { type: SchemaType.STRING },
        confidence: { type: SchemaType.NUMBER },
      },
    },
    clarity_score: { type: SchemaType.NUMBER },
    professionalism: { type: SchemaType.NUMBER },
    behavioral_traits: {
      type: SchemaType.ARRAY,
      items: { type: SchemaType.STRING },
    },
    stress_level: {
      type: SchemaType.OBJECT,
      properties: {
        value: { type: SchemaType.STRING },
        confidence: { type: SchemaType.NUMBER },
      },
    },
    body_language: {
      type: SchemaType.OBJECT,
      properties: {
        eye_contact: { type: SchemaType.STRING },
        smiling: { type: SchemaType.STRING },
        gesture_use: { type: SchemaType.STRING },
      },
    },
    audio_analysis: {
      type: SchemaType.OBJECT,
      properties: {
        tone: { type: SchemaType.STRING },
        speech_speed: { type: SchemaType.STRING },
        pauses: { type: SchemaType.STRING },
      },
    },
    confidence: { type: SchemaType.NUMBER },
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

export interface ResponseSchema {
  empathy_score: number;
  sentiment: {
    value: string;
    confidence: number;
  };
  clarity_score: number;
  professionalism: number;
  behavioral_traits: string[];
  stress_level: {
    value: string;
    confidence: number;
  };
  body_language: {
    eye_contact: string;
    smiling: string;
    gesture_use: string;
  };
  audio_analysis: {
    tone: string;
    speech_speed: string;
    pauses: string;
  };
  confidence: number;
}