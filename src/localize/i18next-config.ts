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
import de_spaceGoal from "./de/spaceGoal.json";
import de_controls from "./de/controls.json";
import de_avatarEditor from "./de/avatarEditor.json";

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
    spaceGoal: de_spaceGoal,
    controls: de_controls,
    avatarEditor: de_avatarEditor,
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
    "spaceGoal",
    "controls",
    "avatarEditor",
  ],
  resources: resources,
  defaultNS: defaultNS,
});
