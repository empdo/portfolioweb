/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: '#222222'
      },
      keyframes: {
        fadeout: {
          '0%': { opacity: 1 },
          '100%': { opacity: 0},
        },
        fadein: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        }
      },
      animation: {
        fadein: "fadein 175ms linear forwards",
        fadeout: "fadeout 175ms linear forwards"
      }
    },
  },
  plugins: [],
};
