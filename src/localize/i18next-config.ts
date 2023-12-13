import i18next from "i18next";
import { initReactI18next } from "react-i18next";
// Import language: de
import de_startPage from "./de/startPage.json";
import de_internetLoss from "./de/internetLoss.json";
import de_helpMenu from "./de/helpMenu.json";
import de_learningSpace from "./de/learningSpace.json";
import de_worldMenu from "./de/worldMenu.json";
import de_spaceMenu from "./de/spaceMenu.json";
import de_breakTime from "./de/breakTime.json";
import de_learningElement from "./de/learningElement.json";

const resources = {
  de: {
    start: de_startPage,
    internetLoss: de_internetLoss,
    helpMenu: de_helpMenu,
    worldMenu: de_worldMenu,
    spaceMenu: de_spaceMenu,
    learningSpace: de_learningSpace,
    breakTime: de_breakTime,
    learningElement: de_learningElement,
  },
};
const defaultNS = "start";

i18next.use(initReactI18next).init({
  debug: false,
  fallbackLng: "de",
  ns: [
    "start",
    "internetLoss",
    "helpMenu",
    "worldMenu",
    "spaceMenu",
    "learningSpace",
    "breakTime",
    "learningElement",
  ],
  resources: resources,
  defaultNS: defaultNS,
});
