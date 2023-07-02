/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,tsx}'],
  theme: {
    extend: {}
  },
  variants: {
    extend: {}
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['winter']
  }
};
