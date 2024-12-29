/** @type {import('tailwindcss').Config} */

import colors from 'tailwindcss/colors';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      primary: "#5f6FFF",
      white: "#FFF",
      ...colors,
      // Add specific colors individually if needed
      amber: colors.amber,
      emerald: colors.emerald,
    },
    gridTemplateColumns: {
      auto: 'repeat(auto-fill, minmax(200px, 1fr))',
    },
  },
  plugins: [],
};
