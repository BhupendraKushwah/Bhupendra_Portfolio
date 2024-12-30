/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}","./node_modules/react-tailwindcss-select/dist/index.esm.js", "./node_modules/flowbite/**/*.js"], // Ensure all file types are covered
  // darkMode: 'class', // Use class-based dark mode
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        primary: '#8a2be2',
        secondary: 'rgba(255, 255, 255, 0.52)',
        'secondary-text': '#8d8a8a',
        placeholder: '#2726268f',
        footer: '#201f21',
      },
      animation: {
        shake: 'shake 0.5s ease forwards',
      },
      keyframes: {
        shake: {
          '0%, 20%, 40%, 60%, 80%, 100%': { transform: 'translateX(0)' },
          '10%': { transform: 'translateX(-5px)' },
          '30%': { transform: 'translateX(5px)' },
          '50%': { transform: 'translateX(-5px)' },
          '70%': { transform: 'translateX(5px)' },
        },
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
};
