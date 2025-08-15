import { motion } from 'framer-motion'

export default function LoadingScreen({ done }) {
  return (
    <div className="relative flex flex-col items-center justify-center h-screen grid-bg">
      <motion.h1
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 140, damping: 12 }}
        className="text-4xl md:text-6xl text-primary-700 drop-shadow font-pixel text-center"
      >
        9ZAHUB.COM
      </motion.h1>

      <motion.div
        initial={{ width: 0 }}
        animate={{ width: done ? '20rem' : '16rem' }}
        transition={{ duration: 0.8 }}
        className="mt-12 h-6 w-80 border-4 border-primary-700 bg-white pixel-btn overflow-hidden"
      >
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: done ? '0%' : '-20%' }}
          transition={{ repeat: done ? 0 : Infinity, duration: 1.1, ease: 'linear' }}
          className="h-full bg-primary-500"
        />
      </motion.div>

      <div className="loading-scan top-1/2" />
      <p className="mt-8 text-primary-800 text-sm md:text-base font-mono">LOADING...</p>
    </div>
  )
}