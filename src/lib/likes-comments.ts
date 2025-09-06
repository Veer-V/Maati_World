import { supabase } from '@/integrations/supabase/client'

// Likes operations
export const likesOperations = {
  async addLike(blogId: string, userId?: string) {
    const { data, error } = await supabase
      .from('likes')
      .insert({ blog_id: blogId, user_id: userId })
      .select()
      .single()

    if (error) throw error
    return data
  },

  async removeLike(blogId: string, userId?: string) {
    const { error } = await supabase
      .from('likes')
      .delete()
      .eq('blog_id', blogId)
      .eq('user_id', userId || null)

    if (error) throw error
  },

  async getLikesCount(blogId: string) {
    const { count, error } = await supabase
      .from('likes')
      .select('*', { count: 'exact', head: true })
      .eq('blog_id', blogId)

    if (error) throw error
    return count || 0
  },

  async hasUserLiked(blogId: string, userId?: string) {
    const { data, error } = await supabase
      .from('likes')
      .select('id')
      .eq('blog_id', blogId)
      .eq('user_id', userId || null)
      .single()

    if (error && error.code !== 'PGRST116') throw error
    return !!data
  }
}

// Comments operations
export const commentsOperations = {
  async getComments(blogId: string) {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('blog_id', blogId)
      .order('created_at', { ascending: true })

    if (error) throw error
    return data
  },

  async addComment(blogId: string, content: string, userId?: string) {
    const { data, error } = await supabase
      .from('comments')
      .insert({ blog_id: blogId, content, user_id: userId })
      .select()
      .single()

    if (error) throw error
    return data
  },

  async deleteComment(commentId: string) {
    const { error } = await supabase
      .from('comments')
      .delete()
      .eq('id', commentId)

    if (error) throw error
  }
}
