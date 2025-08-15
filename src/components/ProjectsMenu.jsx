import { motion } from 'framer-motion'
import MenuButton from './MenuButton'
import { ExternalLink, FolderOpen } from 'lucide-react'

// 🧩 Add your projects here
export const PROJECTS = [
  { name: 'My Portfolio', url: 'https://folio.9zahub.com' },
  { name: 'release soon', url: 'https://www.google.com' },
]

export default function ProjectsMenu() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <div className="flex items-center gap-3 text-primary-900 dark:text-blue-300">
        <FolderOpen className="w-7 h-7 md:w-8 md:h-8" />
        <h3 className="font-pixel text-base md:text-lg">Select Project</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {PROJECTS.map((p) => (
          <MenuButton
            key={p.name}
            label={<span className="flex items-center justify-between w-full"><span>{p.name}</span><ExternalLink className="w-5 h-5 md:w-6 md:h-6" /></span>}
            onClick={() => window.open(p.url, '_blank', 'noopener,noreferrer')}
          />
        ))}
      </div>
    </motion.div>
  )
}