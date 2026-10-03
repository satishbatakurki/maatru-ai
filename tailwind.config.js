/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          50: '#F4F7F4',
          100: '#E4EDE4',
          200: '#C7DBC7',
          300: '#A4C3A3',
          400: '#7FA87D',
          500: '#5F8D5E',
          600: '#487147',
          700: '#345433',
          800: '#233923',
          900: '#142214',
        },
        botanical: {
          DEFAULT: '#2D5A43',
          light: '#3C7356',
          dark: '#1D3B2C',
          soft: '#EAF2EC',
          border: '#D2E3D6'
        },
        cream: {
          50: '#FDFCF9',
          100: '#FAF7F0',
          200: '#F3EEDB'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft-card': '0 2px 12px -2px rgba(45, 90, 67, 0.06), 0 1px 3px 0 rgba(0, 0, 0, 0.04)',
        'elevated-card': '0 10px 25px -4px rgba(45, 90, 67, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}
