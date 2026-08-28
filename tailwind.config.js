/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          light: '#FFFFFF',
          DEFAULT: '#FBF9F2',
          dark: '#EFE9D8',
          warm: '#FBF9F2',
          cream: '#FFFDF8',
        },
        ink: {
          light: '#334155',
          DEFAULT: '#1E1B4B',
          dark: '#0F172A',
          muted: '#4B5563',
        },
        hpl: {
          coral: '#E11D48',
          orange: '#EA580C',
          gold: '#F59E0B',
          yellow: '#FBBF24',
          emerald: '#059669',
          teal: '#0D9488',
          blue: '#2563EB',
          indigo: '#3730A3',
          navy: '#1E1B4B',
          purple: '#5B21B6',
          violet: '#7C3AED',
        }
      },
      fontFamily: {
        display: ['Space Grotesk', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        marker: ['Permanent Marker', 'cursive', 'sans-serif'],
        rock: ['Rock Salt', 'cursive', 'sans-serif'],
        sedgwick: ['Sedgwick Ave Display', 'cursive', 'sans-serif'],
        kalam: ['Kalam', 'cursive', 'sans-serif'],
        hand: ['Caveat', 'cursive'],
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'sketch': '4px 4px 0px #1E1B4B',
        'sketch-sm': '2px 2px 0px #1E1B4B',
        'sketch-lg': '6px 6px 0px #1E1B4B',
        'sketch-xl': '8px 8px 0px #1E1B4B',
      },
      borderWidth: {
        '3': '3px',
      }
    },
  },
  plugins: [],
}
