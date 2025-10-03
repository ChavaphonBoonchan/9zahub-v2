import { motion } from 'framer-motion'
import MenuButton from './MenuButton'
import { Link, Phone } from 'lucide-react'

// 🔗 Add your contact links here
export const CONTACTS = [
  { name: 'Instagram', url: 'https://www.instagram.com/superninelol' },
  { name: 'GitHub', url: 'https://github.com/ChavaphonBoonchan' },
  { name: 'LINE', url: 'https://line.me/R/ti/p/@chavaphonboonchan123' },
  { name: 'Discord', url: 'https://discord.com/users/845990662720585728' },
]

export default function ContactMenu() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <div className="flex items-center gap-3 text-primary-900 dark:text-blue-300">
        <Phone className="w-7 h-7 md:w-8 md:h-8" />
        <h3 className="font-pixel text-base md:text-lg">Contact Channels</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {CONTACTS.map((c) => (
          <MenuButton key={c.name} label={
            <span className="flex items-center justify-between w-full"><span>{c.name}</span><Link className="w-5 h-5 md:w-6 md:h-6" /></span>
          } onClick={() => window.open(c.url, '_blank', 'noopener,noreferrer')} />
        ))}
      </div>
    </motion.div>
  )
}