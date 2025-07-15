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
      // --- Legacy & World Themes ---
      case LearningSpaceThemeType.Campus: // kept for backwards campatibility
      case LearningSpaceThemeType.CampusAB:
      case LearningSpaceThemeType.CampusAB_EatingArea:
      case LearningSpaceThemeType.CampusAB_LearningArea:
      case LearningSpaceThemeType.CampusAB_SocialArea:
      case LearningSpaceThemeType.CampusAB_TechnicalArea:
      case LearningSpaceThemeType.CampusAB_FnE:
      case LearningSpaceThemeType.CampusAB_Presentation:
        return LearningSpaceTheme_CampusAB;

      case LearningSpaceThemeType.CampusKE:
        return LearningSpaceTheme_CampusKE;

      // --- Legacy & CampusKE Sub-Themes ---
      case LearningSpaceThemeType.CampusMensa:
      case LearningSpaceThemeType.CampusKE_EatingArea:
        return LearningSpaceTheme_CampusMensa;

      case LearningSpaceThemeType.CampusLibrary:
      case LearningSpaceThemeType.CampusKE_LearningArea:
        return LearningSpaceTheme_CampusLibrary;

      case LearningSpaceThemeType.CampusStudentClub:
      case LearningSpaceThemeType.CampusKE_SocialArea:
        return LearningSpaceTheme_CampusStudentClub;

      case LearningSpaceThemeType.CampusServerRoom:
      case LearningSpaceThemeType.CampusKE_TechnicalArea:
        return LearningSpaceTheme_CampusServerRoom;

      case LearningSpaceThemeType.CampusLabor:
      case LearningSpaceThemeType.CampusKE_FnE:
        return LearningSpaceTheme_CampusLabor;

      case LearningSpaceThemeType.CampusAuditorium:
      case LearningSpaceThemeType.CampusKE_Presentation:
        return LearningSpaceTheme_CampusAuditorium;

      case LearningSpaceThemeType.Arcade:
        return LearningSpaceTheme_Arcade;

      // --- Suburb & Company Themes (currently fall back to a single theme) ---
      case LearningSpaceThemeType.Suburb:
      case LearningSpaceThemeType.Suburb_LearningArea:
      case LearningSpaceThemeType.Suburb_EatingArea:
      case LearningSpaceThemeType.Suburb_Presentation:
      case LearningSpaceThemeType.Suburb_FnE:
      case LearningSpaceThemeType.Suburb_SocialArea:
      case LearningSpaceThemeType.Suburb_TechnicalArea:
        return LearningSpaceTheme_Suburb;

      case LearningSpaceThemeType.Company:
      case LearningSpaceThemeType.Company_LearningArea:
      case LearningSpaceThemeType.Company_EatingArea:
      case LearningSpaceThemeType.Company_Presentation:
      case LearningSpaceThemeType.Company_FnE:
      case LearningSpaceThemeType.Company_SocialArea:
      case LearningSpaceThemeType.Company_TechnicalArea:
        return LearningSpaceTheme_Suburb; // PLACEHOLDER
      // TODO: Add a specific Company Theme object when it exists
      // For now, fall back to a default theme
      default:
        return LearningSpaceTheme_CampusAB;
    }
  }
}
