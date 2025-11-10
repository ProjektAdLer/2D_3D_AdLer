import ILearningSpaceTheme from "../../../Core/Domain/LearningSpaceThemes/ILearningSpaceTheme";
import LearningSpaceThemeLookup from "../../../Core/Domain/LearningSpaceThemes/LearningSpaceThemeLookup";
import { ThemeType } from "../../../Core/Domain/Types/ThemeTypes";
import { LearningElementTypes } from "../../../Core/Domain/Types/LearningElementTypes";
import { LearningSpaceTemplateType } from "../../../Core/Domain/Types/LearningSpaceTemplateType";

// Helper function to validate theme compliance with interface
function validateThemeCompliance(
  theme: ILearningSpaceTheme,
  themeName: string,
): void {
  // Required properties must exist
  expect(theme.learningElementModels).toBeDefined();
  expect(theme.ambienceModel).toBeDefined();
  expect(theme.entryDoorModel).toBeDefined();
  expect(theme.exitDoorModel).toBeDefined();
  expect(theme.storyElementModel).toBeDefined();

  // Learning element models should be non-empty
  expect(Object.keys(theme.learningElementModels).length).toBeGreaterThan(0);

  // Required model properties should be strings (asset paths)
  expect(typeof theme.ambienceModel).toBe("string");
  expect(typeof theme.entryDoorModel).toBe("string");
  expect(typeof theme.exitDoorModel).toBe("string");

  // Verify all learning element types have models
  Object.values(LearningElementTypes).forEach((elementType) => {
    if (elementType !== LearningElementTypes.notAnElement) {
      expect(
        theme.learningElementModels[elementType as LearningElementTypes],
      ).toBeDefined();
    }
  });

  // If decoration maps exist, verify they have all template types
  if (theme.insideDecorationModels) {
    const requiredTemplateTypes = [
      LearningSpaceTemplateType.L,
      LearningSpaceTemplateType.R6,
      LearningSpaceTemplateType.R8,
      LearningSpaceTemplateType.D,
      LearningSpaceTemplateType.T,
      LearningSpaceTemplateType.None,
    ];

    requiredTemplateTypes.forEach((templateType) => {
      expect(theme.insideDecorationModels![templateType]).toBeDefined();
    });
  }

  if (theme.outsideDecorationModels) {
    const requiredTemplateTypes = [
      LearningSpaceTemplateType.L,
      LearningSpaceTemplateType.R6,
      LearningSpaceTemplateType.R8,
      LearningSpaceTemplateType.D,
      LearningSpaceTemplateType.T,
      LearningSpaceTemplateType.None,
    ];

    requiredTemplateTypes.forEach((templateType) => {
      expect(theme.outsideDecorationModels![templateType]).toBeDefined();
    });
  }
}

