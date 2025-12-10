/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Configure Tailwind to scan all JS/JSX files in src/
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      // Define a custom primary color for a modern look
      colors: {
        'primary': '#A34F5C', // Rich Rose/Mauve
        'secondary': '#F4E9CD', // Soft Cream background
        'accent': '#FFD700', // Gold accent
      },
      // Use modern, readable fonts
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}