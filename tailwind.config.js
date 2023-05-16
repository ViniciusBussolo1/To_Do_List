/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        black: {
          600: '#272732',
          700: '#202024',
          800: '#121214',
        },
        gray: {
          300: '#BBBBBE',
        },
      },
    },
  },
  plugins: [],
}
