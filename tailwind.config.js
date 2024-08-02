/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      fontSize: {
        "5xl": "5rem",
        "2xs": "0.4rem"
      },
      fontFamily: {
        froggy: ["Gochi Hand", "cursive"],
      },
    },
  },
  plugins: [],
}

