module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      gridAutoRows: {
        // Define default row height
        'custom': '25rem', // Change '100px' to your desired height
      },
    },
    extend:{
      animation: {
        shine: "shine 1s",
      },
      keyframes: {
        shine: {
          "100%": { left: "125%" },
        },
      },
    },
    keyframes: {
      "infinite-scroll": {
        "0%": { transform: "translateX(0)" },
        "100%": { transform: "translateX(calc(-50% - 20px))" },
      },
    },
    animation: {
      "infinite-scroll": "infinite-scroll 20s linear infinite",
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],

};

