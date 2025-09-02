/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
    theme: {
      extend: {
        colors: {
          primary: '#6356e5',
          secondary: '#3a2ade',
          accent: '#8c82ec',
          background: '#f3f6f6',
          white: '#ffffff',
          lightGray: '#d6e0e0',
        },
        fontFamily: {
          sans: ['VisbyCF', 'Inter', 'system-ui', 'sans-serif'],
          'visby': ['VisbyCF', 'sans-serif'],
        },
        fontWeight: {
          'light': '300',
          'normal': '400',
          'medium': '500',
          'semibold': '600',
          'bold': '700',
        },
        screens: {
          'very-short': {'raw': '(max-height: 800px)'},
          'short': {'raw': '(min-height: 800px)'},
          'tall': {'raw': '(min-height: 1300px)'},
          'very-tall': {'raw': '(min-height: 1500px)'},
          'ultra-tall': {'raw': '(min-height: 1800px)'},
        }
      },
    },
    plugins: [],
  };