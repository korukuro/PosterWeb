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
  },
  plugins: [require('tailwind-scrollbar-hide')],

};

