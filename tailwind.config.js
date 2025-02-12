/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        'custom-dark': '#151b23',
      },
      fontSize: {
        '1': '2rem',
        '2': '1.5rem',
        '3': '1.25rem', 
        '4': '1rem', 
      },
      borderWidth: {
        'xs': '0.0625rem', 
      },
      borderColor: {
        'dark-gray': '#3d444d',
      },
    },
  },
  plugins: [],
}

