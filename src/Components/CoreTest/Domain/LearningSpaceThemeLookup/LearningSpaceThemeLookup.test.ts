import LearningSpaceThemeLookup from "../../../Core/Domain/LearningSpaceThemes/LearningSpaceThemeLookup";
import LearningSpaceTheme_Arcade from "../../../Core/Domain/LearningSpaceThemes/LearningSpaceTheme_Arcade";
import {
  LearningSpaceTheme_CampusAB,
  LearningSpaceTheme_CampusKE,
  LearningSpaceTheme_CampusLibrary,
  LearningSpaceTheme_CampusMensa,
  LearningSpaceTheme_CampusStudentClub,
  LearningSpaceTheme_CampusServerRoom,
  LearningSpaceTheme_CampusLabor,
  LearningSpaceTheme_CampusAuditorium,
} from "../../../Core/Domain/LearningSpaceThemes/LearningSpaceTheme_Campus";
import LearningSpaceTheme_Suburb from "../../../Core/Domain/LearningSpaceThemes/LearningSpaceTheme_Suburb";
import { LearningSpaceThemeType } from "../../../Core/Domain/Types/LearningSpaceThemeTypes";

describe("LearningSpaceThemeLookup", () => {
  test("getLearningSpaceTheme return correct theme for Campus", () => {
    const result = LearningSpaceThemeLookup.getLearningSpaceTheme(
      LearningSpaceThemeType.Campus,
    );
    expect(result).toMatchObject(LearningSpaceTheme_CampusAB);
  });

  test("getLearningSpaceTheme return correct theme for CampusAB", () => {
    const result = LearningSpaceThemeLookup.getLearningSpaceTheme(
      LearningSpaceThemeType.CampusAB,
    );
    expect(result).toMatchObject(LearningSpaceTheme_CampusAB);
  });

  test("getLearningSpaceTheme return correct theme for CampusKE", () => {
    const result = LearningSpaceThemeLookup.getLearningSpaceTheme(
      LearningSpaceThemeType.CampusKE,
    );
    expect(result).toMatchObject(LearningSpaceTheme_CampusKE);
  });

  test("getLearningSpaceTheme return correct theme for Arcade", () => {
    const result = LearningSpaceThemeLookup.getLearningSpaceTheme(
      LearningSpaceThemeType.Arcade,
    );
    expect(result).toMatchObject(LearningSpaceTheme_Arcade);
  });

  test("getLearningSpaceTheme return correct theme for Suburb", () => {
    const result = LearningSpaceThemeLookup.getLearningSpaceTheme(
      LearningSpaceThemeType.Suburb,
    );
    expect(result).toMatchObject(LearningSpaceTheme_Suburb);
  });

  test("getLearningSpaceTheme return correct theme for CampusMensa", () => {
    const result = LearningSpaceThemeLookup.getLearningSpaceTheme(
      LearningSpaceThemeType.CampusMensa,
    );
    expect(result).toMatchObject(LearningSpaceTheme_CampusMensa);
  });

  test("getLearningSpaceTheme return correct theme for CampusLibrary", () => {
    const result = LearningSpaceThemeLookup.getLearningSpaceTheme(
      LearningSpaceThemeType.CampusLibrary,
    );
    expect(result).toMatchObject(LearningSpaceTheme_CampusLibrary);
  });

  test("getLearningSpaceTheme return correct theme for CampusStudentClub", () => {
    const result = LearningSpaceThemeLookup.getLearningSpaceTheme(
      LearningSpaceThemeType.CampusStudentClub,
    );
    expect(result).toMatchObject(LearningSpaceTheme_CampusStudentClub);
  });

  test("getLearningSpaceTheme return correct theme for CampusServerRoom", () => {
    const result = LearningSpaceThemeLookup.getLearningSpaceTheme(
      LearningSpaceThemeType.CampusServerRoom,
    );
    expect(result).toMatchObject(LearningSpaceTheme_CampusServerRoom);
  });

  test("getLearningSpaceTheme return correct theme for CampusLabor", () => {
    const result = LearningSpaceThemeLookup.getLearningSpaceTheme(
      LearningSpaceThemeType.CampusLabor,
    );
    expect(result).toMatchObject(LearningSpaceTheme_CampusLabor);
  });

  test("getLearningSpaceTheme return correct theme for CampusAuditorium", () => {
    const result = LearningSpaceThemeLookup.getLearningSpaceTheme(
      LearningSpaceThemeType.CampusAuditorium,
    );
    expect(result).toMatchObject(LearningSpaceTheme_CampusAuditorium);
  });
});
