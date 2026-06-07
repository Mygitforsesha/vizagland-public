/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // shadcn aliases
        background: '#F5F6FA',
        foreground: '#0a1929',
        border: '#e5e7eb',
        ring: '#C66A00',

        // existing theme
        primary: {
          DEFAULT: '#001F54',
          dark: '#001433',
          light: '#003366',
        },

        accent: {
          DEFAULT: '#C66A00',
          hover: '#A85800',
          light: '#FFF4E8',
        },

        surface: {
          DEFAULT: '#F5F6FA',
        },

        teal: {
          DEFAULT: '#1a8a72',
          light: '#f0fdf9',
        },

        navy: {
          DEFAULT: '#0a1929',
        },
      },

      fontFamily: {
        sans: ['Noto Sans', 'Segoe UI', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};