import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  PenTool,
  Plus,
  Edit,
  Trash2,
  Eye,
  Save,
  X,
  Upload,
  LogOut,
  Loader2,
  MessageSquare
} from 'lucide-react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import Navbar from '@/components/Navbar'
import FloatingParticles from '@/components/FloatingParticles'
import { blogOperations, BlogPost, BlogPostInsert } from '@/lib/supabase'
import { signIn, signOut, getUser } from '@/lib/supabase'
import { feedbackOperations, Feedback } from '@/lib/feedback-operations'
import { toast } from 'sonner'

export default function Admin() {
  const [darkMode, setDarkMode] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [currentPost, setCurrentPost] = useState<BlogPost | null>(null)
  const [user, setUser] = useState<any>(null)

  // Form state
  const [title, setTitle] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [content, setContent] = useState('')
  const [coverImage, setCoverImage] = useState('')
  const [author, setAuthor] = useState('')
  const [tags, setTags] = useState('')
  const [published, setPublished] = useState(false)
  const [uploading, setUploading] = useState(false)

  // Login state
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  const queryClient = useQueryClient()

  // Fetch blogs from database
  const { data: posts = [], isLoading, error } = useQuery({
    queryKey: ['admin-blogs'],
    queryFn: blogOperations.getAllBlogs,
    enabled: !!user, // Only fetch if user is authenticated
  })

  // Fetch feedback from database
  const { data: feedback = [], isLoading: loadingFeedback } = useQuery({
    queryKey: ['admin-feedback'],
    queryFn: feedbackOperations.getAllFeedback,
    enabled: !!user, // Only fetch if user is authenticated
  })

  // Mutations
  const createMutation = useMutation({
    mutationFn: blogOperations.createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-blogs'] })
      toast.success('Blog post created successfully!')
      setIsEditing(false)
      resetForm()
    },
    onError: (error) => {
      toast.error('Failed to create blog post')
      console.error('Create error:', error)
    }
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string, updates: any }) =>
      blogOperations.updateBlog(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-blogs'] })
      toast.success('Blog post updated successfully!')
      setIsEditing(false)
      resetForm()
    },
    onError: (error) => {
      toast.error('Failed to update blog post')
      console.error('Update error:', error)
    }
  })

  const deleteMutation = useMutation({
    mutationFn: blogOperations.deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-blogs'] })
      toast.success('Blog post deleted successfully!')
    },
    onError: (error) => {
      toast.error('Failed to delete blog post')
      console.error('Delete error:', error)
    }
  })

  // Initialize dark mode and check authentication
  useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode')
    if (savedTheme) {
      setDarkMode(JSON.parse(savedTheme))
    }

    // Check if user is authenticated
    getUser().then(setUser).catch(() => setUser(null))
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const resetForm = () => {
    setTitle('')
    setExcerpt('')
    setContent('')
    setCoverImage('')
    setAuthor('')
    setTags('')
    setPublished(false)
    setCurrentPost(null)
  }

  const handleEdit = (post: BlogPost) => {
    setCurrentPost(post)
    setTitle(post.title ?? '')
    setExcerpt(post.excerpt ?? '')
    setContent(post.content ?? '')
    setCoverImage(post.cover_image ?? '')
    setAuthor(post.author ?? '')
    setTags(post.tags?.join(', ') ?? '')
    setPublished(post.published ?? false)
    setIsEditing(true)
  }

  const handleNew = () => {
    resetForm()
    setIsEditing(true)
  }

  const handleSave = async () => {
    if (!title.trim()) {
      toast.error('Title is required')
      return
    }

    let baseSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
    let slug = baseSlug
    let counter = 1

    // Check for existing slugs and make unique
    try {
      const existingPosts = await blogOperations.getAllBlogs()
      const existingSlugs = existingPosts
        .filter(post => currentPost ? post.id !== currentPost.id : true)
        .map(post => post.slug)

      while (existingSlugs.includes(slug)) {
        slug = `${baseSlug}-${counter}`
        counter++
      }
    } catch (error) {
      console.error('Error checking existing slugs:', error)
      // Continue with base slug if check fails
    }

    const postData: BlogPostInsert = {
      title: title.trim(),
      slug,
      excerpt: excerpt.trim(),
      content: content.trim(),
      cover_image: coverImage.trim(),
      author: author.trim() || 'Aurora Team',
      published,
      tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
    }

    if (currentPost) {
      updateMutation.mutate({ id: currentPost.id, updates: postData })
    } else {
      createMutation.mutate(postData)
    }
  }

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this blog post?')) {
      deleteMutation.mutate(id)
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    resetForm()
  }

  const handleLogin = async (email: string, password: string) => {
    try {
      console.log('Attempting login with email:', email)
      const { data, error } = await signIn(email, password)
      if (error) {
        console.error('Supabase signIn error:', error)
        toast.error(`Login failed: ${error.message}`)
        return
      }
      console.log('Login successful, user:', data.user)
      setUser(data.user)
      toast.success('Logged in successfully!')
    } catch (error) {
      console.error('Unexpected login error:', error)
      toast.error('Login failed due to unexpected error')
    }
  }

  const handleLogout = async () => {
    try {
      await signOut()
      setUser(null)
      toast.success('Logged out successfully!')
    } catch (error) {
      toast.error('Logout failed')
      console.error('Logout error:', error)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md glass-card">
          <CardHeader className="text-center">
            <CardTitle className="aurora-text text-2xl">Admin Login</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={(e) => {
              e.preventDefault()
              handleLogin(loginEmail, loginPassword)
            }}>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@aurorachronicle.com"
                  autoComplete="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
              </div>
              <Button
                type="submit"
                className="w-full aurora-gradient text-white"
              >
                Sign In
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <FloatingParticles />
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="pt-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            className="flex items-center justify-between mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <h1 className="text-3xl font-bold mb-2">
                <span className="aurora-text">Admin Dashboard</span>
              </h1>
              <p className="text-muted-foreground">Manage your blog posts and content</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button onClick={handleNew} className="aurora-gradient text-white">
                <Plus className="w-4 h-4 mr-2" />
                New Post
              </Button>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </motion.div>

          <Tabs defaultValue="posts" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="posts">Blog Posts</TabsTrigger>
              <TabsTrigger value="feedback">Feedback</TabsTrigger>
            </TabsList>
            <TabsContent value="posts">

          {isEditing ? (
            /* Editor View */
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <PenTool className="w-5 h-5 text-primary" />
                      <span>{currentPost ? 'Edit Post' : 'Create New Post'}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button onClick={handleSave} className="aurora-gradient text-white">
                        <Save className="w-4 h-4 mr-2" />
                        Save
                      </Button>
                      <Button variant="outline" onClick={handleCancel}>
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Basic Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter post title"
                      />
                    </div>
                    <div>
                      <Label htmlFor="author">Author</Label>
                      <Input
                        id="author"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        placeholder="Enter author name"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="coverImage">Cover Image</Label>
                    <input
                      type="file"
                      accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files?.[0]
                          if (!file) return
                          try {
                            setUploading(true)
                            // Generate unique filename
                            const fileName = `${Date.now()}-${file.name}`

                            // Convert File to base64 string for ImageKit
                            const reader = new FileReader()
                            reader.onload = async () => {
                              try {
                                const base64String = reader.result as string
                                // Upload file to ImageKit storage
                                const response = await blogOperations.uploadImage(fileName, base64String)
                                // Use the URL from ImageKit upload response
                                const imageUrl = (response as any).url
                                setCoverImage(imageUrl)
                                toast.success('Image uploaded successfully')
                              } catch (uploadErr) {
                                toast.error('Failed to upload image')
                                console.error('Upload error:', uploadErr)
                              } finally {
                                setUploading(false)
                              }
                            }
                            reader.onerror = () => {
                              toast.error('Failed to read file')
                              setUploading(false)
                            }
                            reader.readAsDataURL(file)
                          } catch (err) {
                            toast.error('Unexpected error during image upload')
                            console.error(err)
                            setUploading(false)
                          }
                        }}
                    />
                    {coverImage && (
                      <div className="mt-2">
                        <img src={coverImage} alt="Cover preview" className="max-w-full h-32 object-cover rounded" />
                      </div>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="excerpt">Excerpt</Label>
                    <Textarea
                      id="excerpt"
                      value={excerpt}
                      onChange={(e) => setExcerpt(e.target.value)}
                      placeholder="Brief description of the post"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="tags">Tags (comma separated)</Label>
                    <Input
                      id="tags"
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                      placeholder="Technology, AI, Future"
                    />
                  </div>

                  <div>
                    <Label>Content</Label>
                    <div className="mt-2">
                      <ReactQuill
                        value={content}
                        onChange={setContent}
                        modules={{
                          toolbar: [
                            [{ 'header': [1, 2, 3, false] }],
                            ['bold', 'italic', 'underline', 'strike'],
                            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                            ['blockquote', 'code-block'],
                            ['link', 'image'],
                            ['clean']
                          ],
                        }}
                        className="bg-background"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="published"
                      checked={published}
                      onChange={(e) => setPublished(e.target.checked)}
                      className="rounded border-border"
                    />
                    <Label htmlFor="published">Published</Label>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            /* Posts List */
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {posts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="glass-card glow-hover">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-xl font-semibold">{post.title}</h3>
                            <Badge 
                              variant={post.published ? "default" : "secondary"}
                              className={post.published ? "aurora-gradient text-white" : ""}
                            >
                              {post.published ? 'Published' : 'Draft'}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground mb-3 line-clamp-2">
                            {post.excerpt}
                          </p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {post.tags.map((tag, tagIndex) => (
                              <Badge key={tagIndex} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Created: {new Date(post.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        
                        <div className="flex items-center space-x-2 ml-6">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleEdit(post)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDelete(post.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
            </TabsContent>
            <TabsContent value="feedback">
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {loadingFeedback ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin" />
                  </div>
                ) : feedback.length === 0 ? (
                  <Card className="glass-card">
                    <CardContent className="p-6 text-center">
                      <MessageSquare className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground">No feedback received yet.</p>
                    </CardContent>
                  </Card>
                ) : (
                  feedback.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card className="glass-card glow-hover">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <h3 className="text-lg font-semibold">{item.name}</h3>
                                <Badge variant="outline" className="text-xs">
                                  {new Date(item.created_at).toLocaleDateString()}
                                </Badge>
                              </div>
                              <p className="text-muted-foreground mb-2">{item.email}</p>
                              <p className="text-sm">{item.message}</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                if (confirm('Are you sure you want to delete this feedback?')) {
                                  feedbackOperations.deleteFeedback(item.id)
                                  queryClient.invalidateQueries({ queryKey: ['admin-feedback'] })
                                  toast.success('Feedback deleted successfully!')
                                }
                              }}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))
                )}
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
