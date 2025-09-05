/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./App.tsx", "./app/**/*.{js,jsx,ts,tsx}",  "./components//**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        light_gray: '#6B7280',
        green_2: '#284D44',
        green_3: '#41645C',
        super_red: '#FF0000',
        gray_border: '#D9D9D9',
        blue_button: '#3367C7',
        dark_gray: '#69737C',
        gray_icon: '#9CA3AF',
      },
      fontFamily: {
        "sf": ["SFPro-Regular"],
        "sf-light": ["SFPro-Light"],
        "sf-semibold": ["SFPro-Semibold"],
        "sf-bold": ["SFPro-Bold"],
        "sf-black": ["SFPro-Black"],
      }
    },
  },
  plugins: [],
}