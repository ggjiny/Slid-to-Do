/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
      },
      fontFamily: {
        Pretendard: ['Pretendard', ...defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        sm: '0px 4px 6px -2px rgba(0, 0, 0, 0.05)',
        lg: '4px 4px 10px -2px rgba(0, 0, 0, 0.05)',
      },
    },
    screens: {
      tablet: '744px',
      desktop: '1920px',
    },
  },
  plugins: [],
};
