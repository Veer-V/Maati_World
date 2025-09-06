import { motion } from 'framer-motion'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Link } from 'react-router-dom'

interface BlogCardProps {
  title: string
  excerpt: string
  coverImage: string
  author: string
  publishedAt: string
  readTime: string
  tags: string[]
  slug: string
  index: number
}

export default function BlogCard({ 
  title, 
  excerpt, 
  coverImage, 
  author, 
  publishedAt, 
  readTime, 
  tags, 
  slug,
  index 
}: BlogCardProps) {
  return (
    <motion.article
      className="glass-card rounded-2xl overflow-hidden glow-hover group"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
    >
      <Link to={`/post/${slug}`} className="block">
        {/* Cover Image */}
        <div className="relative overflow-hidden h-48">
          <motion.img
            src={coverImage}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.map((tag, tagIndex) => (
              <Badge 
                key={tagIndex} 
                variant="secondary"
                className="text-xs aurora-gradient text-white"
              >
                {tag}
              </Badge>
            ))}
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h3>

          {/* Excerpt */}
          <p className="text-muted-foreground mb-4 line-clamp-3">
            {excerpt}
          </p>

          {/* Meta Info */}
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{publishedAt}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{readTime}</span>
              </div>
            </div>
          </div>

          {/* Author & Read More */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full aurora-gradient flex items-center justify-center">
                <span className="text-white text-sm font-semibold">
                  {author.charAt(0)}
                </span>
              </div>
              <span className="text-sm font-medium">{author}</span>
            </div>

            <Button 
              variant="ghost" 
              size="sm"
              className="group/btn hover:text-primary"
            >
              Read More
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
            </Button>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}