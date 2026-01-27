import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{astro,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        futura_pt: ["futura-pt", "sans-serif"],
        comma: ["comma-sans", "sans-serif"],
        shuei_gothic: ["dnp-shuei-gothic-gin-std", "sans-serif"],
        avenir: ["avenir-next-lt-pro", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
