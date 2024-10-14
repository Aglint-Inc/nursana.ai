'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { createClient } from '@/utils/supabase/server'

const templateSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  ai_welcome_message: z.string().min(1, 'Welcome message is required'),
  ai_ending_message: z.string().min(1, 'Ending message is required'),
  ai_interview_duration: z.number().min(1, 'Duration must be at least 1 minute'),
  candidate_estimated_time: z.string().min(1, 'Estimated time is required'),
  ai_instructions: z.array(z.string()).min(1, 'At least one instruction is required'),
  ai_questions: z.string().min(1, 'Questions are required'),
})

export async function createTemplate(formData: FormData) {
  const validatedFields = templateSchema.safeParse({
    name: formData.get('name'),
    ai_welcome_message: formData.get('ai_welcome_message'),
    ai_ending_message: formData.get('ai_ending_message'),
    ai_interview_duration: parseInt(formData.get('ai_interview_duration') as string),
    candidate_estimated_time: formData.get('candidate_estimated_time'),
    ai_instructions: formData.get('ai_instructions')?.toString().split('\n'),
    ai_questions: formData.get('ai_questions'),
  })

  if (!validatedFields.success) {
    return { error: 'Invalid fields' }
  }

  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('interview_templates')
    .insert(validatedFields.data)
    .select()

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/templates')
  redirect('/templates')
}

export async function updateTemplate(id: string, formData: FormData) {
  const validatedFields = templateSchema.safeParse({
    name: formData.get('name'),
    ai_welcome_message: formData.get('ai_welcome_message'),
    ai_ending_message: formData.get('ai_ending_message'),
    ai_interview_duration: parseInt(formData.get('ai_interview_duration') as string),
    candidate_estimated_time: formData.get('candidate_estimated_time'),
    ai_instructions: formData.get('ai_instructions')?.toString().split('\n'),
    ai_questions: formData.get('ai_questions'),
  })

  if (!validatedFields.success) {
    return { error: 'Invalid fields' }
  }

  const supabase = createClient()
  
  const { error } = await supabase
    .from('interview_templates')
    .update(validatedFields.data)
    .eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/templates')
  redirect('/templates')
}

