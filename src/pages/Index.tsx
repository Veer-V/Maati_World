import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import BlogCard from '@/components/BlogCard'
import FloatingParticles from '@/components/FloatingParticles'
import { Button } from "@/components/ui/button"
import { Search, Filter } from 'lucide-react'
import { Input } from "@/components/ui/input"

// Mock blog data
const mockBlogs = [
  {
    id: '1',
    title: 'The Future of Digital Storytelling',
    excerpt: 'Exploring how technology is reshaping the way we tell and consume stories in the digital age.',
    coverImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&h=300&fit=crop',
    author: 'Aurora Team',
    publishedAt: 'Dec 15, 2024',
    readTime: '5 min read',
    tags: ['Technology', 'Storytelling', 'Future'],
    slug: 'future-of-digital-storytelling',
  },
  {
    id: '2',
    title: 'Creative Writing in the AI Era',
    excerpt: 'How artificial intelligence is becoming a collaborative partner in the creative writing process.',
    coverImage: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=500&h=300&fit=crop',
    author: 'Maati Singh',
    publishedAt: 'Dec 12, 2024',
    readTime: '7 min read',
    tags: ['AI', 'Writing', 'Creativity'],
    slug: 'creative-writing-ai-era',
  },
  {
    id: '3',
    title: 'Building Immersive Web Experiences',
    excerpt: 'A deep dive into modern web technologies that create engaging and interactive user experiences.',
    coverImage: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=500&h=300&fit=crop',
    author: 'Veer Patel',
    publishedAt: 'Dec 10, 2024',
    readTime: '6 min read',
    tags: ['Web Development', 'UX', 'Design'],
    slug: 'building-immersive-web-experiences',
  },
  {
    id: '4',
    title: 'The Art of Visual Communication',
    excerpt: 'Understanding how colors, typography, and layout work together to convey powerful messages.',
    coverImage: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=500&h=300&fit=crop',
    author: 'Design Studio',
    publishedAt: 'Dec 8, 2024',
    readTime: '4 min read',
    tags: ['Design', 'Visual Arts', 'Communication'],
    slug: 'art-of-visual-communication',
  },
  {
    id: '5',
    title: 'Exploring Digital Minimalism',
    excerpt: 'How embracing minimalist principles can lead to more meaningful digital experiences.',
    coverImage: 'https://images.unsplash.com/photo-1493612276216-ee3925520721?w=500&h=300&fit=crop',
    author: 'Mindful Tech',
    publishedAt: 'Dec 5, 2024',
    readTime: '8 min read',
    tags: ['Minimalism', 'Digital Wellness', 'Philosophy'],
    slug: 'exploring-digital-minimalism',
  },
  {
    id: '6',
    title: 'The Psychology of Color in Design',
    excerpt: 'Discovering how different colors influence emotions and decision-making in digital interfaces.',
    coverImage: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=500&h=300&fit=crop',
    author: 'Color Theory Lab',
    publishedAt: 'Dec 3, 2024',
    readTime: '5 min read',
    tags: ['Psychology', 'Color Theory', 'Design'],
    slug: 'psychology-of-color-in-design',
  },
]

const Index = () => {
  const [darkMode, setDarkMode] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredBlogs, setFilteredBlogs] = useState(mockBlogs)

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
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredBlogs(mockBlogs)
    } else {
      const filtered = mockBlogs.filter(blog =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
      setFilteredBlogs(filtered)
    }
  }, [searchQuery])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <div className="min-h-screen bg-background">
      <FloatingParticles />
      
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
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

            {/* Blog Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map((blog, index) => (
                <BlogCard
                  key={blog.id}
                  title={blog.title}
                  excerpt={blog.excerpt}
                  coverImage={blog.coverImage}
                  author={blog.author}
                  publishedAt={blog.publishedAt}
                  readTime={blog.readTime}
                  tags={blog.tags}
                  slug={blog.slug}
                  index={index}
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
              <span className="text-xl font-bold aurora-text">Aurora Chronicle</span>
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
              © 2024 Aurora Chronicle. All rights reserved.
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  )
}

export default Index
