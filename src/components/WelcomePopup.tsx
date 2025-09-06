import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, BookOpen, Sparkles } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface WelcomePopupProps {
  isOpen: boolean
  onClose: () => void
  darkMode: boolean
}

const WelcomePopup = ({ isOpen, onClose, darkMode }: WelcomePopupProps) => {
  const [showAnimation, setShowAnimation] = useState(false)

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setShowAnimation(true), 300)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={`relative max-w-md mx-4 p-8 rounded-2xl shadow-2xl ${
              darkMode
                ? 'bg-gray-900/95 border border-gray-700'
                : 'bg-white/95 border border-gray-200'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className={`absolute top-4 right-4 p-1 rounded-full transition-colors ${
                darkMode
                  ? 'hover:bg-gray-700 text-gray-400 hover:text-white'
                  : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
              }`}
            >
              <X className="w-5 h-5" />
            </button>

            {/* Content */}
            <div className="text-center space-y-6">
              {/* Icon Animation */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: showAnimation ? 1 : 0 }}
                transition={{ delay: 0.5, type: "spring", damping: 15 }}
                className="flex justify-center"
              >
                <div className={`p-4 rounded-full ${
                  darkMode ? 'bg-purple-600/20' : 'bg-purple-100'
                }`}>
                  <BookOpen className={`w-8 h-8 ${
                    darkMode ? 'text-purple-400' : 'text-purple-600'
                  }`} />
                </div>
              </motion.div>

              {/* Title */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <h2 className={`text-2xl font-bold ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Welcome to Maati World
                </h2>
              </motion.div>

              {/* Message */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="space-y-3"
              >
                <p className={`text-lg ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Embark on a journey through stories that illuminate the human experience.
                </p>
                <p className={`text-sm ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Discover tales of wonder, wisdom, and inspiration.
                </p>
              </motion.div>

              {/* Sparkles Animation */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: showAnimation ? 1 : 0 }}
                transition={{ delay: 1.2 }}
                className="flex justify-center space-x-2"
              >
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3
                    }}
                  >
                    <Sparkles className={`w-4 h-4 ${
                      darkMode ? 'text-purple-400' : 'text-purple-500'
                    }`} />
                  </motion.div>
                ))}
              </motion.div>

              {/* Button */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.4 }}
              >
                <Button
                  onClick={onClose}
                  className={`w-full ${
                    darkMode
                      ? 'bg-purple-600 hover:bg-purple-700 text-white'
                      : 'bg-purple-600 hover:bg-purple-700 text-white'
                  }`}
                >
                  Begin Your Journey
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default WelcomePopup
