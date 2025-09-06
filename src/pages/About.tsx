import { motion } from 'framer-motion'

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <div className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="aurora-text">About</span>{' '}
              <span className="text-foreground">Us</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover the heart behind Maati World and the stories that drive our passion.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-lg max-w-none text-justify"
          >
            <p className="text-foreground leading-relaxed mb-6">
              In the vast tapestry of human existence, I find myself compelled to share the intricate threads of my life's journey. From the earliest whispers of childhood dreams to the thunderous echoes of adult realizations, my stories unfold like a symphony of emotions and experiences. As a former chronicler of tales, I have witnessed the alarming beauty of love's fragile dance, the gut-wrenching agony of loss, and the triumphant rebirth of the human spirit. Through my poems, I delve into the depths of the soul, exploring themes of identity, belonging, and the relentless pursuit of meaning. Each verse is a mirror reflecting the universal struggles we all face, yet uniquely colored by my personal odyssey. Join me in this intimate exploration of life's paradoxes, where vulnerability meets strength, and where every story, no matter how alarming, holds the potential for profound connection and healing.
            </p>
            <p className="text-foreground leading-relaxed mb-6">
              My writing is not merely a collection of words; it is a testament to the resilience of the human heart. In a world that often demands conformity, I choose to embrace the chaos of authenticity. My former stories, born from the fires of personal transformation, serve as beacons for those navigating their own paths of self-discovery. They are raw, unfiltered accounts of triumphs and tribulations, designed to resonate with the core of our shared humanity. Through poetry, I paint pictures with emotions, crafting verses that linger in the mind long after the page is turned. These poems are not just literary exercises; they are cries from the soul, expressions of joy, sorrow, rage, and hope that transcend the boundaries of language.
            </p>
            <p className="text-foreground leading-relaxed mb-6">
              The alarming nature of my narratives stems from a commitment to truth-telling. I believe that true growth comes from confronting the uncomfortable realities of life, from acknowledging the shadows that lurk within us all. Yet, amidst the darkness, there is always light – the light of understanding, compassion, and ultimately, love. My stories and poems are invitations to explore these depths together, to question, to feel, and to emerge stronger on the other side. They are chronicles of a life lived fully, with all its messiness and magic, offered as gifts to anyone willing to listen and reflect.
            </p>
            <p className="text-foreground leading-relaxed">
              Welcome to Maati World, where stories breathe and poems pulse with life. Here, we celebrate the extraordinary in the ordinary, the profound in the mundane. My journey continues, and I invite you to walk alongside me, sharing in the beauty, the pain, and the infinite possibilities of the human experience. Together, we can create a space where every voice matters, every story counts, and every poem has the power to change the world.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
