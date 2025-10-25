/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        moon: {
          light: '#a5b4fc',     // Soft moonlight
          DEFAULT: '#6366f1',   // Indigo glow
          dark: '#312e81',      // Deep night
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.8s ease-out forwards',
        shimmer: 'shimmer 2s infinite', // ✨ NEW
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
};