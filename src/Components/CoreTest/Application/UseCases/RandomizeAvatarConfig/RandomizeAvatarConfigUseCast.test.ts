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
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import type IUpdateAvatarConfigUseCase from "../../../../Core/Application/UseCases/UpdateAvatarConfig/IUpdateAvatarConfigUseCase";
import type ILoggerPort from "../../../../Core/Application/Ports/Interfaces/ILoggerPort";
import type INotificationPort from "../../../../Core/Application/Ports/Interfaces/INotificationPort";
import type IAvatarPort from "../../../../Core/Application/Ports/Interfaces/IAvatarPort";
import { LogLevelTypes } from "../../../../Core/Domain/Types/LogLevelTypes";

// Mock dependencies
const mockLogger: ILoggerPort = {
  log: jest.fn(),
  setLogLevel: jest.fn(),
  setDefaultContext: jest.fn(),
  getDefaultContext: jest.fn(() => ({})),
  getLogLevel: jest.fn(() => LogLevelTypes.NONE),
};

const mockNotificationPort: INotificationPort = {
  onNotificationTriggered: jest.fn(),
  registerAdapter: jest.fn(),
  unregisterAdapter: jest.fn(),
  name: jest.fn(() => "MockNotificationPort"),
};

const mockAvatarPort: IAvatarPort = {
  onAvatarConfigChanged: jest.fn(),
  onAvatarConfigLoaded: jest.fn(),
  registerAdapter: jest.fn(),
  unregisterAdapter: jest.fn(),
  name: jest.fn(() => "MockAvatarPort"),
};

const mockUpdateAvatarConfigUseCase: IUpdateAvatarConfigUseCase = {
  executeAsync: jest.fn(),
};

// Mock CoreDIContainer
jest.mock("~DependencyInjection/CoreDIContainer", () => ({
  get: jest.fn(),
}));

// Helper to get all possible model values including "none"
const getPossibleValuesWithNone = (modelEnum: object) => [
  ...Object.values(modelEnum),
  ...Object.values(AvatarNoneModel), // AvatarNoneModel.None is "none"
];

describe("RandomizeAvatarConfigUseCase", () => {
  let randomizeAvatarConfigUseCase: RandomizeAvatarConfigUseCase;

  beforeEach(() => {
    jest.clearAllMocks();

    (CoreDIContainer.get as jest.Mock).mockImplementation((type: symbol) => {
      if (type === USECASE_TYPES.IUpdateAvatarConfigUseCase) {
        return mockUpdateAvatarConfigUseCase;
      }
      return undefined;
    });

    randomizeAvatarConfigUseCase = new RandomizeAvatarConfigUseCase(
      mockLogger,
      mockNotificationPort,
      mockAvatarPort,
    );
  });

  describe("executeAsync", () => {
    it("should call IUpdateAvatarConfigUseCase.executeAsync with a new AvatarConfigTO", async () => {
      await randomizeAvatarConfigUseCase.executeAsync();

      expect(CoreDIContainer.get).toHaveBeenCalledWith(
        USECASE_TYPES.IUpdateAvatarConfigUseCase,
      );
      expect(mockUpdateAvatarConfigUseCase.executeAsync).toHaveBeenCalledTimes(
        1,
      );
      expect(mockUpdateAvatarConfigUseCase.executeAsync).toHaveBeenCalledWith(
        expect.any(AvatarConfigTO),
      );
    });

    it("should populate AvatarConfigTO with valid randomized values", async () => {
      await randomizeAvatarConfigUseCase.executeAsync();

      const capturedConfig = (
        mockUpdateAvatarConfigUseCase.executeAsync as jest.Mock
      ).mock.calls[0][0] as AvatarConfigTO;

      // Check model properties
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
      // OAvatarOtherModels is often empty in domain data, resulting in "none" if not explicitly set by randomizeProperties.
      // If AvatarConfigTO initializes `other` to "none" or randomizeProperties sets it to "none" on empty OAvatarOtherModels, this test passes.
      // If `other` is left undefined by both, and OAvatarOtherModels is empty, this test will fail (correctly).
      expect(getPossibleValuesWithNone(OAvatarOtherModels)).toContain(
        capturedConfig.other,
      );

      expect(Object.values(OAvatarShirtModels)).toContain(capturedConfig.shirt);
      expect(Object.values(OAvatarPantsModels)).toContain(capturedConfig.pants);
      expect(Object.values(OAvatarShoesModels)).toContain(capturedConfig.shoes);

      // Check texture ID properties
      const assertTextureId = (id: number, textureArray: { id: number }[]) => {
        expect(typeof id).toBe("number");
        if (textureArray.length > 0) {
          expect(textureArray.map((t) => t.id)).toContain(id);
        } else {
          expect(id).toBe(0); // Fallback value (e.g., from `randomElement?.id ?? 0`)
        }
      };

      assertTextureId(capturedConfig.eyebrows, AvatarEyeBrowTexture);
      assertTextureId(capturedConfig.eyes, AvatarEyeTexture);
      assertTextureId(capturedConfig.nose, AvatarNoseTexture);
      assertTextureId(capturedConfig.mouth, AvatarMouthTexture);

      // Check color properties
      expect(AvatarSkinColorPalette).toContain(capturedConfig.skinColor);
      expect(AvatarColorPalette).toContain(capturedConfig.hairColor);
      expect(AvatarColorPalette).toContain(capturedConfig.shirtColor);
      expect(AvatarColorPalette).toContain(capturedConfig.pantsColor);
      expect(AvatarColorPalette).toContain(capturedConfig.shoesColor);

      // Check roundness
      expect(typeof capturedConfig.roundness).toBe("number");
      expect(capturedConfig.roundness).toBeGreaterThanOrEqual(0);
      expect(capturedConfig.roundness).toBeLessThanOrEqual(1);

      // Ensure all properties are defined (or explicitly "none" or 0 for IDs if textures are empty)
      for (const key in capturedConfig) {
        if (Object.prototype.hasOwnProperty.call(capturedConfig, key)) {
          const value = capturedConfig[key as keyof AvatarConfigTO];
          if (typeof value === "string" || typeof value === "number") {
            expect(value).toBeDefined();
          } else if (typeof value === "object" && value !== null) {
            // Colors are objects
            expect(value).toBeDefined();
            expect(typeof value.id).toBe("number"); // Basic check for color object structure
            expect(typeof value.hexColor).toBe("string");
          } else if (value === null && key === "roundness") {
            // roundness could be null if not set, but test expects number
            // This case should ideally not be hit if roundness is always set
          } else if (value === null) {
            // Allow null for properties that might not be set if not applicable,
            // but specific checks above should cover most cases.
            // This depends on AvatarConfigTO's strictness.
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

  // The notifyAvatarSubscribers method is commented out in the source code.
  // If it were active, tests for it would go here.
});
