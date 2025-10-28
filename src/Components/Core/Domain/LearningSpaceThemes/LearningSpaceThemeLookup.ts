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
      // --- CampusAB Theme ---
      case ThemeType.CampusAB:
      case ThemeType.CampusAB_EatingArea:
      case ThemeType.CampusAB_LearningArea:
      case ThemeType.CampusAB_SocialArea:
      case ThemeType.CampusAB_TechnicalArea:
      case ThemeType.CampusAB_FnE:
      case ThemeType.CampusAB_Presentation:
        return LearningSpaceTheme_CampusAB;

      // --- CampusKE Theme ---
      case ThemeType.CampusKE:
      case ThemeType.CampusKE_EatingArea:
      case ThemeType.CampusKE_LearningArea:
      case ThemeType.CampusKE_SocialArea:
      case ThemeType.CampusKE_TechnicalArea:
      case ThemeType.CampusKE_FnE:
      case ThemeType.CampusKE_Presentation:
        return LearningSpaceTheme_CampusKE;

      // --- Company Theme ---
      case ThemeType.Company:
      case ThemeType.Company_LearningArea:
      case ThemeType.Company_EatingArea:
      case ThemeType.Company_Presentation:
      case ThemeType.Company_FnE:
      case ThemeType.Company_SocialArea:
      case ThemeType.Company_TechnicalArea:
        return LearningSpaceTheme_Suburb;

      // --- Legacy Themes ---
      case ThemeType.Arcade:
        return LearningSpaceTheme_Arcade;
      case ThemeType.Suburb:
        return LearningSpaceTheme_Suburb;
      case ThemeType.Campus:
        return LearningSpaceTheme_CampusAB;

      // --- Legacy Campus Subthemes ---
      case ThemeType.CampusMensa:
        return LearningSpaceTheme_CampusMensa;
      case ThemeType.CampusLibrary:
        return LearningSpaceTheme_CampusLibrary;
      case ThemeType.CampusStudentClub:
        return LearningSpaceTheme_CampusStudentClub;
      case ThemeType.CampusServerRoom:
        return LearningSpaceTheme_CampusServerRoom;
      case ThemeType.CampusLabor:
        return LearningSpaceTheme_CampusLabor;
      case ThemeType.CampusAuditorium:
        return LearningSpaceTheme_CampusAuditorium;

      default:
        return LearningSpaceTheme_CampusAB;
    }
  }
}
