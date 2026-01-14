import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{astro,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        fugaz: ['"Fugaz One"', "sans-serif"],
        futura_100: ['futura-100', "sans-serif"],
        futura_pt: ['"futura-pt"', "sans-serif"],
        comma: ["comma-sans", "sans-serif"],
        eurostile: ["eurostile", "sans-serif"],
        eurostile_cond: ["eurostile-condensed", "sans-serif"],
        shuei_gothic: ["dnp-shuei-gothic-gin-std", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
