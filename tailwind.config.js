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
    }
  },
  plugins: [
    plugin(function({ addBase, theme }) {
      addBase({
        'ul': { paddingLeft: theme('pl-2.5') },
        'h3': { fontWeight: theme('font-bold') },
      })
    })
  ]
}

