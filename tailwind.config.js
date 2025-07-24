/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Bisnova brand colors - exact match to logo
        'bisnova-blue': {
          50: '#e6f7fe',
          100: '#cceffd',
          200: '#99dffa',
          300: '#66cff8',
          400: '#33bff5',
          500: '#00aff0', // Primary brand blue - exact logo color
          600: '#008cc0',
          700: '#006990',
          800: '#004660',
          900: '#002330',
        },
        'bisnova-green': {
          50: '#e6f4f2',
          100: '#cce9e6',
          200: '#99d3cc',
          300: '#66bdb3',
          400: '#33a799',
          500: '#008276', // Primary brand green - exact logo color
          600: '#00685f',
          700: '#004e47',
          800: '#003430',
          900: '#001a18',
        },
        'bisnova-white': {
          DEFAULT: '#fefefe', // Primary brand white - exact logo color
          50: '#fefefe',
          100: '#fdfdfd',
          200: '#fcfcfc',
          300: '#fbfbfb',
          400: '#fafafa',
          500: '#f9f9f9',
        },
        'bisnova-dark': {
          DEFAULT: '#111320', // Logo background color
          50: '#f8f8f9',
          100: '#f1f1f3',
          200: '#e4e4e7',
          300: '#d1d1d6',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#27272a',
          900: '#111320', // Primary dark brand color
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

// Bisnova Brand Colors Implementation:
// #00aff0 - Primary blue (bisnova-blue-500) - Dominant brand color
// #008276 - Primary green (bisnova-green-500) - Accent color for highlights
// #fefefe - Brand white (bisnova-white) - Primary text and background color
// #111320 - Logo background (bisnova-dark) - Logo background and dark elements
//
// Usage Examples:
// - bg-bisnova-blue-500 (primary blue background)
// - text-bisnova-white (brand white text)
// - bg-bisnova-dark (logo background color)
// - border-bisnova-green-500 (green accent borders)
// - hover:bg-bisnova-blue-600 (darker blue on hover)
