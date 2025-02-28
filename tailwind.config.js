/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: 'rgb(40 50 171)',
      },
      backgroundImage: {
        banner: `url('../public/images/banner.jpg')`,
      }
    },
  },
  plugins: [],
};
