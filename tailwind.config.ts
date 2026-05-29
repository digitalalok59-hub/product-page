import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        tomato: {
          50: "#fff4f1",
          100: "#ffe5df",
          500: "#ef5138",
          600: "#dc3b25",
          700: "#b92d1c"
        },
        leaf: {
          50: "#f0f9f3",
          100: "#d9f0df",
          600: "#2c8d4e",
          700: "#216f3d"
        },
        ink: "#1f2428"
      },
      boxShadow: {
        soft: "0 20px 60px rgba(31, 36, 40, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
