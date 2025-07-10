/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
theme: {
    extend: {
      colors: {
        primary: "#FF3F6C",
        secondary: "#282C3F",
        accent: "#FF9F00",
        success: "#42C767",
        error: "#F44336",
        warning: "#FFC107",
        info: "#2196F3",
        border: "#E2E8F0",
      },
      fontFamily: {
        'display': ['Poppins', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
      },
      aspectRatio: {
        '4/5': '4 / 5',
      }
    },
  },
  plugins: [],
}