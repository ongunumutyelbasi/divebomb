// postcss.config.mjs (Corrected)
export default {
  plugins: {
    // Correctly reference the installed package: @tailwindcss/postcss
    "@tailwindcss/postcss": {}, 
    autoprefixer: {},
  },
};