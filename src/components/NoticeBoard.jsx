import { motion } from 'framer-motion'
import { Megaphone } from 'lucide-react'

export default function NoticeBoard({ message }) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="pixel-btn bg-white/95 dark:bg-gray-800/95 p-6 md:p-8 text-primary-900 dark:text-gray-200"
    >
      <div className="flex items-start gap-4">
        <Megaphone className="w-8 h-8 md:w-10 md:h-10 flex-shrink-0" />
        <div>
          <h3 className="font-pixel text-base md:text-lg mb-3">Website Owner's Message</h3>
          <p className="font-mono text-lg md:text-xl leading-relaxed">{message}</p>
        </div>
      </div>
    </motion.div>
  )
}