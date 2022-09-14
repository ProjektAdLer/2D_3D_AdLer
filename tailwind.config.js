module.exports = {
  content: ["./src/**/*.{html,js,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        //Bei Custom Farben geben die Zahlenwerte die Saturation Prozentwerte wieder (700 = 70%)
        babylonbg: "#33334d", //Babylon Default Hintergrundfarbe
        blacktrans: {
          100: "rgba(0,0,0,0.1)",
          200: "rgba(0,0,0,0.2)",
          300: "rgba(0,0,0,0.3)",
          400: "rgba(0,0,0,0.4)",
          500: "rgba(0,0,0,0.5)", //50% schwarz für Modal-Hintergrund
          600: "rgba(0,0,0,0.6)",
          700: "rgba(0,0,0,0.7)",
          800: "rgba(0,0,0,0.8)",
          900: "rgba(0,0,0,0.9)",
        },
        adlerblue: {
          DEFAULT: "rgb(69,160,229)", // DEFAULT = 700
          100: "rgb(207,220,229)",
          200: "rgb(184,210,229)",
          300: "rgb(161,200,229)",
          400: "rgb(138,190,229)",
          500: "rgb(115,180,229)",
          600: "rgb(92,170,229)",
          700: "rgb(69,160,229)",
          800: "rgb(46,150,229)",
          900: "rgb(23,140,229)",
        },
        adlerdarkblue: {
          DEFAULT: "rgb(23,45,77)", //DEFAULT = 700
          100: "rgb(69,72,77)",
          200: "rgb(61,67,77)",
          300: "rgb(54,63,77)",
          400: "rgb(46,58,77)",
          500: "rgb(38,54,77)",
          600: "rgb(31,49,77)",
          700: "rgb(23,45,77)",
          800: "rgb(15,40,77)",
          900: "rgb(8,35,77)",
        },
        adlergold: {
          DEFAULT: "rgb(229,189,115)", //DEFAULT = 500
          100: "rgb(229,221,207)",
          200: "rgb(229,213,184)",
          300: "rgb(229,205,161)",
          400: "rgb(229,197,138)",
          500: "rgb(229,189,115)",
          600: "rgb(229,181,92)",
          700: "rgb(229,173,69)",
          800: "rgb(229,165,46)",
          900: "rgb(229,157,23)",
        },
        adlerbrown: "rgb(77,62,54)",
        adlergreen: "#009900",
        adlertextgrey: "#111111",
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
