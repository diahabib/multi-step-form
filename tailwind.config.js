/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        md: "768px",
        lg: "992px",
      },
      colors: {
        primary: {
          "marine-blue": "hsl(213, 96%, 18%)",
          "purplish-blue": "hsl(243, 100%, 62%)",
          "pastel-blue": "hsl(228, 100%, 84%)",
          "light-blue": "hsl(206, 94%, 87%)",
          "strawberry-red": "hsl(354, 84%, 57%)",
        },
        neutral: {
          "cool-gray": "hsl(231, 11%, 63%)",
          "light-gray": "hsl(229, 24%, 87%)",
          alabaster: "hsl(231, 100%, 99%)",
          magnolia: "hsl(217, 100%, 97%)",
          white: "hsl(0, 0%, 100%)",
        },
      },
      fontFamily: {
        ubuntu: ["Ubuntu", "sans"],
      },
      fontSize: {
        16: "16px", // Font size for body copy
      },
      fontWeight: {
        400: 400,
        500: 500,
        700: 700,
      },
    },
  },

  plugins: [],
};
