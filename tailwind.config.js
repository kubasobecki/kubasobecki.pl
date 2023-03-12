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
    fontFamily: {
      sans: "Poppins, sans-serif",
    },
    extend: {
      colors: {
        myCyan: "hsl(180deg 100% 50%)", // #00FFFF
        myMagenta: "hsl(314deg 100% 47%)", // #F000B8
        myLime: "hsl(81deg 100% 54%)", // #ADFF16
        myDark: "hsl(0deg 0% 10%)", // #1A1A1A
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
