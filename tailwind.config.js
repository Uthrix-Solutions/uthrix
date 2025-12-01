/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#c40202",
        secondory: "#901018",
        default: "#ffffff",
        naturalSilver: "#c40202",
        naturalDGrey: "#c40202",       
        naturalGrey: "#c40202",
        gray900: "#c40202",
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'], // Add Roboto as a custom font
        poppin:['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [import("flowbite/plugin")],
};
