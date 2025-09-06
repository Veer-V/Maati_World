import imagekit from '@/lib/imagekit';
import { supabase } from '@/integrations/supabase/client'
import { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types'

// Blog post type (using database types)
export type BlogPost = Tables<'blogs'>

// Blog post insert type
export type BlogPostInsert = TablesInsert<'blogs'>

// Blog post update type
export type BlogPostUpdate = TablesUpdate<'blogs'>

// Blog operations
export const blogOperations = {
  // Get all published blogs
  async getPublishedBlogs() {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  },

  // Get all blogs (for admin)
  async getAllBlogs() {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  },

  // Get blog by slug
  async getBlogBySlug(slug: string) {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single()

    if (error) throw error
    return data
  },

  // Create new blog
  async createBlog(blog: BlogPostInsert) {
    const { data, error } = await supabase
      .from('blogs')
      .insert(blog)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Update blog
  async updateBlog(id: string, updates: BlogPostUpdate) {
    const { data, error } = await supabase
      .from('blogs')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Delete blog
  async deleteBlog(id: string) {
    // First, get the blog post to retrieve the cover image URL
    const { data: blog, error: fetchError } = await supabase
      .from('blogs')
      .select('cover_image')
      .eq('id', id)
      .single()

    if (fetchError) throw fetchError

    // Delete the blog post from database
    const { error } = await supabase
      .from('blogs')
      .delete()
      .eq('id', id)

    if (error) throw error

    // If there's a cover image, delete it from ImageKit
    if (blog?.cover_image) {
      try {
        // Extract file ID from ImageKit URL
        // ImageKit URLs typically look like: https://ik.imagekit.io/.../fileId
        const urlParts = blog.cover_image.split('/')
        const fileId = urlParts[urlParts.length - 1]

        if (fileId) {
          await imagekit.deleteFile(fileId)
        }
      } catch (imageError) {
        console.warn('Failed to delete image from ImageKit:', imageError)
        // Don't throw error here as the blog post is already deleted
      }
    }
  },

  // Search blogs
  async searchBlogs(query: string) {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('published', true)
      .or(`title.ilike.%${query}%,excerpt.ilike.%${query}%`)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  },

  // Upload image to ImageKit storage
  async uploadImage(fileName: string, file: Buffer | string | File) {
    try {
      const response = await imagekit.upload({
        file: file,
        fileName: fileName,
        folder: '/Blogger',
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get public URL for uploaded image
  getPublicUrl(path: string) {
    // ImageKit URLs are usually returned directly on upload
    // So this function can just return the path or full URL if needed
    return path;
  }
}

// Auth helpers
export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  return { data, error }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export const getUser = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}
