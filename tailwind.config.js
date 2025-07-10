/** @type {import('tailwindcss').Config} */
import DefaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      'xs': '555px', // Custom XS screen
      ...DefaultTheme.screens, // Default screen sizes
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: '#4B5D67', // Custom primary color (example)
      },
    },
  },
  plugins: [
    // Add these if you want rich text or custom forms
    // require('@tailwindcss/typography'),
    // require('@tailwindcss/forms'),
  ],
  darkMode: 'class', // Enable dark mode via class toggle (useful for theme switching)
};
