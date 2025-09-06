import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'
import { ArrowLeft, Calendar, Clock, Share2, Heart, Loader2, MessageCircle, Send } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Navbar from '@/components/Navbar'
import FloatingParticles from '@/components/FloatingParticles'
import { blogOperations } from '@/lib/supabase'
import { likesOperations, commentsOperations } from '@/lib/likes-comments-operations'
import { toast } from 'sonner'

export default function BlogPost() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [darkMode, setDarkMode] = useState(false)
  const [likesCount, setLikesCount] = useState(0)
  const [hasLiked, setHasLiked] = useState(false)
  const [loadingLikes, setLoadingLikes] = useState(false)
  const [commentText, setCommentText] = useState('')
  const [isSubmittingComment, setIsSubmittingComment] = useState(false)

  // Fetch blog post from database
  const { data: post, isLoading: loadingPost, error } = useQuery({
    queryKey: ['blog', slug],
    queryFn: () => blogOperations.getBlogBySlug(slug!),
    enabled: !!slug,
  })

  // Fetch comments
  const { data: comments = [], refetch: refetchComments } = useQuery({
    queryKey: ['comments', post?.id],
    queryFn: () => post?.id ? commentsOperations.getComments(post.id) : Promise.resolve([]),
    enabled: !!post?.id,
  })

  // Initialize dark mode from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode')
    if (savedTheme) {
      setDarkMode(JSON.parse(savedTheme))
    }
  }, [])

  // Apply dark mode class to document
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
  }, [darkMode])

  // Load likes data when post is available
  useEffect(() => {
    if (post?.id) {
      loadLikesData()
    }
  }, [post?.id])

  const loadLikesData = async () => {
    if (!post?.id) return
    try {
      const [count, liked] = await Promise.all([
        likesOperations.getLikesCount(post.id),
        likesOperations.hasUserLiked(post.id)
      ])
      setLikesCount(count)
      setHasLiked(liked)
    } catch (error) {
      console.error('Error loading likes data:', error)
    }
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const handleLike = async () => {
    if (loadingLikes || !post?.id) return

    setLoadingLikes(true)
    try {
      if (hasLiked) {
        await likesOperations.removeLike(post.id)
        setLikesCount(prev => prev - 1)
        setHasLiked(false)
      } else {
        await likesOperations.addLike(post.id)
        setLikesCount(prev => prev + 1)
        setHasLiked(true)
        toast.success('Liked!')
      }
    } catch (error) {
      console.error('Error toggling like:', error)
      toast.error('Failed to update like')
    } finally {
      setLoadingLikes(false)
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post?.title || '',
          text: post?.title || '',
          url: window.location.href,
        })
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href)
    }
  }

  const handleSubmitComment = async () => {
    if (!commentText.trim() || !post?.id) return

    setIsSubmittingComment(true)
    try {
      await commentsOperations.addComment(post.id, commentText.trim())
      setCommentText('')
      refetchComments()
      toast.success('Comment added!')
    } catch (error) {
      console.error('Error adding comment:', error)
      toast.error('Failed to add comment')
    } finally {
      setIsSubmittingComment(false)
    }
  }

  if (loadingPost) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Post not found</h1>
          <Button onClick={() => navigate('/')}>Go Home</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <FloatingParticles />
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} isAdmin={false} />

      <main className="pt-20">
        {/* Header */}
        <section className="relative py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Button
                variant="ghost"
                onClick={() => navigate(-1)}
                className="mb-6 hover:bg-primary/5"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Articles
              </Button>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags?.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="aurora-gradient text-white"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                {post.title}
              </h1>

              {/* Meta Info */}
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 space-y-4 md:space-y-0">
                <div className="flex items-center space-x-6 text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 rounded-full aurora-gradient flex items-center justify-center">
                      <span className="text-white font-semibold">
                        {post.author?.charAt(0) || 'A'}
                      </span>
                    </div>
                    <span className="font-medium">{post.author || 'Aurora Team'}</span>
                  </div>

                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{post.created_at ? new Date(post.created_at).toLocaleDateString() : ''}</span>
                  </div>

                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>5 min read</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleShare}
                    className="hover:bg-primary/5"
                  >
                    <Share2 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLike}
                    disabled={loadingLikes}
                    className={`${hasLiked ? 'text-red-500' : 'text-muted-foreground'} hover:text-red-500`}
                  >
                    <Heart className={`w-4 h-4 ${hasLiked ? 'fill-current' : ''}`} />
                    <span className="ml-1">{likesCount}</span>
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Cover Image */}
        {post.cover_image && (
          <motion.section
            className="relative px-4 mb-12"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="max-w-4xl mx-auto">
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src={post.cover_image}
                  alt={post.title || ''}
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
              </div>
            </div>
          </motion.section>
        )}

        {/* Content */}
        <motion.section
          className="px-4 pb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="max-w-3xl mx-auto">
            <div
              className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-bold prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-ul:text-foreground prose-li:text-foreground prose-blockquote:border-primary prose-blockquote:text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: post.content || '' }}
            />
          </div>
        </motion.section>

        {/* Comments Section */}
        <section className="px-4 pb-20">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MessageCircle className="w-5 h-5" />
                    <span>Comments ({comments.length})</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Add Comment */}
                  <div className="space-y-3">
                    <Textarea
                      placeholder="Share your thoughts..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      className="min-h-[100px] glass-card border-primary/20 focus:border-primary/40"
                    />
                    <Button
                      onClick={handleSubmitComment}
                      disabled={!commentText.trim() || isSubmittingComment}
                      className="aurora-gradient text-white"
                    >
                      {isSubmittingComment ? (
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      ) : (
                        <Send className="w-4 h-4 mr-2" />
                      )}
                      Post Comment
                    </Button>
                  </div>

                  {/* Comments List */}
                  <div className="space-y-4">
                    {comments.map((comment, index) => (
                      <motion.div
                        key={comment.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="border-b border-border/50 pb-4 last:border-b-0"
                      >
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 rounded-full aurora-gradient flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-sm font-semibold">
                              {comment.author?.charAt(0) || 'A'}
                            </span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-medium text-sm">
                                {comment.author || 'Anonymous'}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {new Date(comment.created_at).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-sm text-foreground">{comment.content}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {comments.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No comments yet. Be the first to share your thoughts!</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-muted/20">
          <motion.div
            className="max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              <span className="aurora-text">Enjoyed this article?</span>
            </h2>
            <p className="text-muted-foreground mb-6">
              Subscribe to our newsletter for more insights and stories
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg glass-card border border-primary/20 focus:border-primary/40 focus:outline-none"
              />
              <Button className="aurora-gradient text-white hover:opacity-90">
                Subscribe
              </Button>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  )
}
