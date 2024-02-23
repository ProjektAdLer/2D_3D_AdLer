import LearningSpaceThemeLookup from "../../../Core/Domain/LearningSpaceThemes/LearningSpaceThemeLookup";
import LearningSpaceTheme_Arcade from "../../../Core/Domain/LearningSpaceThemes/LearningSpaceTheme_Arcade";
import {
  LearningSpaceTheme_CampusAB,
  LearningSpaceTheme_CampusKE,
} from "../../../Core/Domain/LearningSpaceThemes/LearningSpaceTheme_Campus";
import LearningSpaceTheme_Suburb from "../../../Core/Domain/LearningSpaceThemes/LearningSpaceTheme_Suburb";
import { LearningSpaceThemeType } from "../../../Core/Domain/Types/LearningSpaceThemeTypes";

describe("LearningSpaceThemeLookup", () => {
  test("getLearningSpaceTheme return correct theme for Campus", () => {
    const result = LearningSpaceThemeLookup.getLearningSpaceTheme(
      LearningSpaceThemeType.Campus
    );
    expect(result).toMatchObject(LearningSpaceTheme_CampusAB);
  });

  test("getLearningSpaceTheme return correct theme for CampusAB", () => {
    const result = LearningSpaceThemeLookup.getLearningSpaceTheme(
      LearningSpaceThemeType.CampusAB
    );
    expect(result).toMatchObject(LearningSpaceTheme_CampusAB);
  });

  test("getLearningSpaceTheme return correct theme for CampusKE", () => {
    const result = LearningSpaceThemeLookup.getLearningSpaceTheme(
      LearningSpaceThemeType.CampusKE
    );
    expect(result).toMatchObject(LearningSpaceTheme_CampusKE);
  });

  test("getLearningSpaceTheme return correct theme for Arcade", () => {
    const result = LearningSpaceThemeLookup.getLearningSpaceTheme(
      LearningSpaceThemeType.Arcade
    );
    expect(result).toMatchObject(LearningSpaceTheme_Arcade);
  });

  test("getLearningSpaceTheme return correct theme for Suburb", () => {
    const result = LearningSpaceThemeLookup.getLearningSpaceTheme(
      LearningSpaceThemeType.Suburb
    );
    expect(result).toMatchObject(LearningSpaceTheme_Suburb);
  });
});
