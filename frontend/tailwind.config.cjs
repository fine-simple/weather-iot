/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      backgroundImage: {
        sunset: "url(/src/assets/sunset-clouds.jpg)",
      },
    },
  },
  plugins: [],
};
