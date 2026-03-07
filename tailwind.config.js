/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '10px',
        'lg': '15px',
        'xl': '20px',
      },
      backgroundColor: {
        'glass': 'rgba(255, 255, 255, 0.25)',
        'glass-dark': 'rgba(20, 83, 45, 0.2)',
        'glass-light': 'rgba(255, 255, 255, 0.4)',
      },
      borderColor: {
        'glass': 'rgba(255, 255, 255, 0.18)',
      },
    },
  },
  plugins: [],
};
