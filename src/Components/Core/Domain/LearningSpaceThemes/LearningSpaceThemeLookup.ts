import { ThemeType } from "../Types/ThemeTypes";
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
  static getLearningSpaceTheme(type: ThemeType) {
    switch (type) {
      // --- Legacy & World Themes ---
      case ThemeType.Campus: // kept for backwards campatibility
      case ThemeType.CampusAB:
      case ThemeType.CampusAB_EatingArea:
      case ThemeType.CampusAB_LearningArea:
      case ThemeType.CampusAB_SocialArea:
      case ThemeType.CampusAB_TechnicalArea:
      case ThemeType.CampusAB_FnE:
      case ThemeType.CampusAB_Presentation:
        return LearningSpaceTheme_CampusAB;

      case ThemeType.CampusKE:
        return LearningSpaceTheme_CampusKE;

      // --- Legacy & CampusKE Sub-Themes ---
      case ThemeType.CampusMensa:
      case ThemeType.CampusKE_EatingArea:
        return LearningSpaceTheme_CampusMensa;

      case ThemeType.CampusLibrary:
      case ThemeType.CampusKE_LearningArea:
        return LearningSpaceTheme_CampusLibrary;

      case ThemeType.CampusStudentClub:
      case ThemeType.CampusKE_SocialArea:
        return LearningSpaceTheme_CampusStudentClub;

      case ThemeType.CampusServerRoom:
      case ThemeType.CampusKE_TechnicalArea:
        return LearningSpaceTheme_CampusServerRoom;

      case ThemeType.CampusLabor:
      case ThemeType.CampusKE_FnE:
        return LearningSpaceTheme_CampusLabor;

      case ThemeType.CampusAuditorium:
      case ThemeType.CampusKE_Presentation:
        return LearningSpaceTheme_CampusAuditorium;

      case ThemeType.Arcade:
        return LearningSpaceTheme_Arcade;

      // --- Suburb & Company Themes (currently fall back to a single theme) ---
      case ThemeType.Suburb:
      case ThemeType.Suburb_LearningArea:
      case ThemeType.Suburb_EatingArea:
      case ThemeType.Suburb_Presentation:
      case ThemeType.Suburb_FnE:
      case ThemeType.Suburb_SocialArea:
      case ThemeType.Suburb_TechnicalArea:
        return LearningSpaceTheme_Suburb;

      case ThemeType.Company:
      case ThemeType.Company_LearningArea:
      case ThemeType.Company_EatingArea:
      case ThemeType.Company_Presentation:
      case ThemeType.Company_FnE:
      case ThemeType.Company_SocialArea:
      case ThemeType.Company_TechnicalArea:
        return LearningSpaceTheme_Suburb; // PLACEHOLDER
      // TODO: Add a specific Company Theme object when it exists
      // For now, fall back to a default theme
      default:
        return LearningSpaceTheme_CampusAB;
    }
  }
}
