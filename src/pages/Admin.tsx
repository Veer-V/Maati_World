import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { 
  PenTool, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Save, 
  X,
  Upload,
  LogOut
} from 'lucide-react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import Navbar from '@/components/Navbar'
import FloatingParticles from '@/components/FloatingParticles'

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  coverImage: string
  tags: string[]
  published: boolean
  createdAt: string
}

// Mock blog data for admin
const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Future of Digital Storytelling',
    excerpt: 'Exploring how technology is reshaping the way we tell and consume stories...',
    content: '<p>Full content here...</p>',
    coverImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&h=300&fit=crop',
    tags: ['Technology', 'Storytelling'],
    published: true,
    createdAt: '2024-12-15T10:00:00Z',
  },
  {
    id: '2',
    title: 'Creative Writing in the AI Era',
    excerpt: 'How artificial intelligence is becoming a collaborative partner...',
    content: '<p>Full content here...</p>',
    coverImage: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=500&h=300&fit=crop',
    tags: ['AI', 'Writing'],
    published: false,
    createdAt: '2024-12-12T10:00:00Z',
  },
]

export default function Admin() {
  const [darkMode, setDarkMode] = useState(false)
  const [posts, setPosts] = useState<BlogPost[]>(mockBlogPosts)
  const [isEditing, setIsEditing] = useState(false)
  const [currentPost, setCurrentPost] = useState<BlogPost | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(true) // Mock authentication

  // Form state
  const [title, setTitle] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [content, setContent] = useState('')
  const [coverImage, setCoverImage] = useState('')
  const [tags, setTags] = useState('')
  const [published, setPublished] = useState(false)

  // Initialize dark mode
  useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode')
    if (savedTheme) {
      setDarkMode(JSON.parse(savedTheme))
    }
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const handleEdit = (post: BlogPost) => {
    setCurrentPost(post)
    setTitle(post.title)
    setExcerpt(post.excerpt)
    setContent(post.content)
    setCoverImage(post.coverImage)
    setTags(post.tags.join(', '))
    setPublished(post.published)
    setIsEditing(true)
  }

  const handleNew = () => {
    setCurrentPost(null)
    setTitle('')
    setExcerpt('')
    setContent('')
    setCoverImage('')
    setTags('')
    setPublished(false)
    setIsEditing(true)
  }

  const handleSave = () => {
    const postData: BlogPost = {
      id: currentPost?.id || Date.now().toString(),
      title,
      excerpt,
      content,
      coverImage,
      tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
      published,
      createdAt: currentPost?.createdAt || new Date().toISOString(),
    }

    if (currentPost) {
      setPosts(posts.map(p => p.id === currentPost.id ? postData : p))
    } else {
      setPosts([postData, ...posts])
    }

    setIsEditing(false)
  }

  const handleDelete = (id: string) => {
    setPosts(posts.filter(p => p.id !== id))
  }

  const handleCancel = () => {
    setIsEditing(false)
    setCurrentPost(null)
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md glass-card">
          <CardHeader className="text-center">
            <CardTitle className="aurora-text text-2xl">Admin Login</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="admin@aurorachronicle.com" />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" />
            </div>
            <Button 
              className="w-full aurora-gradient text-white"
              onClick={() => setIsAuthenticated(true)}
            >
              Sign In
            </Button>
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
              <Button variant="outline" onClick={() => setIsAuthenticated(false)}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </motion.div>

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
                      <Label htmlFor="coverImage">Cover Image URL</Label>
                      <Input
                        id="coverImage"
                        value={coverImage}
                        onChange={(e) => setCoverImage(e.target.value)}
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
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
                            Created: {new Date(post.createdAt).toLocaleDateString()}
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
        </div>
      </main>
    </div>
  )
}