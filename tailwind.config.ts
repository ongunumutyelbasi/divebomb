import type { Config } from "tailwindcss";

const config: Config = {
  // Enables toggling dark mode via a 'dark' class on the html element
  darkMode: 'class', 
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // DIVEBOMB Brand Colors
        db: {
          lime: '#b4eb16',
          black: '#0d0d0d',
          gray: '#111111',
          red: '#e10600',
        },
        // Semantic mapping for easier light/dark switching
        surface: {
          light: '#f4f4f4',
          dark: '#0d0d0d',
        },
        card: {
          light: '#ffffff',
          dark: '#111111',
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'], 
        display: ['var(--font-oswald)', 'sans-serif'], 
      },
      // Added a subtle transition for theme switching
      transitionProperty: {
        'colors': 'background-color, border-color, color, fill, stroke',
      }
    },
  },
  plugins: [],
};

export default config;