describe("LearningSpaceTheme - Interface Compliance", () => {
  const allThemeTypes = Object.values(ThemeType);

  test("All theme types return valid theme objects", () => {
    allThemeTypes.forEach((themeType) => {
      const theme = LearningSpaceThemeLookup.getLearningSpaceTheme(themeType);
      expect(theme).toBeDefined();
      expect(theme).not.toBeNull();
    });
  });

  test("All theme objects comply with ILearningSpaceTheme interface", () => {
    allThemeTypes.forEach((themeType) => {
      const theme = LearningSpaceThemeLookup.getLearningSpaceTheme(themeType);
      validateThemeCompliance(theme, `Theme: ${themeType}`);
    });
  });

  test("All themes have defined learning element models", () => {
    allThemeTypes.forEach((themeType) => {
      const theme = LearningSpaceThemeLookup.getLearningSpaceTheme(themeType);
      const elementTypes = Object.keys(theme.learningElementModels);
      expect(elementTypes.length).toBeGreaterThan(0);
    });
  });

  test("All themes have valid ambience model property", () => {
    allThemeTypes.forEach((themeType) => {
      const theme = LearningSpaceThemeLookup.getLearningSpaceTheme(themeType);
      expect(theme.ambienceModel).toBeDefined();
      expect(typeof theme.ambienceModel).toBe("string");
    });
  });

  test("All themes have entry and exit door models defined", () => {
    allThemeTypes.forEach((themeType) => {
      const theme = LearningSpaceThemeLookup.getLearningSpaceTheme(themeType);
      expect(theme.entryDoorModel).toBeDefined();
      expect(theme.exitDoorModel).toBeDefined();
      expect(typeof theme.entryDoorModel).toBe("string");
      expect(typeof theme.exitDoorModel).toBe("string");
    });
  });

  test("All themes have story element model defined", () => {
    allThemeTypes.forEach((themeType) => {
      const theme = LearningSpaceThemeLookup.getLearningSpaceTheme(themeType);
      expect(theme.storyElementModel).toBeDefined();
    });
  });

  test("All themes have models for all supported element types", () => {
    const supportedTypes = [
      LearningElementTypes.h5p,
      LearningElementTypes.primitiveH5P,
      LearningElementTypes.text,
      LearningElementTypes.image,
      LearningElementTypes.video,
      LearningElementTypes.pdf,
      LearningElementTypes.adaptivity,
    ];

    allThemeTypes.forEach((themeType) => {
      const theme = LearningSpaceThemeLookup.getLearningSpaceTheme(themeType);
      supportedTypes.forEach((elementType) => {
        expect(theme.learningElementModels[elementType]).toBeDefined();
        expect(
          theme.learningElementModels[elementType].length,
        ).toBeGreaterThanOrEqual(0);
      });
    });
  });

  test("All themes with decoration maps have complete template type coverage", () => {
    const requiredTemplateTypes = [
      LearningSpaceTemplateType.L,
      LearningSpaceTemplateType.R6,
      LearningSpaceTemplateType.R8,
      LearningSpaceTemplateType.D,
      LearningSpaceTemplateType.T,
      LearningSpaceTemplateType.None,
    ];

    allThemeTypes.forEach((themeType) => {
      const theme = LearningSpaceThemeLookup.getLearningSpaceTheme(themeType);

      if (theme.insideDecorationModels) {
        requiredTemplateTypes.forEach((templateType) => {
          expect(theme.insideDecorationModels![templateType]).toBeDefined();
        });
      }

      if (theme.outsideDecorationModels) {
        requiredTemplateTypes.forEach((templateType) => {
          expect(theme.outsideDecorationModels![templateType]).toBeDefined();
        });
      }
    });
  });

  test("Campus and CampusAB themes return same object", () => {
    const campusTheme = LearningSpaceThemeLookup.getLearningSpaceTheme(
      ThemeType.Campus,
    );
    const campusABTheme = LearningSpaceThemeLookup.getLearningSpaceTheme(
      ThemeType.CampusAB,
    );
    expect(campusTheme).toEqual(campusABTheme);
  });

  test("All themes have consistent property types", () => {
    allThemeTypes.forEach((themeType) => {
      const theme = LearningSpaceThemeLookup.getLearningSpaceTheme(themeType);

      expect(typeof theme.ambienceModel).toBe("string");
      expect(typeof theme.entryDoorModel).toBe("string");
      expect(typeof theme.exitDoorModel).toBe("string");
      expect(typeof theme.learningElementModels).toBe("object");
      expect(theme.storyElementModel).toBeDefined();

      if (theme.wallTexture) {
        expect(typeof theme.wallTexture).toBe("string");
      }
      if (theme.floorTexture) {
        expect(typeof theme.floorTexture).toBe("string");
      }
      if (theme.windowModel) {
        expect(typeof theme.windowModel).toBe("string");
      }
    });
  });

  test("All themes have proper learning element model structure", () => {
    allThemeTypes.forEach((themeType) => {
      const theme = LearningSpaceThemeLookup.getLearningSpaceTheme(themeType);
      const models = theme.learningElementModels;

      Object.entries(models).forEach(([elementType, modelArray]) => {
        expect(Array.isArray(modelArray)).toBe(true);
      });
    });
  });
});
