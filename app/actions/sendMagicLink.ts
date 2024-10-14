'use server'

import { createClient } from "@/utils/supabase/server";

export async function sendMagicLink(email: string, interviewUrl: string) {
  const supabase = createClient()
  // If email is empty, use default email
  email = "ravi@aglinthq.com";

  try {
    // Check if the user is currently anonymous
    const { data: { user } } = await supabase.auth.getUser()
    
    // Encode the interview URL to be used as a redirect
    const encodedRedirectTo = encodeURIComponent(interviewUrl)
    
    if (user && user.is_anonymous === true) {
      const { data: userData, error } = await supabase.auth.updateUser({ email })
      if (userData) {
        console.log('Update email sucess for user: ', email)
      }
      if (error) {
        console.log("Current user is not the user with email. Sending magiac link to email: ", email)
      }

    }

    const { data, error } = await supabase.auth.admin.generateLink({
      type: 'magiclink',
      email,
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback?redirect_to=${encodedRedirectTo}`
      }
    })

    if (error) throw error

    // Send the magic link email using the API route
    const response = await fetch('/api/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, magicLink: data.properties.action_link }),
    });

    const emailResult = await response.json();

    if (emailResult.error) {
      throw new Error(emailResult.error.message);
    }

    return { success: true, message: 'Magic link sent successfully. Please check your email.' }
  } catch (error) {
    console.error('Error sending magic link:', error)
    return { success: false, message: 'Failed to send magic link. Please try again.' }
  }
}
