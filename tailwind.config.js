/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      animation: {
        'pulse-slow': 'pulse 6s infinite cubic-bezier(0.4, 0, 0.6, 1)',
        "background-shine": "background-shine 2s linear infinite",
        "background-shine-slow": "background-shine 5s linear infinite",
        'border-width': 'border-width 3s infinite alternate',
        'separator-width': 'separator-width 7s infinite alternate',

      },
      "keyframes": {
        "background-shine": {
          "from": {
            "backgroundPosition": "0 0"
          },
          "to": {
            "backgroundPosition": "-200% 0"
          }
        },
        'border-width': {
          from: { width: '10px', opacity: '0' },
          to: { width: '100px', opacity: '1' },
        },
        'separator-width': {
          from: { width: '80%', opacity: '0.9' },
          to: { width: '95%', opacity: '1' },
        },
      }
    },
  },
  plugins: [],
}
