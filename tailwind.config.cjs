/** @type {import('tailwindcss').Config} */

const page = '1440px';

const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', ...fontFamily.sans],
      },
      minHeight: {
        'md': '20rem',
      },
      minWidth: {
        'lg': '32rem',
      },
      maxWidth: {
        page
      },
      width: {
        page
      },
      colors: {
        background: '#201545'
      },
      keyframes: {
        fadeout: {
          '0%': { opacity: 1 },
          '100%': { opacity: 0},
        },
        fadein: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        }, 
      },
backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        fadein: "fadein 175ms linear forwards",
        fadeout: "fadeout 175ms linear forwards"
      }
    },
  },
  plugins: [],
};
