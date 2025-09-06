import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Clock, Share2, Heart, Bookmark } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Navbar from '@/components/Navbar'
import FloatingParticles from '@/components/FloatingParticles'

// Mock blog post data
const mockPost = {
  id: '1',
  title: 'The Future of Digital Storytelling',
  content: `
    <div class="prose prose-lg max-w-none">
      <p>Digital storytelling has evolved dramatically over the past decade, transforming from simple text-based narratives to immersive, interactive experiences that blur the lines between reality and fiction.</p>
      
      <h2>The Evolution of Narrative</h2>
      <p>Traditional storytelling methods are being revolutionized by emerging technologies. Virtual reality, augmented reality, and artificial intelligence are creating new possibilities for how we craft and consume stories.</p>
      
      <blockquote class="border-l-4 border-primary pl-6 italic text-muted-foreground my-6">
        "The future belongs to those who can tell their story in ways that connect with the digital-native generation." - Digital Media Expert
      </blockquote>
      
      <h2>Interactive Experiences</h2>
      <p>Modern audiences crave participation. They want to be part of the story, not just passive consumers. This shift has led to the rise of:</p>
      
      <ul>
        <li>Interactive documentaries</li>
        <li>Choose-your-own-adventure digital content</li>
        <li>Social media storytelling</li>
        <li>Gamified narratives</li>
      </ul>
      
      <h2>The Role of AI in Storytelling</h2>
      <p>Artificial intelligence is becoming an increasingly important tool for creators. From generating initial ideas to helping with character development and plot structures, AI is augmenting human creativity rather than replacing it.</p>
      
      <p>The future of digital storytelling is bright, filled with possibilities we're only beginning to explore. As technology continues to advance, so too will our ability to create meaningful, engaging narratives that resonate with audiences around the world.</p>
    </div>
  `,
  coverImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=600&fit=crop',
  author: 'Aurora Team',
  publishedAt: 'December 15, 2024',
  readTime: '5 min read',
  tags: ['Technology', 'Storytelling', 'Future'],
  likes: 42,
  isLiked: false,
  isBookmarked: false,
}

export default function BlogPost() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [darkMode, setDarkMode] = useState(false)
  const [post, setPost] = useState(mockPost)

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

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const handleLike = () => {
    setPost(prev => ({
      ...prev,
      isLiked: !prev.isLiked,
      likes: prev.isLiked ? prev.likes - 1 : prev.likes + 1
    }))
  }

  const handleBookmark = () => {
    setPost(prev => ({
      ...prev,
      isBookmarked: !prev.isBookmarked
    }))
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.title,
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

  return (
    <div className="min-h-screen bg-background">
      <FloatingParticles />
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
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
                {post.tags.map((tag, index) => (
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
                        {post.author.charAt(0)}
                      </span>
                    </div>
                    <span className="font-medium">{post.author}</span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{post.publishedAt}</span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLike}
                    className={`hover:bg-primary/5 ${post.isLiked ? 'text-red-500' : ''}`}
                  >
                    <Heart className={`w-4 h-4 mr-2 ${post.isLiked ? 'fill-current' : ''}`} />
                    {post.likes}
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleBookmark}
                    className={`hover:bg-primary/5 ${post.isBookmarked ? 'text-primary' : ''}`}
                  >
                    <Bookmark className={`w-4 h-4 ${post.isBookmarked ? 'fill-current' : ''}`} />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleShare}
                    className="hover:bg-primary/5"
                  >
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Cover Image */}
        <motion.section
          className="relative px-4 mb-12"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="max-w-4xl mx-auto">
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
            </div>
          </div>
        </motion.section>

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
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </motion.section>

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