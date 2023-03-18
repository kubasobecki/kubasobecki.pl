/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: "Rubik, sans-serif",
        mono: "Roboto Mono, monospace",
      },
      colors: {
        myCyan: "hsl(180deg 100% 50%)", // #00FFFF
        myMagenta: "hsl(314deg 100% 47%)", // #F000B8
        myLime: "hsl(81deg 100% 54%)", // #ADFF16
        myDark: "hsl(240deg 6% 10%)", // #18181B
      },
    },
  },
  darkMode: "class",
  plugins: [require("@tailwindcss/forms")],
};
