/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0A1D3B',
          darker: '#061226',
          deep: '#07162E',
          card: 'rgba(10, 29, 59, 0.72)',
          surface: '#0E2447',
          light: '#132E59',
        },
        royal: {
          DEFAULT: '#1F3FAE',
          dark: '#162C7F',
          light: '#3156D6',
          glow: 'rgba(31, 63, 174, 0.45)',
        },
        teal: {
          DEFAULT: '#00A7B5',
          dark: '#00838F',
          light: '#26D0DF',
          glow: 'rgba(0, 167, 181, 0.45)',
        },
        gold: {
          DEFAULT: '#F5A623',
          dark: '#C7810C',
          light: '#FFBC47',
          glow: 'rgba(245, 166, 35, 0.45)',
        },
        slate: {
          subtext: '#6B7280',
          muted: '#8E98A8',
        },
        lightgray: '#F2F4F7',
      },
      fontFamily: {
        heading: ['"Space Grotesk"', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'glow-teal': '0 0 25px -5px rgba(0, 167, 181, 0.4)',
        'glow-royal': '0 0 30px -5px rgba(31, 63, 174, 0.5)',
        'glow-gold': '0 0 25px -3px rgba(245, 166, 35, 0.4)',
        'glow-card': '0 8px 32px 0 rgba(0, 167, 181, 0.12)',
        'glass-hover': '0 12px 40px -10px rgba(0, 167, 181, 0.25)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 30s linear infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'orbit': 'orbit 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        }
      }
    },
  },
  plugins: [],
}
