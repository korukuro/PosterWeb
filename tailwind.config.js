module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      gridAutoRows: {
        custom: "25rem", // Custom row height
      },
      animation: {
        shine: "shine 1s",
        "infinite-scroll": "infinite-scroll 20s linear infinite",
      },
      keyframes: {
        shine: {
          "100%": { left: "125%" },
        },
        "infinite-scroll": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(calc(-50% - 20px))" },
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
