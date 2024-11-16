/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // MAIN PALETTE
        dominant_color_light: "#FFFFFF",
        secondary_color: "#202124",
        accent_color: "#4880FF",
        secondary_color_variant: "#E8EAED",

        // ACCENT COLOR PALETTE
        cherry_red_accent: "#E15A51",
        mint_accent: "#85E0A3",
        azure_light_blue_accent: "#8CC6E7",
        honey_yellow_accent: "#FFC700",
        lavender_accent: "#C7B9FF",

        // TEXT COLOR PALETTE
        white_text_color: "#FFFFFF",
        black_text_color: "#000000",
        gray_text_color: "#7A7A7A",
      },
      fontFamily: {
        sans: ["Nunito", "sans-serif"],
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
