/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./dist/**/*.html"
  ],
  theme: {
    extend: {
      colors: {
        'pomodoro': {
          light: '#e74c3c',
          dark: '#c0392b',
        },
        'short-break': {
          light: '#27ae60',
          dark: '#229954',
        },
        'long-break': {
          light: '#3498db',
          dark: '#2980b9',
        }
      }
    },
  },
  plugins: [],
}
