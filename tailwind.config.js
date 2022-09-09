module.exports = {
  content: ["./src/**/*.{html,js,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        babylonbg: "#33334d", //Babylon Default Hintergrundfarbe
        blacktrans50: "rgba(0,0,0,0.5)", //50% schwarz für Modal-Hintergrund
        adlerlightblue: "rgb(207,216,229)",
        adlerblue: "rgb(69,160,229)",
        adlerdarkblue: "rgb(23,45,77)",
        adlergold: "rgb(229,189,115)",
        adlerbrown: "rgb(77,62,54)",
        adlergreen: "#009900",
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
  plugins: [],
};
