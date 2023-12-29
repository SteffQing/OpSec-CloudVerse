import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-linear":
          "linear-gradient(var(--tw-gradient-angle), var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(var(--tw-gradient-stops))",
      }),
      colors: {
        color1: "#1d202d",
        color2: "#0e111c",
      },
      boxShadow: {
        custom: "-7px 42px 57.7px 0px rgba(0, 0, 0, 0.6)",
      },
      width: {
        sibling_80: "calc(100% - 2rem)",
      },
    },
  },
  plugins: [],
};
export default config;
