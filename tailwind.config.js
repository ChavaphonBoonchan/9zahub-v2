/** @type {import('tailwindcss').Config} */
export default {
    content: [
      './index.html',
      './src/**/*.{js,jsx,ts,tsx}',
    ],
    darkMode: 'class',
    theme: {
      extend: {
        colors: {
          primary: {
            50: '#e6f2ff',
            100: '#cce6ff',
            200: '#99ccff',
            300: '#66b3ff',
            400: '#3399ff',
            500: '#1e90ff',
            600: '#0077e6',
            700: '#005bb4',
            800: '#004182',
            900: '#002851',
          },
        },
        fontFamily: {
          pixel: ['"Press Start 2P"', 'system-ui', 'sans-serif'],
          'thai-pixel': ['"Kanit"', '"Press Start 2P"', 'system-ui', 'sans-serif'],
          mono: ['VT323', 'ui-monospace', 'SFMono-Regular'],
        },
        boxShadow: {
          pixel: '0 0 0 4px #002851, 0 0 0 8px #1e90ff',
        },
        animation: {
          flicker: 'flicker 2s infinite',
          scan: 'scan 6s linear infinite',
        },
        keyframes: {
          flicker: {
            '0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%': { opacity: 1 },
            '20%, 24%, 55%': { opacity: 0.94 },
          },
          scan: {
            '0%': { transform: 'translateY(-100%)' },
            '100%': { transform: 'translateY(100%)' },
          },
        },
      },
    },
    plugins: [],
  }