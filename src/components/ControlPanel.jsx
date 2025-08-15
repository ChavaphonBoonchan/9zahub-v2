import React from 'react'
import { motion } from 'framer-motion'
import { Moon, Sun, Monitor, Volume2, VolumeX } from 'lucide-react'
import { useTheme } from './ThemeProvider'

export default function ControlPanel({ muted, toggleMute, crt, setCrt }) {
  const { isDark, toggleTheme } = useTheme()

  return (
    <motion.div 
      className="absolute left-4 top-4 z-20 flex gap-3 items-center"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 }}
    >
      {/* Dark/Light Mode Toggle */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleTheme}
        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-4 py-3 rounded-md shadow-lg border border-gray-200/50 dark:border-gray-700/50"
        title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      >
        {isDark ? (
          <Sun className="w-5 h-5 md:w-6 md:h-6 text-yellow-500" />
        ) : (
          <Moon className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
        )}
      </motion.button>

      {/* CRT Toggle */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setCrt(!crt)}
        className={`backdrop-blur-sm px-4 py-3 rounded-md shadow-lg border transition-colors ${
          crt 
            ? 'bg-green-500/80 text-white border-green-400/50' 
            : 'bg-white/80 dark:bg-gray-800/80 border-gray-200/50 dark:border-gray-700/50'
        }`}
        title="Toggle CRT Effect"
      >
        <Monitor className="w-5 h-5 md:w-6 md:h-6" />
      </motion.button>

      {/* Sound Toggle */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleMute}
        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-4 py-3 rounded-md shadow-lg border border-gray-200/50 dark:border-gray-700/50"
        title={muted ? 'Unmute Sound' : 'Mute Sound'}
      >
        {muted ? (
          <VolumeX className="w-5 h-5 md:w-6 md:h-6 text-red-500" />
        ) : (
          <Volume2 className="w-5 h-5 md:w-6 md:h-6 text-green-500" />
        )}
      </motion.button>
    </motion.div>
  )
}
