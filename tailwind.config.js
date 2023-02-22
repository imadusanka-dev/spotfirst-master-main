module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/core/**/*.{js,ts,jsx,tsx}',
    './src/modules/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    fontFamily: {
      title: ['Rubik', 'sans-serif'],
      display: ['Rubik', 'sans-serif'],
      body: ['Roboto', 'sans-serif'],
    },
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '8rem',
      },
    },
    extend: {
      boxShadow: {
        light: 'rgb(0 0 0 / 8%) 0px 4px 25px',
        normal: 'rgb(0 0 0 / 10%) 0px 4px 25px',
        dark: 'rgb(0 0 0 / 15%) 0px 4px 25px',
      },
      borderRadius: {
        button: '60px',
      },
      colors: {
        'primary-blue': {
          DEFAULT: '#1980F5',
          dark: '#126ED8',
        },
        'primary-green': {
          DEFAULT: '#08A881',
        },
        'primary-yellow': {
          DEFAULT: '#EEB739',
        },
        'primary-magenta': {
          DEFAULT: '#C93FC0',
        },
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
  ],
}
