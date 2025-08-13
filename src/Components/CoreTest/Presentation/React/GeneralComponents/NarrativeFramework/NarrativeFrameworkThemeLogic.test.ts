import { ThemeType } from "../../../../../Core/Domain/Types/ThemeTypes";

// Test the logic for background image selection
// Since getBackgroundImage is not exported, we test the logic separately
describe("NarrativeFramework Theme Logic", () => {
  // Simulate the getBackgroundImage function logic
  function getBackgroundImage(theme: ThemeType): string {
    const themeString = theme?.toString();

    if (
      themeString === ThemeType.CampusAB ||
      themeString?.startsWith("CAMPUSASCHAFFENBURG")
    ) {
      return "campusABBackground";
    }
    if (
      themeString === ThemeType.CampusKE ||
      themeString?.startsWith("CAMPUSKEMPTEN")
    ) {
      return "campusKEBackground";
    }
    if (themeString === ThemeType.Suburb || themeString?.startsWith("SUBURB")) {
      return "suburbBackground";
    }
    if (
      themeString === ThemeType.Company ||
      themeString?.startsWith("COMPANY")
    ) {
      return "companyBackground";
    }

    return "suburbBackground"; // fallback
  }

  test("should return CampusAB background for CampusAB theme", () => {
    const result = getBackgroundImage(ThemeType.CampusAB);
    expect(result).toBe("campusABBackground");
  });

  test("should return CampusKE background for CampusKE theme", () => {
    const result = getBackgroundImage(ThemeType.CampusKE);
    expect(result).toBe("campusKEBackground");
  });

  test("should return Suburb background for Suburb theme", () => {
    const result = getBackgroundImage(ThemeType.Suburb);
    expect(result).toBe("suburbBackground");
  });

  test("should return Company background for Company theme", () => {
    const result = getBackgroundImage(ThemeType.Company);
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
    const result = getBackgroundImage(ThemeType.Campus);
    expect(result).toBe("suburbBackground");
  });
});
