import LearningSpaceThemeLookup from "../../../Core/Domain/LearningSpaceThemes/LearningSpaceThemeLookup";
import LearningSpaceTheme_Arcade from "../../../Core/Domain/LearningSpaceThemes/Legacy/LearningSpaceTheme_Arcade";
import { LearningSpaceTheme_CampusAB } from "../../../Core/Domain/LearningSpaceThemes/CampusAB/LearningSpaceTheme_CampusAB";
import { LearningSpaceTheme_CampusKE } from "../../../Core/Domain/LearningSpaceThemes/CampusKE/LearningSpaceTheme_CampusKE";
import { LearningSpaceTheme_CampusLibrary } from "../../../Core/Domain/LearningSpaceThemes/CampusKE/LearningSpaceTheme_CampusLibrary";
import { LearningSpaceTheme_CampusMensa } from "../../../Core/Domain/LearningSpaceThemes/CampusKE/LearningSpaceTheme_CampusMensa";
import { LearningSpaceTheme_CampusStudentClub } from "../../../Core/Domain/LearningSpaceThemes/CampusKE/LearningSpaceTheme_CampusStudentClub";
import { LearningSpaceTheme_CampusServerRoom } from "../../../Core/Domain/LearningSpaceThemes/CampusKE/LearningSpaceTheme_CampusServerRoom";
import { LearningSpaceTheme_CampusLabor } from "../../../Core/Domain/LearningSpaceThemes/CampusKE/LearningSpaceTheme_CampusLabor";
import { LearningSpaceTheme_CampusAuditorium } from "../../../Core/Domain/LearningSpaceThemes/CampusKE/LearningSpaceTheme_CampusAuditorium";
import LearningSpaceTheme_Suburb from "../../../Core/Domain/LearningSpaceThemes/Legacy/LearningSpaceTheme_Suburb";
import { ThemeType } from "../../../Core/Domain/Types/ThemeTypes";

describe("LearningSpaceThemeLookup", () => {
  test("getLearningSpaceTheme return correct theme for Campus", () => {
    const result = LearningSpaceThemeLookup.getLearningSpaceTheme(
      ThemeType.Campus,
    );
    expect(result).toMatchObject(LearningSpaceTheme_CampusAB);
  });

  test("getLearningSpaceTheme return correct theme for CampusAB", () => {
    const result = LearningSpaceThemeLookup.getLearningSpaceTheme(
      ThemeType.CampusAB,
    );
    expect(result).toMatchObject(LearningSpaceTheme_CampusAB);
  });

  test("getLearningSpaceTheme return correct theme for CampusKE", () => {
    const result = LearningSpaceThemeLookup.getLearningSpaceTheme(
      ThemeType.CampusKE,
    );
    expect(result).toMatchObject(LearningSpaceTheme_CampusKE);
  });

  test("getLearningSpaceTheme return correct theme for Arcade", () => {
    const result = LearningSpaceThemeLookup.getLearningSpaceTheme(
      ThemeType.Arcade,
    );
    expect(result).toMatchObject(LearningSpaceTheme_Arcade);
  });

  test("getLearningSpaceTheme return correct theme for Suburb", () => {
    const result = LearningSpaceThemeLookup.getLearningSpaceTheme(
      ThemeType.Suburb,
    );
    expect(result).toMatchObject(LearningSpaceTheme_Suburb);
  });

  test("getLearningSpaceTheme return correct theme for CampusMensa", () => {
    const result = LearningSpaceThemeLookup.getLearningSpaceTheme(
      ThemeType.CampusMensa,
    );
    expect(result).toMatchObject(LearningSpaceTheme_CampusMensa);
  });

  test("getLearningSpaceTheme return correct theme for CampusLibrary", () => {
    const result = LearningSpaceThemeLookup.getLearningSpaceTheme(
      ThemeType.CampusLibrary,
    );
    expect(result).toMatchObject(LearningSpaceTheme_CampusLibrary);
  });

  test("getLearningSpaceTheme return correct theme for CampusStudentClub", () => {
    const result = LearningSpaceThemeLookup.getLearningSpaceTheme(
      ThemeType.CampusStudentClub,
    );
    expect(result).toMatchObject(LearningSpaceTheme_CampusStudentClub);
  });

  test("getLearningSpaceTheme return correct theme for CampusServerRoom", () => {
    const result = LearningSpaceThemeLookup.getLearningSpaceTheme(
      ThemeType.CampusServerRoom,
    );
    expect(result).toMatchObject(LearningSpaceTheme_CampusServerRoom);
  });

  test("getLearningSpaceTheme return correct theme for CampusLabor", () => {
    const result = LearningSpaceThemeLookup.getLearningSpaceTheme(
      ThemeType.CampusLabor,
    );
    expect(result).toMatchObject(LearningSpaceTheme_CampusLabor);
  });

  test("getLearningSpaceTheme return correct theme for CampusAuditorium", () => {
    const result = LearningSpaceThemeLookup.getLearningSpaceTheme(
      ThemeType.CampusAuditorium,
    );
    expect(result).toMatchObject(LearningSpaceTheme_CampusAuditorium);
  });
});
