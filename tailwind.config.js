/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",  // 이 경로 있어야 Tailwind 작동함
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Cafe24Ohsquare', 'sans-serif'],
      },},
  },
  plugins: [],
}
