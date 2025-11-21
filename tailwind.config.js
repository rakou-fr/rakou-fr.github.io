/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "blanc": "#E0E2E8",
        "gris": "#B0C0D4",
        "bleu": "#5DA5B3",
        "gris-fonce": "#232326",
        "noir": "#1C1C1F",
        "c1": "#13B0F5",
        "c2": "#E70FAA",
      },

      keyframes: {
        'gradient-move': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'fadeIn': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'bounce-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },

      animation: {
        'gradient-move': 'gradient-move 6s ease infinite',
        'fadeIn': 'fadeIn 1s ease forwards',
        'bounce-slow': 'bounce-slow 2.5s infinite',
      },
    },
  },
  plugins: [],
};
