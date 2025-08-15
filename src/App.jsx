import React, { useState, useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import CRTEffect from './components/CRTEffect'
import LoadingScreen from './components/LoadingScreen'
import IntroScreen from './components/IntroScreen'
import MenuScreen from './components/MenuScreen'
import ThemeProvider from './components/ThemeProvider'
import ControlPanel from './components/ControlPanel'
import { SFX } from './sfx/sound'

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const [stage, setStage] = useState('loading') // loading | intro | menu
  const [crt, setCrt] = useState(true)
  const [muted, setMuted] = useState(false)

  // Memoized callbacks to prevent unnecessary re-renders
  const toggleMute = useCallback(() => {
    setMuted(prev => !prev)
  }, [])

  const setCrtEnabled = useCallback((enabled) => {
    setCrt(enabled)
  }, [])

  const goToMenu = useCallback(() => {
    setStage('menu')
  }, [])

  const goToIntro = useCallback(() => {
    setStage('intro')
  }, [])

  useEffect(() => {
    // Preload sounds
    SFX.preload()
    
    // Simulate asset loading
    const loadTimer = setTimeout(() => setLoaded(true), 1000)
    const stageTimer = setTimeout(() => setStage('intro'), 1600)
    
    return () => {
      clearTimeout(loadTimer)
      clearTimeout(stageTimer)
    }
  }, [])

  // Sync muted state with SFX
  useEffect(() => {
    SFX.setMuted(muted)
  }, [muted])

  return (
    <ThemeProvider>
      <CRTEffect enabled={crt}>
        <div className="min-h-screen text-primary-900 dark:text-gray-200 bg-white dark:bg-gray-900 relative overflow-hidden transition-colors duration-300">
          {/* Control Panel */}
          <ControlPanel 
            muted={muted} 
            toggleMute={toggleMute} 
            crt={crt} 
            setCrt={setCrtEnabled} 
          />

          <AnimatePresence mode="wait">
            {stage === 'loading' && (
              <motion.div 
                key="loading" 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <LoadingScreen done={loaded} />
              </motion.div>
            )}

            {stage === 'intro' && (
              <motion.div 
                key="intro" 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <IntroScreen 
                  onEnter={goToMenu} 
                  muted={muted} 
                  toggleMute={toggleMute} 
                />
              </motion.div>
            )}

            {stage === 'menu' && (
              <motion.div 
                key="menu" 
                initial={{ opacity: 0, y: 30 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <MenuScreen onBackToIntro={goToIntro} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Background grid */}
          <div className="pointer-events-none absolute inset-0 grid-bg opacity-60"></div>
        </div>
      </CRTEffect>
    </ThemeProvider>
  )
}