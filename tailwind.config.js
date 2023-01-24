module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "soko-light-blue": "#EFF4F9",
        "soko-blue": "#064789",
        "soko-orange": "#fb9004",
        "soko-dark-blue": "#04274a",
        "soko-green": "#11AF22",
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("tailwind-scrollbar-hide")],
};
