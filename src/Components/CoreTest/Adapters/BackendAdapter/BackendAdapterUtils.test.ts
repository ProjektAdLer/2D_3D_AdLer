import { AdaptivityElementQuestionDifficultyTypes } from "./../../../Core/Domain/Types/Adaptivity/AdaptivityElementQuestionDifficultyTypes";
import BackendAdapterUtils from "../../../Core/Adapters/BackendAdapter/BackendAdapterUtils";
import { APISpace } from "../../../Core/Adapters/BackendAdapter/Types/AWT";
import { BackendLearningElementTO } from "../../../Core/Application/DataTransferObjects/BackendElementTO";
import { LearningElementModelTypeEnums } from "../../../Core/Domain/LearningElementModels/LearningElementModelTypes";
import { AdaptivityElementActionTypes } from "../../../Core/Domain/Types/Adaptivity/AdaptivityElementActionTypes";
import { ThemeType } from "../../../Core/Domain/Types/ThemeTypes";
import AWT from "../../../Core/Adapters/BackendAdapter/Types/AWT";

describe("BackendAdapterUtils", () => {
  test("mapSpaces ", () => {
    const inputSpaces: APISpace[] = [
      {
        spaceId: 1,
        spaceName: "test",
        spaceDescription: "test",
        spaceGoals: ["test"],
        spaceTemplate: "test",
        spaceTemplateStyle: "test",
        spaceSlotContents: [1],
        requiredPointsToComplete: 1,
        requiredSpacesToEnter: "test",
        spaceStory: {
          introStory: {
            storyTexts: ["test"],
            elementModel: "test",
          },
          outroStory: {
            storyTexts: ["test"],
            elementModel: "test",
          },
        },
      },
    ];
    const inputElements: BackendLearningElementTO[] = [
      {
        id: 1,
        name: "test",
        description: "test",
        goals: ["test"],
        model: LearningElementModelTypeEnums.H5pElementModelTypes.Blackboard,
        type: "h5p",
        value: 1,
      },
    ];

    const result = BackendAdapterUtils["mapSpaces"](inputSpaces, inputElements);

    expect(result).toHaveLength(1);
  });

  test("mapElements returns empty array if given element type is not supported", () => {
    const result = BackendAdapterUtils["mapElements"]([
      {
        $type: "test",
        elementId: 1,
        elementName: "test",
        elementDescription: "test",
        elementGoals: ["test"],
        elementCategory: "test",
        elementFileType: "test",
        elementMaxScore: 1,
        elementModel: "",
      },
    ]);
    expect(result).toHaveLength(0);
  });

  test("mapElements return an element with given model if the modelname is valid", () => {
    const result = BackendAdapterUtils["mapElements"]([
      {
        $type: "LearningElement",
        elementId: 1,
        elementName: "test",
        elementDescription: "test",
        elementGoals: ["test"],
        elementCategory: "h5p",
        elementFileType: "test",
        elementMaxScore: 1,
        elementModel:
          LearningElementModelTypeEnums.H5pElementModelTypes.Blackboard,
      },
    ]);
    let resulting = result[0] as BackendLearningElementTO;
    expect(resulting.model).toBe(
      LearningElementModelTypeEnums.H5pElementModelTypes.Blackboard,
    );
  });

  test("mapElements return an element with undefined model if the modelname is invalid", () => {
    const result = BackendAdapterUtils["mapElements"]([
      {
        $type: "LearningElement",
        elementId: 1,
        elementName: "test",
        elementDescription: "test",
        elementGoals: ["test"],
        elementCategory: "h5p",
        elementFileType: "test",
        elementMaxScore: 1,
        elementModel: "invalid",
      },
    ]);
    let resulting = result[0] as BackendLearningElementTO;
    expect(resulting.model).toBe(undefined);
  });

  test.each([
    ["CommentAction", AdaptivityElementActionTypes.CommentAction],
    ["AdaptivityReferenceAction", AdaptivityElementActionTypes.ReferenceAction],
    [
      "AdaptivityContentReferenceAction",
      AdaptivityElementActionTypes.ContentAction,
    ],
    ["undefined", undefined],
  ])(
    "mapAdaptivityElementAction, when given type %s, returns an action TO with type %s",
    (backendTypeInput, expectedResult) => {
      const result = BackendAdapterUtils["mapAdaptivityAction"]({
        $type: backendTypeInput,
      });
      expect(result.actionType).toBe(expectedResult);
    },
  );

  test.each([
    [undefined, AdaptivityElementQuestionDifficultyTypes.easy],
    [0, AdaptivityElementQuestionDifficultyTypes.easy],
    [100, AdaptivityElementQuestionDifficultyTypes.medium],
    [200, AdaptivityElementQuestionDifficultyTypes.hard],
    [-1, AdaptivityElementQuestionDifficultyTypes.easy],
  ])(
    "mapAdaptivityElementQuestionDifficulty, when given difficulty %s, returns difficulty type %s",
    (difficulty, expectedResult) => {
      const result =
        BackendAdapterUtils["mapAdaptivityElementQuestionDifficulty"](
          difficulty,
        );
      expect(result).toBe(expectedResult);
    },
  );

  // Theme mapping tests
  describe("parseAWT - Theme Mapping", () => {
    test("parseAWT maps CAMPUSASCHAFFENBURG to CampusAB theme", () => {
      const mockAWT: AWT = {
        world: {
          worldName: "Test World",
          theme: "CAMPUSASCHAFFENBURG",
          worldGoals: ["Goal1"],
          worldDescription: "Description",
          spaces: [],
          elements: [],
        },
      } as AWT;

      const result = BackendAdapterUtils["parseAWT"](mockAWT);

      expect(result.theme).toBe(ThemeType.CampusAB);
    });

    test("parseAWT maps CAMPUSAB (shorthand) to CampusAB theme", () => {
      const mockAWT: AWT = {
        world: {
          worldName: "Test World",
          theme: "CAMPUSAB",
          worldGoals: ["Goal1"],
          worldDescription: "Description",
          spaces: [],
          elements: [],
        },
      } as AWT;

      const result = BackendAdapterUtils["parseAWT"](mockAWT);

      expect(result.theme).toBe(ThemeType.CampusAB);
    });

    test("parseAWT maps CAMPUSKEMPTEN to CampusKE theme", () => {
      const mockAWT: AWT = {
        world: {
          worldName: "Test World",
          theme: "CAMPUSKEMPTEN",
          worldGoals: ["Goal1"],
          worldDescription: "Description",
          spaces: [],
          elements: [],
        },
      } as AWT;

      const result = BackendAdapterUtils["parseAWT"](mockAWT);

      expect(result.theme).toBe(ThemeType.CampusKE);
    });

    test("parseAWT maps CAMPUSKE (shorthand) to CampusKE theme", () => {
      const mockAWT: AWT = {
        world: {
          worldName: "Test World",
          theme: "CAMPUSKE",
          worldGoals: ["Goal1"],
          worldDescription: "Description",
          spaces: [],
          elements: [],
        },
      } as AWT;

      const result = BackendAdapterUtils["parseAWT"](mockAWT);

      expect(result.theme).toBe(ThemeType.CampusKE);
    });

    test("parseAWT maps COMPANY theme", () => {
      const mockAWT: AWT = {
        world: {
          worldName: "Test World",
          theme: "COMPANY",
          worldGoals: ["Goal1"],
          worldDescription: "Description",
          spaces: [],
          elements: [],
        },
      } as AWT;

      const result = BackendAdapterUtils["parseAWT"](mockAWT);

      expect(result.theme).toBe(ThemeType.Company);
    });

    test("parseAWT maps SUBURB theme", () => {
      const mockAWT: AWT = {
        world: {
          worldName: "Test World",
          theme: "SUBURB",
          worldGoals: ["Goal1"],
          worldDescription: "Description",
          spaces: [],
          elements: [],
        },
      } as AWT;

      const result = BackendAdapterUtils["parseAWT"](mockAWT);

      expect(result.theme).toBe(ThemeType.Suburb);
    });

    test("parseAWT maps CAMPUS (legacy) theme", () => {
      const mockAWT: AWT = {
        world: {
          worldName: "Test World",
          theme: "CAMPUS",
          worldGoals: ["Goal1"],
          worldDescription: "Description",
          spaces: [],
          elements: [],
        },
      } as AWT;

      const result = BackendAdapterUtils["parseAWT"](mockAWT);

      expect(result.theme).toBe(ThemeType.Campus);
    });

    test("parseAWT defaults to Campus theme for unknown theme", () => {
      const mockAWT: AWT = {
        world: {
          worldName: "Test World",
          theme: "UNKNOWNTHEME",
          worldGoals: ["Goal1"],
          worldDescription: "Description",
          spaces: [],
          elements: [],
        },
      } as AWT;

      const result = BackendAdapterUtils["parseAWT"](mockAWT);

      expect(result.theme).toBe(ThemeType.Campus);
    });

    test("parseAWT defaults to Campus theme for null theme", () => {
      const mockAWT: AWT = {
        world: {
          worldName: "Test World",
          theme: null,
          worldGoals: ["Goal1"],
          worldDescription: "Description",
          spaces: [],
          elements: [],
        },
      } as AWT;

      const result = BackendAdapterUtils["parseAWT"](mockAWT);

      expect(result.theme).toBe(ThemeType.Campus);
    });

    test("parseAWT defaults to Campus theme for undefined theme", () => {
      const mockAWT: AWT = {
        world: {
          worldName: "Test World",
          theme: undefined,
          worldGoals: ["Goal1"],
          worldDescription: "Description",
          spaces: [],
          elements: [],
        },
      } as AWT;

      const result = BackendAdapterUtils["parseAWT"](mockAWT);

      expect(result.theme).toBe(ThemeType.Campus);
    });

    test("parseAWT handles case-insensitive theme names", () => {
      const mockAWT: AWT = {
        world: {
          worldName: "Test World",
          theme: "campusaschaffenburg",
          worldGoals: ["Goal1"],
          worldDescription: "Description",
          spaces: [],
          elements: [],
        },
      } as AWT;

      const result = BackendAdapterUtils["parseAWT"](mockAWT);

      expect(result.theme).toBe(ThemeType.CampusAB);
    });
  });

  describe("mapSpaces - Theme Integration with Space Styles", () => {
    test("mapSpaces applies combined theme for space with spaceTemplateStyle", () => {
      const inputSpaces: APISpace[] = [
        {
          spaceId: 1,
          spaceName: "Learning Area",
          spaceDescription: "test",
          spaceGoals: ["test"],
          spaceTemplate: "test",
          spaceTemplateStyle: "LEARNINGAREA",
          spaceSlotContents: [],
          requiredPointsToComplete: 0,
          requiredSpacesToEnter: "",
        },
      ];

      const result = BackendAdapterUtils["mapSpaces"](
        inputSpaces,
        [],
        ThemeType.CampusAB,
      );

      expect(result[0].templateStyle).toBe(ThemeType.CampusAB_LearningArea);
    });

    test("mapSpaces applies worldTheme when spaceTemplateStyle is undefined", () => {
      const inputSpaces: APISpace[] = [
        {
          spaceId: 1,
          spaceName: "Space",
          spaceDescription: "test",
          spaceGoals: ["test"],
          spaceTemplate: "test",
          spaceTemplateStyle: undefined,
          spaceSlotContents: [],
          requiredPointsToComplete: 0,
          requiredSpacesToEnter: "",
        },
      ];

      const result = BackendAdapterUtils["mapSpaces"](
        inputSpaces,
        [],
        ThemeType.CampusKE,
      );

      expect(result[0].templateStyle).toBe(ThemeType.CampusKE);
    });

    test("mapSpaces applies worldTheme when spaceTemplateStyle is empty", () => {
      const inputSpaces: APISpace[] = [
        {
          spaceId: 1,
          spaceName: "Space",
          spaceDescription: "test",
          spaceGoals: ["test"],
          spaceTemplate: "test",
          spaceTemplateStyle: "",
          spaceSlotContents: [],
          requiredPointsToComplete: 0,
          requiredSpacesToEnter: "",
        },
      ];

      const result = BackendAdapterUtils["mapSpaces"](
        inputSpaces,
        [],
        ThemeType.Company,
      );

      expect(result[0].templateStyle).toBe(ThemeType.Company);
    });

    test("mapSpaces handles legacy standalone themes in spaceTemplateStyle", () => {
      const inputSpaces: APISpace[] = [
        {
          spaceId: 1,
          spaceName: "Space",
          spaceDescription: "test",
          spaceGoals: ["test"],
          spaceTemplate: "test",
          spaceTemplateStyle: "CAMPUSMENSA",
          spaceSlotContents: [],
          requiredPointsToComplete: 0,
          requiredSpacesToEnter: "",
        },
      ];

      const result = BackendAdapterUtils["mapSpaces"](
        inputSpaces,
        [],
        ThemeType.CampusAB,
      );

      expect(result[0].templateStyle).toBe(ThemeType.CampusMensa);
    });

    test("mapSpaces applies different combined themes for different world themes", () => {
      const inputSpaces: APISpace[] = [
        {
          spaceId: 1,
          spaceName: "Space",
          spaceDescription: "test",
          spaceGoals: ["test"],
          spaceTemplate: "test",
          spaceTemplateStyle: "EATINGAREA",
          spaceSlotContents: [],
          requiredPointsToComplete: 0,
          requiredSpacesToEnter: "",
        },
      ];

      const resultCampusAB = BackendAdapterUtils["mapSpaces"](
        inputSpaces,
        [],
        ThemeType.CampusAB,
      );

      const resultCompany = BackendAdapterUtils["mapSpaces"](
        inputSpaces,
        [],
        ThemeType.Company,
      );

      expect(resultCampusAB[0].templateStyle).toBe(
        ThemeType.CampusAB_EatingArea,
      );
      expect(resultCompany[0].templateStyle).toBe(ThemeType.Company_EatingArea);
    });

    test("mapSpaces handles case-insensitive space styles", () => {
      const inputSpaces: APISpace[] = [
        {
          spaceId: 1,
          spaceName: "Space",
          spaceDescription: "test",
          spaceGoals: ["test"],
          spaceTemplate: "test",
          spaceTemplateStyle: "learningarea", // lowercase
          spaceSlotContents: [],
          requiredPointsToComplete: 0,
          requiredSpacesToEnter: "",
        },
      ];

      const result = BackendAdapterUtils["mapSpaces"](
        inputSpaces,
        [],
        ThemeType.Suburb,
      );

      expect(result[0].templateStyle).toBe(ThemeType.Suburb_LearningArea);
    });

    test("mapSpaces falls back to worldTheme for invalid space style combinations", () => {
      const inputSpaces: APISpace[] = [
        {
          spaceId: 1,
          spaceName: "Space",
          spaceDescription: "test",
          spaceGoals: ["test"],
          spaceTemplate: "test",
          spaceTemplateStyle: "INVALIDSTYLE",
          spaceSlotContents: [],
          requiredPointsToComplete: 0,
          requiredSpacesToEnter: "",
        },
      ];

      const result = BackendAdapterUtils["mapSpaces"](
        inputSpaces,
        [],
        ThemeType.CampusAB,
      );

      expect(result[0].templateStyle).toBe(ThemeType.CampusAB);
    });

    test("mapSpaces applies all CampusAB space styles correctly", () => {
      const spaceStyles = [
        "LEARNINGAREA",
        "EATINGAREA",
        "PRESENTATION",
        "FNE",
        "SOCIALAREA",
        "TECHNICALAREA",
      ];

      const expectedThemes = [
        ThemeType.CampusAB_LearningArea,
        ThemeType.CampusAB_EatingArea,
        ThemeType.CampusAB_Presentation,
        ThemeType.CampusAB_FnE,
        ThemeType.CampusAB_SocialArea,
        ThemeType.CampusAB_TechnicalArea,
      ];

      spaceStyles.forEach((style, index) => {
        const inputSpaces: APISpace[] = [
          {
            spaceId: 1,
            spaceName: "Space",
            spaceDescription: "test",
            spaceGoals: ["test"],
            spaceTemplate: "test",
            spaceTemplateStyle: style,
            spaceSlotContents: [],
            requiredPointsToComplete: 0,
            requiredSpacesToEnter: "",
          },
        ];

        const result = BackendAdapterUtils["mapSpaces"](
          inputSpaces,
          [],
          ThemeType.CampusAB,
        );

        expect(result[0].templateStyle).toBe(expectedThemes[index]);
      });
    });
  });

  describe("convertBackendAvatarConfigToAvatarConfig", () => {
    test("should convert BackendAvatarConfigTO to AvatarConfigTO with valid names", () => {
      const backendConfig = {
        eyebrows: "Brows_1",
        eyes: "Neural_Eyes_1",
        nose: "Nose_1",
        mouth: "Mouth_1",
        hair: "hair-medium-ponytail",
        beard: "beard-medium-anchor",
        hairColor: 8,
        headgear: "none",
        glasses: "glasses-browline",
        backpack: "none",
        other: "none",
        shirt: "shirts-sweatshirt",
        shirtColor: 1,
        pants: "pants-jeans",
        pantsColor: 2,
        shoes: "shoes-trainers",
        shoesColor: 3,
        skinColor: 24,
        roundness: 0.5,
      };

      const result =
        BackendAdapterUtils.convertBackendAvatarConfigToAvatarConfig(
          backendConfig as any,
        );

      expect(result.eyebrows).toEqual(expect.any(Number));
      expect(result.eyes).toEqual(expect.any(Number));
      expect(result.nose).toEqual(expect.any(Number));
      expect(result.mouth).toEqual(expect.any(Number));
      expect(result.hairColor).toHaveProperty("id");
      expect(result.shirtColor).toHaveProperty("id");
      expect(result.pantsColor).toHaveProperty("id");
      expect(result.shoesColor).toHaveProperty("id");
      expect(result.skinColor).toHaveProperty("id");
    });

    test("should handle invalid face texture names with fallback to 0", () => {
      const backendConfig = {
        eyebrows: "invalid-eyebrows",
        eyes: "invalid-eyes",
        nose: "invalid-nose",
        mouth: "invalid-mouth",
        hair: "hair-medium-ponytail",
        beard: "none",
        hairColor: 0,
        headgear: "none",
        glasses: "none",
        backpack: "none",
        other: "none",
        shirt: "shirts-sweatshirt",
        shirtColor: 0,
        pants: "pants-jeans",
        pantsColor: 0,
        shoes: "shoes-trainers",
        shoesColor: 0,
        skinColor: 0,
        roundness: 0.5,
      };

      const result =
        BackendAdapterUtils.convertBackendAvatarConfigToAvatarConfig(
          backendConfig as any,
        );

      expect(result.eyebrows).toBe(0);
      expect(result.eyes).toBe(0);
      expect(result.nose).toBe(0);
      expect(result.mouth).toBe(0);
    });

    test("should handle invalid color IDs with fallback to first color", () => {
      const backendConfig = {
        eyebrows: "Brows_1",
        eyes: "Neural_Eyes_1",
        nose: "Nose_1",
        mouth: "Mouth_1",
        hair: "hair-medium-ponytail",
        beard: "none",
        hairColor: 9999, // Invalid ID
        headgear: "none",
        glasses: "none",
        backpack: "none",
        other: "none",
        shirt: "shirts-sweatshirt",
        shirtColor: 9999, // Invalid ID
        pants: "pants-jeans",
        pantsColor: 9999, // Invalid ID
        shoes: "shoes-trainers",
        shoesColor: 9999, // Invalid ID
        skinColor: 9999, // Invalid ID
        roundness: 0.5,
      };

      const result =
        BackendAdapterUtils.convertBackendAvatarConfigToAvatarConfig(
          backendConfig as any,
        );

      expect(result.hairColor).toBeDefined();
      expect(result.hairColor).toHaveProperty("id");
      expect(result.shirtColor).toBeDefined();
      expect(result.shirtColor).toHaveProperty("id");
      expect(result.pantsColor).toBeDefined();
      expect(result.pantsColor).toHaveProperty("id");
      expect(result.shoesColor).toBeDefined();
      expect(result.shoesColor).toHaveProperty("id");
      expect(result.skinColor).toBeDefined();
      expect(result.skinColor).toHaveProperty("id");
    });

    test("should preserve non-face/color properties from backend config", () => {
      const backendConfig = {
        eyebrows: "Brows_1",
        eyes: "Neural_Eyes_1",
        nose: "Nose_1",
        mouth: "Mouth_1",
        hair: "hair-short-curly",
        beard: "beard-full-long",
        hairColor: 5,
        headgear: "headgear-cap",
        glasses: "glasses-oval",
        backpack: "backpack-santapack",
        other: "other-sheriff-star",
        shirt: "shirts-dress",
        shirtColor: 2,
        pants: "pants-cargo",
        pantsColor: 3,
        shoes: "shoes-boots",
        shoesColor: 4,
        skinColor: 16,
        roundness: 0.8,
      };

      const result =
        BackendAdapterUtils.convertBackendAvatarConfigToAvatarConfig(
          backendConfig as any,
        );

      expect(result.hair).toBe("hair-short-curly");
      expect(result.beard).toBe("beard-full-long");
      expect(result.headgear).toBe("headgear-cap");
      expect(result.glasses).toBe("glasses-oval");
      expect(result.backpack).toBe("backpack-santapack");
      expect(result.other).toBe("other-sheriff-star");
      expect(result.shirt).toBe("shirts-dress");
      expect(result.pants).toBe("pants-cargo");
      expect(result.shoes).toBe("shoes-boots");
      expect(result.roundness).toBe(0.8);
    });

    test("should handle valid color IDs correctly", () => {
      const backendConfig = {
        eyebrows: "Brows_1",
        eyes: "Neural_Eyes_1",
        nose: "Nose_1",
        mouth: "Mouth_1",
        hair: "hair-medium-ponytail",
        beard: "none",
        hairColor: 1,
        headgear: "none",
        glasses: "none",
        backpack: "none",
        other: "none",
        shirt: "shirts-sweatshirt",
        shirtColor: 2,
        pants: "pants-jeans",
        pantsColor: 3,
        shoes: "shoes-trainers",
        shoesColor: 4,
        skinColor: 0,
        roundness: 0.5,
      };

      const result =
        BackendAdapterUtils.convertBackendAvatarConfigToAvatarConfig(
          backendConfig as any,
        );

      expect(result.hairColor.id).toBe(1);
      expect(result.shirtColor.id).toBe(2);
      expect(result.pantsColor.id).toBe(3);
      expect(result.shoesColor.id).toBe(4);
      expect(result.skinColor).toBeDefined();
      expect(result.skinColor).toHaveProperty("id");
    });

    test("should find matching skinColor from palette by ID", () => {
      // Test with ID that exists in AvatarSkinColorPalette
      const backendConfig = {
        eyebrows: "Brows_1",
        eyes: "Neural_Eyes_1",
        nose: "Nose_1",
        mouth: "Mouth_1",
        hair: "hair-medium-ponytail",
        beard: "none",
        hairColor: 0,
        headgear: "none",
        glasses: "none",
        backpack: "none",
        other: "none",
        shirt: "shirts-sweatshirt",
        shirtColor: 0,
        pants: "pants-jeans",
        pantsColor: 0,
        shoes: "shoes-trainers",
        shoesColor: 0,
        skinColor: 24, // Should exist in palette
        roundness: 0.5,
      };

      const result =
        BackendAdapterUtils.convertBackendAvatarConfigToAvatarConfig(
          backendConfig as any,
        );

      expect(result.skinColor).toBeDefined();
      expect(result.skinColor).toHaveProperty("id");
      // The skinColor should be a valid color object
      expect(typeof result.skinColor.id).toBe("number");
    });
  });

  describe("convertAvatarConfigToBackendAvatarConfig", () => {
    test("should convert AvatarConfigTO to BackendAvatarConfigTO with valid indices", () => {
      const avatarConfig = {
        eyebrows: 0,
        eyes: 0,
        nose: 0,
        mouth: 0,
        hair: "hair-medium-ponytail",
        beard: "beard-medium-anchor",
        hairColor: { id: 8, hex: "#ffffff" },
        headgear: "none",
        glasses: "glasses-browline",
        backpack: "none",
        other: "none",
        shirt: "shirts-sweatshirt",
        shirtColor: { id: 1, hex: "#000000" },
        pants: "pants-jeans",
        pantsColor: { id: 2, hex: "#0000ff" },
        shoes: "shoes-trainers",
        shoesColor: { id: 3, hex: "#ff0000" },
        skinColor: { id: 24, hex: "#ffaa88" },
        roundness: 0.5,
      };

      const result =
        BackendAdapterUtils.convertAvatarConfigToBackendAvatarConfig(
          avatarConfig as any,
        );

      expect(result.eyebrows).toEqual(expect.any(String));
      expect(result.eyes).toEqual(expect.any(String));
      expect(result.nose).toEqual(expect.any(String));
      expect(result.mouth).toEqual(expect.any(String));
      expect(result.hairColor).toBe(8);
      expect(result.shirtColor).toBe(1);
      expect(result.pantsColor).toBe(2);
      expect(result.shoesColor).toBe(3);
      expect(result.skinColor).toBe(24);
    });

    test("should preserve non-face/color properties from avatar config", () => {
      const avatarConfig = {
        eyebrows: 1,
        eyes: 1,
        nose: 1,
        mouth: 1,
        hair: "hair-short-curly",
        beard: "beard-full-long",
        hairColor: { id: 5, hex: "#ffffff" },
        headgear: "headgear-cap",
        glasses: "glasses-oval",
        backpack: "backpack-santapack",
        other: "other-sheriff-star",
        shirt: "shirts-dress",
        shirtColor: { id: 2, hex: "#000000" },
        pants: "pants-cargo",
        pantsColor: { id: 3, hex: "#0000ff" },
        shoes: "shoes-boots",
        shoesColor: { id: 4, hex: "#ff0000" },
        skinColor: { id: 16, hex: "#ffaa88" },
        roundness: 0.8,
      };

      const result =
        BackendAdapterUtils.convertAvatarConfigToBackendAvatarConfig(
          avatarConfig as any,
        );

      expect(result.hair).toBe("hair-short-curly");
      expect(result.beard).toBe("beard-full-long");
      expect(result.headgear).toBe("headgear-cap");
      expect(result.glasses).toBe("glasses-oval");
      expect(result.backpack).toBe("backpack-santapack");
      expect(result.other).toBe("other-sheriff-star");
      expect(result.shirt).toBe("shirts-dress");
      expect(result.pants).toBe("pants-cargo");
      expect(result.shoes).toBe("shoes-boots");
      expect(result.roundness).toBe(0.8);
    });

    test("should extract color IDs from color objects", () => {
      const avatarConfig = {
        eyebrows: 0,
        eyes: 0,
        nose: 0,
        mouth: 0,
        hair: "hair-medium-ponytail",
        beard: "none",
        hairColor: { id: 10, hex: "#aabbcc" },
        headgear: "none",
        glasses: "none",
        backpack: "none",
        other: "none",
        shirt: "shirts-sweatshirt",
        shirtColor: { id: 11, hex: "#ddeeff" },
        pants: "pants-jeans",
        pantsColor: { id: 12, hex: "#112233" },
        shoes: "shoes-trainers",
        shoesColor: { id: 13, hex: "#445566" },
        skinColor: { id: 14, hex: "#778899" },
        roundness: 0.5,
      };

      const result =
        BackendAdapterUtils.convertAvatarConfigToBackendAvatarConfig(
          avatarConfig as any,
        );

      expect(result.hairColor).toBe(10);
      expect(result.shirtColor).toBe(11);
      expect(result.pantsColor).toBe(12);
      expect(result.shoesColor).toBe(13);
      expect(result.skinColor).toBe(14);
    });

    test("should convert face texture indices to names", () => {
      const avatarConfig = {
        eyebrows: 2,
        eyes: 3,
        nose: 1,
        mouth: 0,
        hair: "hair-medium-ponytail",
        beard: "none",
        hairColor: { id: 0, hex: "#ffffff" },
        headgear: "none",
        glasses: "none",
        backpack: "none",
        other: "none",
        shirt: "shirts-sweatshirt",
        shirtColor: { id: 0, hex: "#000000" },
        pants: "pants-jeans",
        pantsColor: { id: 0, hex: "#0000ff" },
        shoes: "shoes-trainers",
        shoesColor: { id: 0, hex: "#ff0000" },
        skinColor: { id: 0, hex: "#ffaa88" },
        roundness: 0.5,
      };

      const result =
        BackendAdapterUtils.convertAvatarConfigToBackendAvatarConfig(
          avatarConfig as any,
        );

      // Verify that the indices are converted to string names
      expect(typeof result.eyebrows).toBe("string");
      expect(typeof result.eyes).toBe("string");
      expect(typeof result.nose).toBe("string");
      expect(typeof result.mouth).toBe("string");
      expect(result.eyebrows).not.toBe("");
      expect(result.eyes).not.toBe("");
      expect(result.nose).not.toBe("");
      expect(result.mouth).not.toBe("");
    });

    test("should handle roundtrip conversion correctly", () => {
      // Start with backend config
      const originalBackendConfig = {
        eyebrows: "Brows_1",
        eyes: "Neural_Eyes_1",
        nose: "Nose_1",
        mouth: "Mouth_1",
        hair: "hair-medium-ponytail",
        beard: "beard-medium-anchor",
        hairColor: 0,
        headgear: "none",
        glasses: "glasses-browline",
        backpack: "none",
        other: "none",
        shirt: "shirts-sweatshirt",
        shirtColor: 0,
        pants: "pants-jeans",
        pantsColor: 0,
        shoes: "shoes-trainers",
        shoesColor: 0,
        skinColor: 0,
        roundness: 0.5,
      };

      // Convert to avatar config
      const avatarConfig =
        BackendAdapterUtils.convertBackendAvatarConfigToAvatarConfig(
          originalBackendConfig as any,
        );

      // Convert back to backend config
      const resultBackendConfig =
        BackendAdapterUtils.convertAvatarConfigToBackendAvatarConfig(
          avatarConfig,
        );

      // Verify the conversion preserved the essential data
      expect(resultBackendConfig.hair).toBe(originalBackendConfig.hair);
      expect(resultBackendConfig.beard).toBe(originalBackendConfig.beard);
      expect(resultBackendConfig.shirt).toBe(originalBackendConfig.shirt);
      expect(resultBackendConfig.pants).toBe(originalBackendConfig.pants);
      expect(resultBackendConfig.shoes).toBe(originalBackendConfig.shoes);
      expect(resultBackendConfig.roundness).toBe(
        originalBackendConfig.roundness,
      );
      expect(resultBackendConfig.hairColor).toBe(
        originalBackendConfig.hairColor,
      );
      expect(resultBackendConfig.shirtColor).toBe(
        originalBackendConfig.shirtColor,
      );
      expect(resultBackendConfig.pantsColor).toBe(
        originalBackendConfig.pantsColor,
      );
      expect(resultBackendConfig.shoesColor).toBe(
        originalBackendConfig.shoesColor,
      );
    });
  });
});
