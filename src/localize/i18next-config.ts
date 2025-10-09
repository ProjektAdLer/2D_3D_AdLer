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
import de_loadingScreen from "./de/loadingScreen.json";
import de_errorMessages from "./de/errorMessages.json";
import de_settingsMenu from "./de/settingsMenu.json";
// Import language: en
import en_avatarEditor from "./en/avatarEditor.json";
import en_startPage from "./en/startPage.json";

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
    loadingScreen: de_loadingScreen,
    errorMessages: de_errorMessages,
    settingsMenu: de_settingsMenu,
  },
  en: {
    start: en_startPage,
    avatarEditor: en_avatarEditor,
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
    "errorMessages",
  ],
  resources: resources,
  defaultNS: defaultNS,
});
