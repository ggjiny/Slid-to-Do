/** @type {import('tailwindcss').Config} */

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
        Pretendard: ['Pretendard', 'sans-serif'],
      },
    },
    screens: {
      tablet: '744px',
      desktop: '1920px',
    },
  },
  plugins: [],
};
