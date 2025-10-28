import { ThemeType } from "../Types/ThemeTypes";

// Legacy Themes
import LearningSpaceTheme_Arcade from "./Legacy/LearningSpaceTheme_Arcade";
import LearningSpaceTheme_Suburb from "./Legacy/LearningSpaceTheme_Suburb";

// CampusAB Theme
import { LearningSpaceTheme_CampusAB } from "./CampusAB/LearningSpaceTheme_CampusAB";
import { LearningSpaceTheme_CampusAB_LearningArea } from "./CampusAB/LearningSpaceTheme_CampusAB_LearningArea";
import { LearningSpaceTheme_CampusAB_EatingArea } from "./CampusAB/LearningSpaceTheme_CampusAB_EatingArea";
import { LearningSpaceTheme_CampusAB_Presentation } from "./CampusAB/LearningSpaceTheme_CampusAB_Presentation";
import { LearningSpaceTheme_CampusAB_FnE } from "./CampusAB/LearningSpaceTheme_CampusAB_FnE";
import { LearningSpaceTheme_CampusAB_SocialArea } from "./CampusAB/LearningSpaceTheme_CampusAB_SocialArea";
import { LearningSpaceTheme_CampusAB_TechnicalArea } from "./CampusAB/LearningSpaceTheme_CampusAB_TechnicalArea";

// CampusKE Theme
import { LearningSpaceTheme_CampusKE } from "./CampusKE/LearningSpaceTheme_CampusKE";
import { LearningSpaceTheme_CampusMensa } from "./CampusKE/LearningSpaceTheme_CampusMensa";
import { LearningSpaceTheme_CampusLibrary } from "./CampusKE/LearningSpaceTheme_CampusLibrary";
import { LearningSpaceTheme_CampusStudentClub } from "./CampusKE/LearningSpaceTheme_CampusStudentClub";
import { LearningSpaceTheme_CampusServerRoom } from "./CampusKE/LearningSpaceTheme_CampusServerRoom";
import { LearningSpaceTheme_CampusLabor } from "./CampusKE/LearningSpaceTheme_CampusLabor";
import { LearningSpaceTheme_CampusAuditorium } from "./CampusKE/LearningSpaceTheme_CampusAuditorium";

// Company Theme
import { LearningSpaceTheme_Company } from "./Company/LearningSpaceTheme_Company";
import { LearningSpaceTheme_Company_LearningArea } from "./Company/LearningSpaceTheme_Company_LearningArea";
import { LearningSpaceTheme_Company_EatingArea } from "./Company/LearningSpaceTheme_Company_EatingArea";
import { LearningSpaceTheme_Company_Presentation } from "./Company/LearningSpaceTheme_Company_Presentation";
import { LearningSpaceTheme_Company_FnE } from "./Company/LearningSpaceTheme_Company_FnE";
import { LearningSpaceTheme_Company_SocialArea } from "./Company/LearningSpaceTheme_Company_SocialArea";
import { LearningSpaceTheme_Company_TechnicalArea } from "./Company/LearningSpaceTheme_Company_TechnicalArea";

export default class LearningSpaceThemeLookup {
  static getLearningSpaceTheme(type: ThemeType) {
    switch (type) {
      // --- CampusAB Theme ---
      case ThemeType.CampusAB:
        return LearningSpaceTheme_CampusAB;

      case ThemeType.CampusAB_EatingArea:
        return LearningSpaceTheme_CampusAB_EatingArea;

      case ThemeType.CampusAB_LearningArea:
        return LearningSpaceTheme_CampusAB_LearningArea;

      case ThemeType.CampusAB_SocialArea:
        return LearningSpaceTheme_CampusAB_SocialArea;

      case ThemeType.CampusAB_TechnicalArea:
        return LearningSpaceTheme_CampusAB_TechnicalArea;

      case ThemeType.CampusAB_FnE:
        return LearningSpaceTheme_CampusAB_FnE;

      case ThemeType.CampusAB_Presentation:
        return LearningSpaceTheme_CampusAB_Presentation;

      // --- CampusKE Theme ---
      case ThemeType.CampusKE:
        return LearningSpaceTheme_CampusKE;

      case ThemeType.CampusKE_EatingArea:
        return LearningSpaceTheme_CampusMensa;

      case ThemeType.CampusKE_LearningArea:
        return LearningSpaceTheme_CampusLibrary;

      case ThemeType.CampusKE_SocialArea:
        return LearningSpaceTheme_CampusStudentClub;

      case ThemeType.CampusKE_TechnicalArea:
        return LearningSpaceTheme_CampusServerRoom;

      case ThemeType.CampusKE_FnE:
        return LearningSpaceTheme_CampusLabor;

      case ThemeType.CampusKE_Presentation:
        return LearningSpaceTheme_CampusAuditorium;

      // --- Company Theme ---
      case ThemeType.Company:
        return LearningSpaceTheme_Company;

      case ThemeType.Company_LearningArea:
        return LearningSpaceTheme_Company_LearningArea;

      case ThemeType.Company_EatingArea:
        return LearningSpaceTheme_Company_EatingArea;

      case ThemeType.Company_Presentation:
        return LearningSpaceTheme_Company_Presentation;

      case ThemeType.Company_FnE:
        return LearningSpaceTheme_Company_FnE;

      case ThemeType.Company_SocialArea:
        return LearningSpaceTheme_Company_SocialArea;

      case ThemeType.Company_TechnicalArea:
        return LearningSpaceTheme_Company_TechnicalArea;

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
