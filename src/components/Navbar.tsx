import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Moon, Sun, Menu, X, PenTool } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

interface NavbarProps {
  darkMode: boolean
  toggleDarkMode: () => void
}

export default function Navbar({ darkMode, toggleDarkMode }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'glass-card shadow-lg' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
          >
            <Link to="/" className="flex items-center space-x-3">
              <div className="aurora-gradient w-10 h-10 rounded-xl flex items-center justify-center">
                <PenTool className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold aurora-text">
                Aurora Chronicle
              </span>
            </Link>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <motion.a 
              href="#home" 
              className="text-foreground hover:text-primary transition-colors"
              whileHover={{ y: -2 }}
            >
              Home
            </motion.a>
            <motion.a 
              href="#blogs" 
              className="text-foreground hover:text-primary transition-colors"
              whileHover={{ y: -2 }}
            >
              Blogs
            </motion.a>
            <motion.a 
              href="#about" 
              className="text-foreground hover:text-primary transition-colors"
              whileHover={{ y: -2 }}
            >
              About
            </motion.a>
            <motion.a 
              href="#contact" 
              className="text-foreground hover:text-primary transition-colors"
              whileHover={{ y: -2 }}
            >
              Contact
            </motion.a>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="glow-hover"
            >
              {darkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </Button>

            <Link to="/admin">
              <Button className="aurora-gradient text-white hover:opacity-90">
                Admin Login
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
            >
              {darkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            className="md:hidden glass-card mt-2 rounded-xl p-4 space-y-3"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <a href="#home" className="block py-2 text-foreground hover:text-primary transition-colors">
              Home
            </a>
            <a href="#blogs" className="block py-2 text-foreground hover:text-primary transition-colors">
              Blogs
            </a>
            <a href="#about" className="block py-2 text-foreground hover:text-primary transition-colors">
              About
            </a>
            <a href="#contact" className="block py-2 text-foreground hover:text-primary transition-colors">
              Contact
            </a>
            <Link to="/admin">
              <Button className="w-full aurora-gradient text-white hover:opacity-90">
                Admin Login
              </Button>
            </Link>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}