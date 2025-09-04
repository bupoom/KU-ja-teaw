const { green } = require('react-native-reanimated/lib/typescript/Colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./App.tsx", "./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        green_2: '#284D44',
        green_3: '#41645C',
        super_red: '#FF0000',
        border_gray: '#D9D9D9',
        blue_button: '#3367C7',
        dark_gray: '#69737C',
      }
    },
  },
  plugins: [],
}