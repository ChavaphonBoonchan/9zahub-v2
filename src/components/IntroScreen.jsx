import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Gamepad2, Volume2, VolumeX, Zap, Code, Palette } from 'lucide-react'
import { SFX } from '../sfx/sound'

export default function IntroScreen({ onEnter, muted, toggleMute }) {
  const [isButtonPressed, setIsButtonPressed] = useState(false)
  const [showLogo, setShowLogo] = useState(false)
  const [showTagline, setShowTagline] = useState(false)
  const [showButton, setShowButton] = useState(false)

  // Staggered animation sequence
  useEffect(() => {
    const timer1 = setTimeout(() => setShowLogo(true), 500)
    const timer2 = setTimeout(() => setShowTagline(true), 1500)
    const timer3 = setTimeout(() => setShowButton(true), 2500)
    
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [])

  const handleButtonClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (isButtonPressed) return
    
    setIsButtonPressed(true)
    SFX.play('swoosh')
    
    // Add a small delay to ensure sound plays
    setTimeout(() => {
      onEnter()
    }, 100)
  }

  const handleButtonMouseEnter = () => {
    if (!isButtonPressed && !muted) {
      SFX.play('hover')
    }
  }

  const handleButtonMouseDown = () => {
    if (!isButtonPressed && !muted) {
      SFX.play('click')
    }
  }

  // Animated logo text
  const logoText = "9ZAHUB.COM"
  const logoChars = logoText.split('')

  return (
    <div className="relative flex flex-col items-center justify-center h-screen overflow-hidden">
      {/* Background Grid */}
      <AnimatePresence>
        <motion.div
          key="intro"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 grid-bg"
        />
      </AnimatePresence>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary-400 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center space-y-8">
        
        {/* Animated Logo */}
        <AnimatePresence>
          {showLogo && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="text-center"
            >
              <div className="flex justify-center items-center mb-4">
                {logoChars.map((char, index) => (
                  <motion.span
                    key={index}
                    className="text-4xl md:text-6xl lg:text-7xl font-pixel text-primary-700 dark:text-blue-300 drop-shadow-lg"
                    initial={{ y: 50, opacity: 0, scale: 0 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 12,
                      delay: index * 0.1
                    }}
                    whileHover={{ 
                      scale: 1.2, 
                      color: "#1e90ff",
                      textShadow: "0 0 10px #1e90ff"
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </div>
              
              {/* Glitch effect */}
              <motion.div
                className="absolute inset-0 text-4xl md:text-6xl lg:text-7xl font-pixel text-red-500 opacity-0"
                animate={{
                  opacity: [0, 0.3, 0],
                  x: [0, -2, 2, 0]
                }}
                transition={{
                  duration: 0.2,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
              >
                {logoText}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tagline */}
        <AnimatePresence>
          {showTagline && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="text-center space-y-4"
            >
              <motion.p
                className="text-lg md:text-xl font-mono text-primary-600 dark:text-blue-200"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Ideas & Creative Projects
              </motion.p>
              
              {/* Feature icons */}
              <div className="flex justify-center items-center gap-6">
                <motion.div
                  className="flex items-center gap-2 text-primary-500"
                  whileHover={{ scale: 1.1 }}
                >
                  <Zap className="w-5 h-5" />
                  <span className="text-sm font-mono">Fast</span>
                </motion.div>
                <motion.div
                  className="flex items-center gap-2 text-primary-500"
                  whileHover={{ scale: 1.1 }}
                >
                  <Code className="w-5 h-5" />
                  <span className="text-sm font-mono">Simple</span>
                </motion.div>
                <motion.div
                  className="flex items-center gap-2 text-primary-500"
                  whileHover={{ scale: 1.1 }}
                >
                  <Palette className="w-5 h-5" />
                  <span className="text-sm font-mono">Creative</span>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enter Button */}
        <AnimatePresence>
          {showButton && (
            <motion.button
              onMouseEnter={handleButtonMouseEnter}
              onMouseDown={handleButtonMouseDown}
              onClick={handleButtonClick}
              disabled={isButtonPressed}
              className={`pixel-btn bg-white dark:bg-gray-800 text-primary-800 dark:text-gray-200 px-10 py-8 text-lg md:text-xl font-pixel transition-all duration-200 relative overflow-hidden ${
                isButtonPressed ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
              }`}
              initial={{ y: 50, opacity: 0, scale: 0.8 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -50, opacity: 0, scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 200, damping: 14 }}
              whileHover={!isButtonPressed ? { 
                scale: 1.05,
                boxShadow: "0 0 0 4px #002851, 0 0 0 8px #1e90ff, 0 0 20px rgba(30,144,255,0.5)"
              } : {}}
              whileTap={!isButtonPressed ? { scale: 0.95 } : {}}
            >
              {/* Button glow effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-400 to-transparent opacity-0"
                animate={{
                  x: ['-100%', '100%'],
                  opacity: [0, 0.5, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
              />
              
              <div className="flex items-center gap-4 relative z-10">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Gamepad2 className="w-7 h-7 md:w-8 md:h-8" />
                </motion.div>
                <span>Enter Website</span>
              </div>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Sound Toggle */}
      <motion.button
        onClick={toggleMute}
        className="absolute top-6 right-6 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-md p-3 text-primary-800 dark:text-gray-200 shadow hover:scale-105 transition-transform z-20"
        aria-label={muted ? 'Unmute SFX' : 'Mute SFX'}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 3 }}
      >
        {muted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
      </motion.button>

      {/* Scan line effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ y: ['-100%', '100%'] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
      >
        <div className="w-full h-1 bg-gradient-to-r from-transparent via-primary-400 to-transparent opacity-30" />
      </motion.div>
    </div>
  )
}