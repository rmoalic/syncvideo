const colors = require('tailwindcss/colors')

module.exports = {
    prefix: '',
    purge: {
      enabled: true,
      content: [
        './src/**/*.{html,ts}',
      ],
    },
    darkMode: 'class', // or 'media' or 'class'
    theme: {    
      colors: {
        gray: colors.coolGray,
        green: colors.green,
        red: colors.red,
        white: colors.white,
        purple: colors.purple,
      },
      extend: {},
    },
    plugins: [
        require('@tailwindcss/forms'),
    ],
};