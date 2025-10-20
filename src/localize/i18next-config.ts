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
import de_privacy from "./de/privacy.json";
// Import language: en
import en_avatarEditor from "./en/avatarEditor.json";
import en_startPage from "./en/startPage.json";
import en_breakTime from "./en/breakTime.json";
import en_controls from "./en/controls.json";
import en_helpMenu from "./en/helpMenu.json";
import en_internetLoss from "./en/internetLoss.json";
import en_errorMessages from "./en/errorMessages.json";
import en_learningElement from "./en/learningElement.json";
import en_learningSpace from "./en/learningSpace.json";
import en_loadingScreen from "./en/loadingScreen.json";
import en_settingsMenu from "./en/settingsMenu.json";
import en_spaceGoal from "./en/spaceGoal.json";
import en_spaceMenu from "./en/spaceMenu.json";
import en_worldMenu from "./en/worldMenu.json";
import en_privacy from "./en/privacy.json";

const resources = {
  de: {
    avatarEditor: de_avatarEditor,
    breakTime: de_breakTime,
    controls: de_controls,
    errorMessages: de_errorMessages,
    helpMenu: de_helpMenu,
    internetLoss: de_internetLoss,
    learningElement: de_learningElement,
    learningSpace: de_learningSpace,
    loadingScreen: de_loadingScreen,
    settingsMenu: de_settingsMenu,
    spaceGoal: de_spaceGoal,
    spaceMenu: de_spaceMenu,
    start: de_startPage,
    worldMenu: de_worldMenu,
    privacy: de_privacy,
  },
  en: {
    avatarEditor: en_avatarEditor,
    breakTime: en_breakTime,
    controls: en_controls,
    errorMessages: en_errorMessages,
    helpMenu: en_helpMenu,
    internetLoss: en_internetLoss,
    learningElement: en_learningElement,
    learningSpace: en_learningSpace,
    loadingScreen: en_loadingScreen,
    settingsMenu: en_settingsMenu,
    spaceGoal: en_spaceGoal,
    spaceMenu: en_spaceMenu,
    start: en_startPage,
    worldMenu: en_worldMenu,
    privacy: en_privacy,
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
    "privacy",
  ],
  resources: resources,
  defaultNS: defaultNS,
});
