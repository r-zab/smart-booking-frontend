/** @type {import('tailwindcss').Config} */
export default {
  // tailwind.config.js
content: [
  "./index.html",
  "./src/**/*.{vue,js,ts,jsx,tsx}", // Ta linia jest kluczowa
],
  theme: {
    extend: {},
  },
  plugins: [],
}