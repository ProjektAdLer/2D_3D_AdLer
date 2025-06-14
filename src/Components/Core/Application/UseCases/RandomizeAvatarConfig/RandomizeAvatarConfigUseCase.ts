import { inject, injectable } from "inversify";
import IRandomizeAvatarConfigUseCase from "./IRandomizeAvatarConfigUseCase";
import AvatarConfigTO from "../../DataTransferObjects/AvatarConfigTO";
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
} from "../../../Domain/AvatarModels/AvatarModelTypes";
import {
  AvatarEyeBrowTexture,
  AvatarEyeTexture,
  AvatarNoseTexture,
  AvatarMouthTexture,
} from "../../../Domain/AvatarModels/AvatarFaceUVTexture";
import AvatarColorPalette, {
  AvatarColor,
} from "../../../Domain/AvatarModels/AvatarColorPalette";
import AvatarSkinColorPalette from "../../../Domain/AvatarModels/AvatarSkinColorPalette";

import CORE_TYPES from "~DependencyInjection/CoreTypes";
import { LogLevelTypes } from "src/Components/Core/Domain/Types/LogLevelTypes";
import type ILoggerPort from "../../Ports/Interfaces/ILoggerPort";

@injectable()
export default class RandomizeAvatarConfigUseCase
  implements IRandomizeAvatarConfigUseCase
{
  constructor(
    @inject(CORE_TYPES.ILogger)
    private logger: ILoggerPort,
  ) {}

  private getRandomElement<T>(array: readonly T[]): T | undefined {
    if (!array || array.length === 0) {
      this.logger.log(
        LogLevelTypes.ERROR,
        "Attempted to get element from empty array.",
      );
      return undefined;
    }
    const randomIndex = Math.round(Math.random() * (array.length - 1));
    return array[randomIndex];
  }

  public async executeAsync(): Promise<AvatarConfigTO> {
    const newAvatarConfig = new AvatarConfigTO();
    this.randomizeProperties(newAvatarConfig);
    return newAvatarConfig;
  }

  private randomizeProperties(avatarConfig: AvatarConfigTO): void {
    const hairModelValues = [
      ...Object.values(OAvatarHairModels),
      ...Object.values(AvatarNoneModel),
    ];
    const beardModelValues = [
      ...Object.values(OAvatarBeardModels),
      ...Object.values(AvatarNoneModel),
    ];
    const headgearModelValues = [
      ...Object.values(OAvatarHeadGearModels),
      ...Object.values(AvatarNoneModel),
    ];
    const glassesModelValues = [
      ...Object.values(OAvatarGlassesModels),
      ...Object.values(AvatarNoneModel),
    ];
    const backpackModelValues = [
      ...Object.values(OAvatarBackpackModels),
      ...Object.values(AvatarNoneModel),
    ];
    const otherModelValues = [
      ...Object.values(OAvatarOtherModels),
      ...Object.values(AvatarNoneModel),
    ];
    const pantsModelValues = Object.values(OAvatarPantsModels);
    const shirtModelValues = Object.values(OAvatarShirtModels);
    const shoesModelValues = Object.values(OAvatarShoesModels);

    const randomEyebrow = this.getRandomElement(AvatarEyeBrowTexture);
    const randomEye = this.getRandomElement(AvatarEyeTexture);
    const randomNose = this.getRandomElement(AvatarNoseTexture);
    const randomMouth = this.getRandomElement(AvatarMouthTexture);

    const skinColors: AvatarColor[] = AvatarSkinColorPalette;
    const generalColors: AvatarColor[] = AvatarColorPalette;

    // Randomize the avatar configuration
    avatarConfig.hair = this.getRandomElement(hairModelValues) || "none";
    avatarConfig.beard = this.getRandomElement(beardModelValues) || "none";
    avatarConfig.headgear =
      this.getRandomElement(headgearModelValues) || "none";
    avatarConfig.glasses = this.getRandomElement(glassesModelValues) || "none";
    avatarConfig.backpack =
      this.getRandomElement(backpackModelValues) || "none";
    avatarConfig.other = this.getRandomElement(otherModelValues) || "none";
    avatarConfig.shirt =
      this.getRandomElement(shirtModelValues) || shirtModelValues[0];
    avatarConfig.pants =
      this.getRandomElement(pantsModelValues) || pantsModelValues[0];
    avatarConfig.shoes =
      this.getRandomElement(shoesModelValues) || shoesModelValues[0];

    avatarConfig.eyebrows = randomEyebrow?.id ?? 0;
    avatarConfig.eyes = randomEye?.id ?? 0;
    avatarConfig.nose = randomNose?.id ?? 0;
    avatarConfig.mouth = randomMouth?.id ?? 0;

    avatarConfig.skinColor = this.getRandomElement(skinColors) || skinColors[0];
    avatarConfig.hairColor =
      this.getRandomElement(generalColors) || generalColors[0];
    avatarConfig.shirtColor =
      this.getRandomElement(generalColors) || generalColors[0];
    avatarConfig.pantsColor =
      this.getRandomElement(generalColors) || generalColors[0];
    avatarConfig.shoesColor =
      this.getRandomElement(generalColors) || generalColors[0];

    avatarConfig.roundness = Math.random(); // Zufälliger Wert zwischen 0 und 1
  }
}
