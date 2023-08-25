import { LearningSpaceThemeType } from "../Types/LearningSpaceThemeTypes";
import LearningSpaceTheme_Campus from "./LearningSpaceTheme_Campus";

export default class LearningSpaceThemeLookup {
  static getLearningSpaceTheme(type: LearningSpaceThemeType) {
    switch (type) {
      case LearningSpaceThemeType.Campus:
        return LearningSpaceTheme_Campus;
      // TODO: add other themes here
    }

    throw new Error(
      `LearningSpaceThemeLookup.getLearningSpaceTheme: Learning space theme for ${type} not found.`
    );
  }
}
