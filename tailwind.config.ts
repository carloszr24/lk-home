import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
        display: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
        logo: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
        brand: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
      },
      colors: {
        stone: {
          950: '#0c0a09',
        },
        brand: {
          charcoal: '#333333',
          'charcoal-light': '#5c5c5c',
          'charcoal-dark': '#1a1a1a',
          gold: '#C4A035',
          'gold-light': '#E0C56A',
          'gold-dark': '#9A7B1F',
          black: '#1a1a1a',
          white: '#FFFFFF',
          red: '#333333',
          'red-light': '#5c5c5c',
          'red-dark': '#1a1a1a',
          blue: '#333333',
          'blue-light': '#5c5c5c',
          'blue-dark': '#1a1a1a',
        },
        gold: {
          DEFAULT: '#C4A035',
          light: '#E0C56A',
          dark: '#9A7B1F',
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
        'fade-in': 'fadeIn 0.4s ease forwards',
        'skeleton': 'skeleton 1.5s ease-in-out infinite',
        scroll: 'scroll 2s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        skeleton: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
        scroll: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(200%)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
