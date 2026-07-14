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
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-body)', 'system-ui', 'sans-serif'],
        logo: ['"Times New Roman"', 'Times', 'Georgia', 'serif'],
        brand: ['"Times New Roman"', 'Times', 'Georgia', 'serif'],
      },
      colors: {
        stone: {
          950: '#0c0a09',
        },
        brand: {
          gold: '#C4A035',
          'gold-light': '#E0C56A',
          'gold-dark': '#9A7B1F',
          black: '#0A0A0A',
          white: '#FFFFFF',
          // Aliases kept for existing utility classes
          red: '#C4A035',
          'red-light': '#E0C56A',
          'red-dark': '#9A7B1F',
          blue: '#C4A035',
          'blue-light': '#E0C56A',
          'blue-dark': '#9A7B1F',
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
