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
        myCyan: "hsl(var(--my-cyan) / <alpha-value>)", // #00FFFF
        myMagenta: "hsl(var(--my-magenta) / <alpha-value>)", // #F000B8
        myLime: "hsl(var(--my-lime) / <alpha-value>)", // #ADFF16
        myDark: "hsl(var(--my-dark) / <alpha-value>)", // #18181B
      },
      gridTemplateColumns: {
        auto200: "repeat(auto-fit, minmax(200px, 1fr))",
        auto250: "repeat(auto-fit, minmax(250px, 1fr))",
      },
    },
  },
  darkMode: "class",
  plugins: [require("@tailwindcss/forms")],
};
