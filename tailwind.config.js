/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dirty-white': '#FEFAE0',
        'lighter-green': '#47602B',
        'light-green': '#374A21',
        'dark-green': '#283618',
        'lighter-brown': '#D58D3A',
        'light-brown': '#DDA15E',
        'dark-brown': '#BC6C25',
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
  ],
}

