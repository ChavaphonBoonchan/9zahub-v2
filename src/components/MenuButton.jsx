import { motion } from 'framer-motion'
import { SFX } from '../sfx/sound'

export default function MenuButton({ icon: Icon, label, onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onMouseEnter={() => SFX.play('hover')}
      onClick={() => { SFX.play('click'); onClick?.() }}
      className="w-full pixel-btn bg-white dark:bg-gray-800 text-primary-900 dark:text-gray-200 px-6 py-4 text-sm md:text-base font-pixel text-left transition-colors duration-200"
    >
      <div className="flex items-center gap-4">
        {Icon && <Icon className="w-6 h-6 md:w-7 md:h-7" />}
        <span>{label}</span>
      </div>
    </motion.button>
  )
}