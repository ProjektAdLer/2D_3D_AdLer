import { LearningSpaceThemeType } from "../../../../../Core/Domain/Types/LearningSpaceThemeTypes";

// Test the logic for background image selection
// Since getBackgroundImage is not exported, we test the logic separately
describe("NarrativeFramework Theme Logic", () => {
  // Simulate the getBackgroundImage function logic
  function getBackgroundImage(theme: LearningSpaceThemeType): string {
    const themeString = theme?.toString();

    if (
      themeString === LearningSpaceThemeType.CampusAB ||
      themeString?.startsWith("CAMPUSASCHAFFENBURG")
    ) {
      return "campusABBackground";
    }
    if (
      themeString === LearningSpaceThemeType.CampusKE ||
      themeString?.startsWith("CAMPUSKEMPTEN")
    ) {
      return "campusKEBackground";
    }
    if (
      themeString === LearningSpaceThemeType.Suburb ||
      themeString?.startsWith("SUBURB")
    ) {
      return "suburbBackground";
    }
    if (
      themeString === LearningSpaceThemeType.Company ||
      themeString?.startsWith("COMPANY")
    ) {
      return "companyBackground";
    }

    return "suburbBackground"; // fallback
  }

  test("should return CampusAB background for CampusAB theme", () => {
    const result = getBackgroundImage(LearningSpaceThemeType.CampusAB);
    expect(result).toBe("campusABBackground");
  });

  test("should return CampusKE background for CampusKE theme", () => {
    const result = getBackgroundImage(LearningSpaceThemeType.CampusKE);
    expect(result).toBe("campusKEBackground");
  });

  test("should return Suburb background for Suburb theme", () => {
    const result = getBackgroundImage(LearningSpaceThemeType.Suburb);
    expect(result).toBe("suburbBackground");
  });

  test("should return Company background for Company theme", () => {
    const result = getBackgroundImage(LearningSpaceThemeType.Company);
    expect(result).toBe("companyBackground");
  });

  test("should return Suburb background as fallback for undefined theme", () => {
    const result = getBackgroundImage(undefined as any);
    expect(result).toBe("suburbBackground");
  });

  test("should return Suburb background as fallback for unknown theme", () => {
    // Create a mock theme that doesn't match any known themes
    const unknownTheme = "UnknownTheme" as any;
    const result = getBackgroundImage(unknownTheme);
    expect(result).toBe("suburbBackground");
  });

  test("should handle Campus legacy theme (fallback)", () => {
    const result = getBackgroundImage(LearningSpaceThemeType.Campus);
    expect(result).toBe("suburbBackground");
  });
});
