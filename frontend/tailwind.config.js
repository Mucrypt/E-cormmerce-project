/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'top-red': '#e0715e',
        'defaul-button': '#e0715e',
        'hero-button-hover': '#d65a47',
        "defaul-button-colors": "#e0715e",
        "defaul-button-colors-hover": "#d65a47",
       
      },
    
    },
  },
  plugins: [],
}
