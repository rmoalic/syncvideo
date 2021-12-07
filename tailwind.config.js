const colors = require('tailwindcss/colors')

module.exports = {
    prefix: '',
    purge: {
      enabled: true,
      content: [
        './src/**/*.{html,ts}',
      ],
      options: {
        keyframes: true,
        fontFace: true,
      },
    },
    darkMode: 'class', // or 'media' or 'class'
    theme: {    
      colors: {
        gray: colors.coolGray,
        green: colors.green,
        white: colors.white,
        purple: colors.purple,
      },
      extend: {},
    },
    variants: {
      extend: {},
    },
    plugins: [
        require('@tailwindcss/forms'),
    ],
};