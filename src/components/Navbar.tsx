
import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Moon, Sun, Menu, X, PenTool } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

interface NavbarProps {
  darkMode: boolean
  toggleDarkMode: () => void
  isAdmin?: boolean
}

export default function Navbar({ darkMode, toggleDarkMode, isAdmin }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMenuOpen && !(event.target as Element).closest('.mobile-menu')) {
        setIsMenuOpen(false)
      }
    }

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMenuOpen])

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
                Maati World
              </span>
            </Link>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <motion.div
              className="text-foreground hover:text-primary transition-colors"
              whileHover={{ y: -2 }}
            >
              <Link to="/">
                Home
              </Link>
            </motion.div>
            <motion.div
              className="text-foreground hover:text-primary transition-colors"
              whileHover={{ y: -2 }}
            >
              <Link to="/blogs">
                Blogs
              </Link>
            </motion.div>
            <motion.div
              className="text-foreground hover:text-primary transition-colors"
              whileHover={{ y: -2 }}
            >
              <Link to="/about">
                About
              </Link>
            </motion.div>
            <motion.div
              className="text-foreground hover:text-primary transition-colors"
              whileHover={{ y: -2 }}
            >
              <Link to="/contact">
                Contact
              </Link>
            </motion.div>
            {/* Removed Contact Page link as per user feedback */}
            {/* <motion.a
              href="/contact"
              className="text-foreground hover:text-primary transition-colors"
              whileHover={{ y: -2 }}
            >
              Contact Page
            </motion.a> */}
            
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

            {/* Removed admin button as per user request */}
            {/* {isAdmin && (
              <Link to="/admin">
                <Button className="aurora-gradient text-white hover:opacity-90">
                  Admin
                </Button>
              </Link>
            )} */}
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
            <Link to="/" className="block py-2 text-foreground hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            <Link to="/blogs" className="block py-2 text-foreground hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
              Blogs
            </Link>
            <Link to="/about" className="block py-2 text-foreground hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
              About
            </Link>
            <Link to="/contact" className="block py-2 text-foreground hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
              Contact
            </Link>
            <Link to="/contact" className="block py-2 text-foreground hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
              Contact Page
            </Link>
            {/* Removed admin button as per user request */}
            {/* {isAdmin && (
              <Link to="/admin">
                <Button className="w-full aurora-gradient text-white hover:opacity-90">
                  Admin
                </Button>
              </Link>
            )} */}
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}