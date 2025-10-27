/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Madares brand colors
        primary: {
          50: '#e6f4f1',
          100: '#b3dfd4',
          200: '#80cab7',
          300: '#4db59a',
          400: '#1aa07d',
          500: '#00875a', // Primary green
          600: '#006b48',
          700: '#004f36',
          800: '#003324',
          900: '#001712',
        },
        success: '#10b981',
        warning: '#f59e0b',
        danger: '#ef4444',
        info: '#3b82f6',
      },
      fontFamily: {
        arabic: ['Noto Sans Arabic', 'sans-serif'],
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
}
