import RandomizeAvatarConfigUseCase from "../../../../Core/Application/UseCases/RandomizeAvatarConfig/RandomizeAvatarConfigUseCase";
import AvatarConfigTO from "../../../../Core/Application/DataTransferObjects/AvatarConfigTO";
import {
  AvatarNoneModel,
  OAvatarHairModels,
  OAvatarBeardModels,
  OAvatarHeadGearModels,
  OAvatarGlassesModels,
  OAvatarBackpackModels,
  OAvatarOtherModels,
  OAvatarPantsModels,
  OAvatarShirtModels,
  OAvatarShoesModels,
} from "../../../../Core/Domain/AvatarModels/AvatarModelTypes";
import {
  AvatarEyeBrowTexture,
  AvatarEyeTexture,
  AvatarNoseTexture,
  AvatarMouthTexture,
} from "../../../../Core/Domain/AvatarModels/AvatarFaceUVTexture";
import AvatarColorPalette, {
  AvatarColor,
} from "../../../../Core/Domain/AvatarModels/AvatarColorPalette";
import AvatarSkinColorPalette from "../../../../Core/Domain/AvatarModels/AvatarSkinColorPalette";
import type ILoggerPort from "../../../../Core/Application/Ports/Interfaces/ILoggerPort";
import { LogLevelTypes } from "../../../../Core/Domain/Types/LogLevelTypes";

const mockLogger: ILoggerPort = {
  log: jest.fn(),
  exportLog: jest.fn(),
};

// Helper to get all possible model values including "none"
const getPossibleValuesWithNone = (modelEnum: object) => [
  ...Object.values(modelEnum),
  ...Object.values(AvatarNoneModel), // AvatarNoneModel.None is "none"
];

describe("RandomizeAvatarConfigUseCase", () => {
  let randomizeAvatarConfigUseCase: RandomizeAvatarConfigUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    randomizeAvatarConfigUseCase = new RandomizeAvatarConfigUseCase(mockLogger);
  });

  describe("executeAsync", () => {
    it("should return a new AvatarConfigTO with randomized properties", async () => {
      const result = await randomizeAvatarConfigUseCase.executeAsync();
      expect(result).toBeInstanceOf(AvatarConfigTO);
    });

    it("should populate AvatarConfigTO with valid randomized values", async () => {
      const capturedConfig = await randomizeAvatarConfigUseCase.executeAsync();

      expect(getPossibleValuesWithNone(OAvatarHairModels)).toContain(
        capturedConfig.hair,
      );
      expect(getPossibleValuesWithNone(OAvatarBeardModels)).toContain(
        capturedConfig.beard,
      );
      expect(getPossibleValuesWithNone(OAvatarHeadGearModels)).toContain(
        capturedConfig.headgear,
      );
      expect(getPossibleValuesWithNone(OAvatarGlassesModels)).toContain(
        capturedConfig.glasses,
      );
      expect(getPossibleValuesWithNone(OAvatarBackpackModels)).toContain(
        capturedConfig.backpack,
      );
      expect(getPossibleValuesWithNone(OAvatarOtherModels)).toContain(
        capturedConfig.other,
      );

      expect(Object.values(OAvatarShirtModels)).toContain(capturedConfig.shirt);
      expect(Object.values(OAvatarPantsModels)).toContain(capturedConfig.pants);
      expect(Object.values(OAvatarShoesModels)).toContain(capturedConfig.shoes);

      const assertTextureId = (id: number, textureArray: { id: number }[]) => {
        expect(typeof id).toBe("number");
        if (textureArray.length > 0) {
          expect(textureArray.map((t) => t.id)).toContain(id);
        } else {
          expect(id).toBe(0); // Fallback value
        }
      };

      assertTextureId(capturedConfig.eyebrows, AvatarEyeBrowTexture);
      assertTextureId(capturedConfig.eyes, AvatarEyeTexture);
      assertTextureId(capturedConfig.nose, AvatarNoseTexture);
      assertTextureId(capturedConfig.mouth, AvatarMouthTexture);

      expect(AvatarSkinColorPalette).toContain(capturedConfig.skinColor);
      expect(AvatarColorPalette).toContain(capturedConfig.hairColor);
      expect(AvatarColorPalette).toContain(capturedConfig.shirtColor);
      expect(AvatarColorPalette).toContain(capturedConfig.pantsColor);
      expect(AvatarColorPalette).toContain(capturedConfig.shoesColor);

      expect(typeof capturedConfig.roundness).toBe("number");
      expect(capturedConfig.roundness).toBeGreaterThanOrEqual(0);
      expect(capturedConfig.roundness).toBeLessThanOrEqual(1);

      for (const key in capturedConfig) {
        if (Object.prototype.hasOwnProperty.call(capturedConfig, key)) {
          const value = capturedConfig[key as keyof AvatarConfigTO];
          if (typeof value === "string" || typeof value === "number") {
            expect(value).toBeDefined();
          } else if (typeof value === "object" && value !== null) {
            expect(value).toBeDefined();
            expect(typeof (value as AvatarColor).id).toBe("number");
            expect(typeof (value as AvatarColor).hexColor).toBe("string");
          } else if (value === null) {
            // No property should be null based on current randomization logic
            fail(`Property ${key} was unexpectedly null.`);
          }
        }
      }
    });
  });

  describe("getRandomElement (private method test)", () => {
    it("should return an element from the array", () => {
      const array = [1, 2, 3, 4, 5];
      // @ts-ignore // Accessing private method for testing
      const element = randomizeAvatarConfigUseCase.getRandomElement(array);
      expect(array).toContain(element);
    });

    it("should return undefined and log an error if the array is empty", () => {
      const array: any[] = [];
      // @ts-ignore // Accessing private method for testing
      const element = randomizeAvatarConfigUseCase.getRandomElement(array);
      expect(element).toBeUndefined();
      expect(mockLogger.log).toHaveBeenCalledWith(
        LogLevelTypes.ERROR,
        "Attempted to get element from empty array.",
      );
    });

    it("should return undefined and log an error if the array is null", () => {
      // @ts-ignore // Accessing private method for testing
      const element = randomizeAvatarConfigUseCase.getRandomElement(
        null as any,
      );
      expect(element).toBeUndefined();
      expect(mockLogger.log).toHaveBeenCalledWith(
        LogLevelTypes.ERROR,
        "Attempted to get element from empty array.",
      );
    });

    it("should return undefined and log an error if the array is undefined", () => {
      // @ts-ignore // Accessing private method for testing
      const element = randomizeAvatarConfigUseCase.getRandomElement(
        undefined as any,
      );
      expect(element).toBeUndefined();
      expect(mockLogger.log).toHaveBeenCalledWith(
        LogLevelTypes.ERROR,
        "Attempted to get element from empty array.",
      );
    });
  });
});
