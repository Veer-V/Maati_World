import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Home, Search } from "lucide-react";
import FloatingParticles from "@/components/FloatingParticles";

const NotFound = () => {
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  // Initialize dark mode
  useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme) {
      setDarkMode(JSON.parse(savedTheme));
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      <FloatingParticles />
      
      <motion.div 
        className="text-center z-10 max-w-2xl mx-auto px-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="mb-8"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="aurora-gradient w-32 h-32 rounded-3xl flex items-center justify-center mx-auto mb-8">
            <span className="text-6xl font-bold text-white">404</span>
          </div>
        </motion.div>

        <motion.h1 
          className="text-4xl md:text-5xl font-bold mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <span className="aurora-text">Page Not Found</span>
        </motion.h1>

        <motion.p 
          className="text-xl text-muted-foreground mb-8 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Oops! The page you're looking for seems to have wandered into the digital void. 
          Let's get you back on track to discover amazing stories.
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Button 
            onClick={() => window.location.href = '/'}
            size="lg" 
            className="aurora-gradient text-white hover:opacity-90 glow-hover px-8 py-6"
          >
            <Home className="w-5 h-5 mr-2" />
            Return Home
          </Button>
          
          <Button 
            onClick={() => window.location.href = '/#blogs'}
            size="lg" 
            variant="outline" 
            className="glass-card border-primary/30 hover:bg-primary/5 px-8 py-6"
          >
            <Search className="w-5 h-5 mr-2" />
            Explore Articles
          </Button>
        </motion.div>

        <motion.div
          className="mt-12 text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <p>Lost? Try searching for something specific or browse our featured content.</p>
        </motion.div>
      </motion.div>

      {/* Floating decoration elements */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-24 h-24 aurora-gradient rounded-full blur-3xl opacity-20"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-32 h-32 bg-accent/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -25, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
    </div>
  );
};

export default NotFound;
