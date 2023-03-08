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
        cyanBright: "#00ffff",
        magentaBright: "#ff0080",
        navy: "#000080",
      },
    },
  },
  plugins: [],
};
