import { LearningSpaceThemeType } from "../Types/LearningSpaceThemeTypes";
import LearningSpaceTheme_Campus from "./LearningSpaceTheme_Campus";
import LearningSpaceTheme_Arcade from "./LearningSpaceTheme_Arcade";
import LearningSpaceTheme_Default from "./LearningSpaceTheme_Default";

export default class LearningSpaceThemeLookup {
  static getLearningSpaceTheme(type: LearningSpaceThemeType) {
    switch (type) {
      case LearningSpaceThemeType.Campus:
        return LearningSpaceTheme_Campus;
      case LearningSpaceThemeType.Arcade:
        return LearningSpaceTheme_Arcade;
      default:
        return LearningSpaceTheme_Default;

      // TODO: add other themes here
    }

    // throw new Error(
    //   `LearningSpaceThemeLookup.getLearningSpaceTheme: Learning space theme for ${type} not found.`
    // );
  }
}
