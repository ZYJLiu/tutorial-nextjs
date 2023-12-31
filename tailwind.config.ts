import { nextui } from "@nextui-org/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    // "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/components/button.js",
    "./node_modules/@nextui-org/theme/dist/components/card.js",
    "./node_modules/@nextui-org/theme/dist/components/navbar.js",
    "./node_modules/@nextui-org/theme/dist/components/progress.js",
    "./node_modules/@nextui-org/theme/dist/components/spinner.js",
    "./node_modules/@nextui-org/theme/dist/components/tabs.js",
    "./node_modules/@nextui-org/theme/dist/components/accordion.js",
    "./node_modules/@nextui-org/theme/dist/components/image.js",
    "./node_modules/@nextui-org/theme/dist/components/pagination.js",
    "./node_modules/@nextui-org/theme/dist/components/popover.js",
  ],
  theme: {
    extend: {
      maxWidth: {
        none: "none",
      },
      typography(theme: any) {
        return {
          DEFAULT: {
            css: {
              color: theme("colors.gray.300"),
              '[class~="lead"]': { color: theme("colors.gray.400") },
              a: { color: theme("colors.gray.100") },
              strong: { color: theme("colors.gray.100") },
              "ul > li::before": { backgroundColor: theme("colors.gray.700") },
              hr: { borderColor: theme("colors.gray.800") },
              blockquote: {
                color: theme("colors.gray.100"),
                borderLeftColor: theme("colors.gray.800"),
              },
              h1: { color: theme("colors.gray.100") },
              h2: { color: theme("colors.gray.100"), marginTop: "0" },
              h3: { color: theme("colors.gray.100") },
              h4: { color: theme("colors.gray.100") },
              code: { color: theme("colors.gray.100") },
              "a code": { color: theme("colors.gray.100") },
              pre: {
                color: theme("colors.gray.200"),
                backgroundColor: theme("colors.gray.800"),
              },
              thead: {
                color: theme("colors.gray.100"),
                borderBottomColor: theme("colors.gray.700"),
              },
              "tbody tr": { borderBottomColor: theme("colors.gray.800") },
            },
          },
        };
      },
    },
  },

  variants: {
    extend: {},
  },
  darkMode: "false",
  plugins: [
    nextui(),
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
  ],
};
