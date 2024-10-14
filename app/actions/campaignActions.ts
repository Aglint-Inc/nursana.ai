'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { createClient } from '@/utils/supabase/server'

const campaignSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  campaign_code: z.string().min(1, 'Campaign code is required'),
  description: z.string().optional(),
  template_id: z.string().min(1, 'Template is required'),
})

export async function createCampaign(formData: FormData) {
  const validatedFields = campaignSchema.safeParse({
    name: formData.get('name'),
    campaign_code: formData.get('campaign_code'),
    description: formData.get('description'),
    template_id: formData.get('template_id'),
  })

  if (!validatedFields.success) {
    return { error: 'Invalid fields' }
  }

  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('campaigns')
    .insert(validatedFields.data)
    .select()

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/campaigns')
  redirect('/campaigns')
}

export async function updateCampaign(id: string, formData: FormData) {
  const validatedFields = campaignSchema.safeParse({
    name: formData.get('name'),
    campaign_code: formData.get('campaign_code'),
    description: formData.get('description'),
    template_id: formData.get('template_id'),
  })

  if (!validatedFields.success) {
    return { error: 'Invalid fields' }
  }

  const supabase = createClient()
  
  const { error } = await supabase
    .from('campaigns')
    .update(validatedFields.data)
    .eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/campaigns')
  redirect('/campaigns')
}

export async function deleteCampaign(id: string) {
  const supabase = createClient()
  
  const { error } = await supabase
    .from('campaigns')
    .delete()
    .eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/campaigns')
}
