/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef5e7',
          100: '#fde8c3',
          200: '#fad59a',
          300: '#f7c271',
          400: '#f4af47',
          500: '#f19c1e', // Color principal HEATHOME
          600: '#c17d18',
          700: '#915e12',
          800: '#613f0c',
          900: '#312006',
        },
        secondary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        }
      },
      fontFamily: {
        'sans': ['Montserrat', 'ui-sans-serif', 'system-ui'],
      }
    },
  },
  plugins: [],
}
