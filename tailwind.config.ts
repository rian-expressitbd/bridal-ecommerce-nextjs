import tailwindScrollbar from "tailwind-scrollbar";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Urbanist", "sans-serif"],
        pollinator: "Pollinator",
        autography: "Autography",

        airstrip: "airstrip",
      },
      colors: {
        primary: {
          DEFAULT: "var(--color-primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: "var(--color-secondary)",
        base: "var(--color-base)",
        tertiary: "var(--color-tertiary)",
        accent: "var(--color-accent)",
        muted: "var(--color-muted)",
      },
      screens: {
        xs: "320px",
        sm: "375px",
        sml: "390px",
        smxl: "412px",
        fsm: "414px",
        md: "540px",
        fmd: "720px",
        mdl: "768px",
        lgx: "834px",
        xlm: "1080px",
        xll: "1280px",
        "2xlh": "1440px",
        "3xl": "1536px",
        "3xlf": "1600px",
        "4xl": "1920px",
        "4xlw": "2560px",
        "5xl": "2880px",
        "6xl": "3840px",
        "8xl": "5120px",
      },
    },
  },
  plugins: [tailwindScrollbar],
};

export default config;
