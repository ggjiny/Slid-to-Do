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
      colors: {
        mono: {
          white: '#FFFFFF',
          black: '#000000',
        },
      },
      fontFamily: {
        Pretendard: ['Pretendard', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
