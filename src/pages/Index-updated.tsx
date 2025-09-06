import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import BlogCard from '@/components/BlogCard-updated'
import FloatingParticles from '@/components/FloatingParticles'
import { Button } from "@/components/ui/button"
import { Search, Filter, Loader2 } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { blogOperations, BlogPost } from '@/lib/supabase'
import { toast } from 'sonner'

const Index = () => {
  const [darkMode, setDarkMode] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // Fetch blogs from database
  const { data: blogs = [], isLoading, error, refetch } = useQuery({
    queryKey: ['blogs'],
    queryFn: blogOperations.getPublishedBlogs,
    staleTime: 0, // Disable caching to always fetch fresh data
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

  // Filter blogs based on search
  const filteredBlogs = blogs.filter(blog =>
    searchQuery.trim() === '' ||
    blog.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  // Show error toast if there's an error
  useEffect(() => {
    if (error) {
      toast.error('Failed to load blogs. Please try again later.')
    }
  }, [error])

  return (
    <div className="min-h-screen bg-background">
      <FloatingParticles />

      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} isAdmin={false} />

      <main>
        {/* Hero Section */}
        <Hero />

        {/* Blog Section */}
        <section id="blogs" className="relative py-20 px-4">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="aurora-text">Featured</span>{' '}
                <span className="text-foreground">Stories</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Dive into our collection of carefully crafted articles that inspire,
                educate, and spark meaningful conversations.
              </p>
            </motion.div>

            {/* Search & Filter */}
            <motion.div
              className="flex flex-col md:flex-row gap-4 mb-12 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 glass-card border-primary/20 focus:border-primary/40"
                />
              </div>
              <Button variant="outline" className="glass-card border-primary/20 hover:bg-primary/5">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </motion.div>

            {/* Loading State */}
            {isLoading && (
              <div className="flex justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            )}

            {/* Blog Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map((blog, index) => (
                <BlogCard
                  key={blog.id}
                  title={blog.title}
                  excerpt={blog.excerpt}
                  coverImage={blog.cover_image ?? ''}
                  author={blog.author || 'Aurora Team'}
publishedAt={blog.created_at ?? '2025-06-09T00:00:00Z'}
                  readTime={'5 min read'}
                  tags={blog.tags ?? []}
                  slug={blog.slug}
                  index={index}
                  blogId={blog.id}
                />
              ))}
            </div>

            {/* Load More Button */}
            {filteredBlogs.length > 0 && (
              <motion.div
                className="text-center mt-12"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Button
                  size="lg"
                  className="aurora-gradient text-white hover:opacity-90 glow-hover"
                >
                  Load More Stories
                </Button>
              </motion.div>
            )}

            {/* No Results */}
            {filteredBlogs.length === 0 && (
              <motion.div
                className="text-center py-20"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-2xl font-semibold mb-4">No articles found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your search terms or browse all articles
                </p>
                <Button
                  onClick={() => setSearchQuery('')}
                  variant="outline"
                  className="glass-card border-primary/20 hover:bg-primary/5"
                >
                  Clear Search
                </Button>
              </motion.div>
            )}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="relative py-20 px-4 bg-muted/20">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold">
                  <span className="aurora-text">Stay Updated</span>
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Get the latest articles and insights delivered straight to your inbox
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="glass-card border-primary/20 focus:border-primary/40"
                />
                <Button className="aurora-gradient text-white hover:opacity-90">
                  Subscribe
                </Button>
              </div>

              <p className="text-sm text-muted-foreground">
                No spam, ever. Unsubscribe at any time.
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative py-12 px-4 border-t border-border/50">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-center space-x-3">
              <div className="aurora-gradient w-8 h-8 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AC</span>
              </div>
              <span className="text-xl font-bold aurora-text">Maati World</span>
            </div>

            <p className="text-muted-foreground max-w-md mx-auto">
              Illuminating stories and ideas that shape our digital future
            </p>

            <div className="flex justify-center space-x-6">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Privacy
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Terms
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Contact
              </a>
            </div>

            <p className="text-sm text-muted-foreground">
              © 2025 Maati World. All rights reserved.
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  )
}

export default Index
