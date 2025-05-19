import { LearningSpaceThemeType } from "../Types/LearningSpaceThemeTypes";
import {
  LearningSpaceTheme_CampusAB,
  LearningSpaceTheme_CampusKE,
  LearningSpaceTheme_CampusMensa,
  LearningSpaceTheme_CampusLibrary,
  LearningSpaceTheme_CampusStudentClub,
  LearningSpaceTheme_CampusAuditorium,
  LearningSpaceTheme_CampusServerRoom,
  LearningSpaceTheme_CampusLabor,
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

      case LearningSpaceThemeType.CampusMensa:
        return LearningSpaceTheme_CampusMensa;

      case LearningSpaceThemeType.CampusLibrary:
        return LearningSpaceTheme_CampusLibrary;

      case LearningSpaceThemeType.CampusStudentClub:
        return LearningSpaceTheme_CampusStudentClub;

      case LearningSpaceThemeType.CampusServerRoom:
        return LearningSpaceTheme_CampusServerRoom;

      case LearningSpaceThemeType.CampusLabor:
        return LearningSpaceTheme_CampusLabor;

      case LearningSpaceThemeType.CampusAuditorium:
        return LearningSpaceTheme_CampusAuditorium;

      case LearningSpaceThemeType.Arcade:
        return LearningSpaceTheme_Arcade;

      case LearningSpaceThemeType.Suburb:
      default:
        return LearningSpaceTheme_Suburb;

      // TODO: add other themes here
    }
  }
}
