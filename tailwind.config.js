/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      boxShadow: {
        '2': 'rgba(99, 99, 99, 0.2) 0px 0px 10px 0px;',
        '3': 'rgba(99, 99, 99, 0.2) 0px 0px 20px 0px;',
      }
    },
    screens: {
      '2xl': {'max': '1535px'},
      // => @media (max-width: 1535px) { ... }

      'xl': {'max': '1279px'},
      // => @media (max-width: 1279px) { ... }

      'lg': {'max': '1023px'},
      // => @media (max-width: 1023px) { ... }

      'md': {'max': '810px'},
      // => @media (max-width: 767px) { ... }

      'sm': {'max': '439px'},
      // => @media (max-width: 639px) { ... }
    }
  },
  plugins: []
}

