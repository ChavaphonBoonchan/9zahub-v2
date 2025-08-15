// Simple audio helper with better error handling
let muted = false
let audioContext = null

// Initialize audio context on first user interaction
const initAudioContext = () => {
  if (!audioContext) {
    try {
      audioContext = new (window.AudioContext || window.webkitAudioContext)()
    } catch (error) {
      console.warn('Audio context not supported:', error)
    }
  }
}

const make = (src, volume = 0.6) => {
  try {
    const audio = new Audio(src)
    audio.volume = volume
    audio.preload = 'auto'
    return audio
  } catch (error) {
    console.warn('Failed to create audio:', error)
    return null
  }
}

const sounds = {
  click: () => make('/sfx/click.mp3', 0.7),
  hover: () => make('/sfx/hover.mp3', 0.35),
  swoosh: () => make('/sfx/swoosh.mp3', 0.6),
}

export const SFX = {
  isMuted: () => muted,
  toggle: () => (muted = !muted),
  setMuted: (value) => (muted = value),
  
  play(name) {
    if (muted) return
    
    // Initialize audio context on first play
    initAudioContext()
    
    const f = sounds[name]
    if (!f) {
      console.warn(`Sound "${name}" not found`)
      return
    }
    
    const audio = f()
    if (!audio) return
    
    // Play sound with error handling
    audio.play().catch((error) => {
      console.warn(`Failed to play sound "${name}":`, error)
    })
  },
  
  // Preload all sounds
  preload() {
    Object.keys(sounds).forEach(name => {
      const audio = sounds[name]()
      if (audio) {
        audio.load()
      }
    })
  }
}