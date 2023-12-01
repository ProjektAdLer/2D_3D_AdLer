import i18next from "i18next";
import { initReactI18next } from "react-i18next";
// Import language: de
import de_coreMenu from "./de/coreMenu.json";
import de_learningSpace from "./de/learningSpace.json";
// Import language: en
import en_coreMenu from "./en/coreMenu.json";
import en_learningSpace from "./en/learningSpace.json";

/**
 namespace explanation:
 menu: contains everything from login up to the entering of a learning space
 learningSpace: contains everything that is displayed in the actual learning space
*/

const resources = {
  de: {
    menu: de_coreMenu,
    learningSpace: de_learningSpace,
  },
  en: {
    menu: en_coreMenu,
    learningSpace: en_learningSpace,
  },
};
const defaultNS = "menu";

i18next.use(initReactI18next).init({
  debug: true,
  fallbackLng: "de",
  ns: ["menu", "learningSpace"],
  resources: resources,
  defaultNS: defaultNS,
});
