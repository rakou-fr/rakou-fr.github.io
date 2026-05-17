/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Syne'", "sans-serif"],
        sans: ["'DM Sans'", "sans-serif"],
      },
      colors: {
        skin: {
          bg:       "#1c1714",
          surface:  "#211a17",
          border:   "#2e2420",
          muted:    "#3a2e2a",
          text:     "#e8ddd9",
          faint:    "#6a5e5a",
          pink:     "#f9c5c5",
          green:    "#c5e8c5",
          blue:     "#c5d4f9",
          yellow:   "#f9e8c5",
          purple:   "#e8c5f9",
        },
      },
    },
  },
  plugins: [],
};