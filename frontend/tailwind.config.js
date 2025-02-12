/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  extend: {
      maxWidth: {
        'screen-2xl': '1400px', 
        'custom-1200': '1200px', 
        'custom-900': '900px', 
      },
      colors: {
        'primary': '#E90074',
        'primary-dark': "#921A40",
        'primary-light': '#f4e5ec',
        'text-dark': '#8E3E63',
        'text-light': '#F9F9E0',
        'extra-light': '#FFE6E6'
      }
    },
  },
  
  plugins: [],
}

