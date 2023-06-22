const tailwindcss = require("tailwindcss");

module.exports = {
  important: true,
  content: ["./src/**/*.{html,js,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-6deg)" },
          "50%": { transform: "rotate(6deg)" },
        },
        bluetogold: {
          "0%, 100%": { border: "1.25rem solid #172d4d" },
          "50%": { border: "1.25rem solid #e9d6b3" },
        },
      },
      animation: {
        loadtileone: "bluetogold 1s ease-in-out 0s 1",
        loadtiletwo: "bluetogold 1s ease-in-out 0.5s 1",
        loadtilethree: "bluetogold 1s ease-in-out 1s 1",
        loadtilefour: "bluetogold 1s ease-in-out 1.5s 1",
        loadtilefive: "bluetogold 1s ease-in-out 2s 1",
        loadtilesix: "bluetogold 1s ease-in-out 2.5s 1",
        loadtileseven: "bluetogold 1s ease-in-out 3s 1",
        loadtileeight: "bluetogold 1s ease-in-out 3.5s 1",
        loadtilenine: "bluetogold 1s ease-in-out 4s 1",
        loadtileten: "bluetogold 1s ease-in-out 4.5s 1",
        wiggle: "wiggle 1s ease-in-out infinite",
      },
      colors: {
        babylonbg: "#33334d", //Babylon Default Hintergrundfarbe
        blacktrans: "rgba(0,0,0,0.5)",
        adlerblue: "#a1c8e5",
        adlerdarkblue: "rgb(23,45,77)" /*#172d4d*/,
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
