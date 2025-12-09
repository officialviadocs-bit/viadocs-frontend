/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00AEEF',
        secondary: '#5C5ACB',
        accent: '#3F8CFF',
        light: '#F4F6F8',
        dark: '#0F172A',
      },
      backgroundImage: {
        'logo-gradient': 'linear-gradient(135deg, #00AEEF, #5C5ACB)',
      },
      boxShadow: {
        soft: '0 4px 12px rgba(92, 90, 203, 0.2)',
      },
      fontFamily: {
        sans: ['Inter', 'Roboto', 'sans-serif'],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out',
        gradient: 'gradient 4s ease infinite',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
