/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./*.js",
    "./*.css",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#1e40af',
        secondary: '#64748b',
        danger: '#dc2626',
        success: '#16a34a',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
