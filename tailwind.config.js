module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      gridAutoRows: {
        // Define default row height
        'custom': '25rem', // Change '100px' to your desired height
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],

};

