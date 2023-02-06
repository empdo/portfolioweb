/** @type {import('tailwindcss').Config} */

const page = '1440px';

const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        'tablet': '811px',
      },
      fontFamily: {
        sans: ['var(--font-inter)', ...fontFamily.sans],
      },
      minHeight: {
        'md': '15rem',
      },
      minWidth: {
        'lg': '32rem',
      },
      maxWidth: {
        page
      },
      width: {
        page,
        200: '200%'
      },
      colors: {
        background: '#201545',
      },
      keyframes: {
        fadeout: {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
        fadein: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        scrollbg: {
          '0%': { 'background-position': 'left' },
          '100%': { 'background-position': 'right' }
        },
        text: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
      },
      invert: {
        60: '0.60'
      },
      backgroundSize: {
        "200%": "200%"
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        fadein: "fadein 175ms linear forwards",
        fadeout: "fadeout 175ms linear forwards",
        scrollbg: "scrollbg 180ms linear forwards",
        text:'text 5s ease infinite',
      }
    },
  },
  plugins: [],
};
