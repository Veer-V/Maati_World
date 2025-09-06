import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = "https://laennawtvovlbtkykdoc.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxhZW5uYXd0dm92bGJ0a3lrZG9jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcxNTk3MjEsImV4cCI6MjA3MjczNTcyMX0.ixgrpRZqoVDm-cS51a3aSYwgZcO3F-244F7SPNDQqMU";

const supabaseUntyped = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY)

export interface Feedback {
  id: string
  name: string
  email: string
  message: string
  created_at: string
}

export interface FeedbackInsert {
  name: string
  email: string
  message: string
}

export const feedbackOperations = {
  async addFeedback(feedback: FeedbackInsert) {
    const { data, error } = await supabaseUntyped
      .from('feedback')
      .insert(feedback)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async getAllFeedback() {
    const { data, error } = await supabaseUntyped
      .from('feedback')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  },

  async deleteFeedback(id: string) {
    const { error } = await supabaseUntyped
      .from('feedback')
      .delete()
      .eq('id', id)

    if (error) throw error
  }
}
