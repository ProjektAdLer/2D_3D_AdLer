import { LearningSpaceThemeType } from "../Types/LearningSpaceThemeTypes";
import {
  LearningSpaceTheme_CampusAB,
  LearningSpaceTheme_CampusKE,
} from "./LearningSpaceTheme_Campus";
import LearningSpaceTheme_Arcade from "./LearningSpaceTheme_Arcade";
import LearningSpaceTheme_Suburb from "./LearningSpaceTheme_Suburb";

export default class LearningSpaceThemeLookup {
  static getLearningSpaceTheme(type: LearningSpaceThemeType) {
    switch (type) {
      case LearningSpaceThemeType.Campus: // kept for backwards campatibility
      case LearningSpaceThemeType.CampusAB:
        return LearningSpaceTheme_CampusAB;

      case LearningSpaceThemeType.CampusKE:
        return LearningSpaceTheme_CampusKE;

      case LearningSpaceThemeType.Arcade:
        return LearningSpaceTheme_Arcade;

      case LearningSpaceThemeType.Suburb:
      default:
        return LearningSpaceTheme_Suburb;

      // TODO: add other themes here
    }
  }
}
