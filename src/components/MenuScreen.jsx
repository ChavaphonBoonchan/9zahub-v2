import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, FolderOpen, Mail, Home, Monitor, ScreenShare } from 'lucide-react'
import MenuButton from './MenuButton'
import NoticeBoard from './NoticeBoard'
import ProjectsMenu from './ProjectsMenu'
import ContactMenu from './ContactMenu'

export default function MenuScreen({ onBackToIntro }) {
  const [view, setView] = useState('root') // root | about | projects | contact

  // 🔔 Owner's announcement message
  const OWNER_MESSAGE = 'Welcome to 9zahub.com — You can discover my ideas and creative projects here! Thank you for visiting! :D'

  return (
    <div className="h-screen p-4 md:p-8 flex items-center justify-center">
      <div className="w-full max-w-4xl">
        <AnimatePresence initial={false} mode="wait">
          {view === 'root' && (
            <motion.div
              key="root"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3 text-primary-900 dark:text-blue-300 mb-4">
                <Monitor className="w-8 h-8 md:w-10 md:h-10" />
                <h2 className="font-pixel text-lg md:text-xl">Main Menu</h2>
              </div>

              <MenuButton icon={User} label="About Me" onClick={() => setView('about')} />
              <MenuButton icon={FolderOpen} label="Projects" onClick={() => setView('projects')} />
              <MenuButton icon={ScreenShare} label="Contact" onClick={() => setView('contact')} />
              <MenuButton icon={Mail} label="Email Me" onClick={() => { window.location.href = 'mailto:contact@9zahub.com' }} />
              <MenuButton icon={Home} label="Back to Home" onClick={onBackToIntro} />
            </motion.div>
          )}

          {view === 'about' && (
            <motion.div 
              key="about" 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="space-y-4"
            >
              <NoticeBoard message={OWNER_MESSAGE} />
              <MenuButton label="← Back to Menu" onClick={() => setView('root')} />
            </motion.div>
          )}

          {view === 'projects' && (
            <motion.div 
              key="projects" 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="space-y-4"
            >
              <ProjectsMenu />
              <MenuButton label="← Back to Menu" onClick={() => setView('root')} />
            </motion.div>
          )}

          {view === 'contact' && (
            <motion.div 
              key="contact" 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="space-y-4"
            >
              <ContactMenu />
              <MenuButton label="← Back to Menu" onClick={() => setView('root')} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}