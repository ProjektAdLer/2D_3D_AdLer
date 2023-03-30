const tailwindcss = require("tailwindcss");

module.exports = {
  important: true,
  content: ["./src/**/*.{html,js,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        babylonbg: "#33334d", //Babylon Default Hintergrundfarbe
        blacktrans: "rgba(0,0,0,0.5)",
        adlerblue: "#a1c8e5",
        adlerdarkblue: "rgb(23,45,77)",
        adlergreen: "#59b347",
        buttonbgblue: "#e9f2fa",
        buttonpressedblue: "#ace8fc",
        adlertextgrey: "#111111",
        adlerbuttonlocked: "#b9bfc6",
        adlerdeactivatedtext: "#e9e9e9",
        adlerbggradientfrom: "#a1c8e5",
        adlerbggradientto: "#e2eaf2",
        nodehandlecolor: "#e9d6b3",
        // Neue Farben, die noch nicht im Wiki dokumentiert sind, bitte unter diesem Kommentar einfügen
      },
      gridTemplateRows: {
        12: "repeat(12, minmax(0, 1fr))",
        24: "repeat(24, minmax(0, 1fr))",
      },
      gridRow: {
        21: "span 21",
      },
    },
  },
  plugins: [tailwindcss("./tailwind.js"), require("autoprefixer")],
};
