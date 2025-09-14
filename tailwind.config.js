/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        government: {
          primary: '#003366',
          secondary: '#0066CC',
          light: '#E6F3FF',
          dark: '#001A33',
        },
        status: {
          new: '#3B82F6',
          assigned: '#F59E0B',
          progress: '#8B5CF6',
          resolved: '#10B981',
          unresolved: '#EF4444',
        }
      },
      fontFamily: {
        'official': ['Arial', 'Helvetica', 'sans-serif'],
      }
    },
  },
  plugins: [],
};