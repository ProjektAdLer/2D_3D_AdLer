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
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import { LogLevelTypes } from "src/Components/Core/Domain/Types/LogLevelTypes";
import type ILoggerPort from "../../Ports/Interfaces/ILoggerPort";
import type INotificationPort from "../../Ports/Interfaces/INotificationPort";
import type IAvatarPort from "../../Ports/Interfaces/IAvatarPort";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer"; // falls vorhanden
import IUpdateAvatarConfigUseCase from "../UpdateAvatarConfig/IUpdateAvatarConfigUseCase";

@injectable()
export default class RandomizeAvatarConfigUseCase
  implements IRandomizeAvatarConfigUseCase
{
  constructor(
    @inject(CORE_TYPES.ILogger)
    private logger: ILoggerPort,
    @inject(PORT_TYPES.INotificationPort)
    private notificationPort: INotificationPort,
    @inject(PORT_TYPES.IAvatarPort)
    private avatarPort: IAvatarPort,
  ) {}

  private getRandomElement<T>(array: readonly T[]): T | undefined {
    if (!array || array.length === 0) {
      this.logger.log(
        LogLevelTypes.ERROR,
        "Attempted to get element from empty array.",
      );
      return undefined;
    }
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }

  public async executeAsync(): Promise<void> {
    // Erstelle eine komplett neue zufällige Konfiguration:
    const newAvatarConfig = new AvatarConfigTO();
    this.randomizeProperties(newAvatarConfig);

    // Anstatt nur notifyAvatarSubscribers aufzurufen,
    // rufe den UpdateAvatarConfigUseCase auf um das zentrale Model zu aktualisieren:
    CoreDIContainer.get<IUpdateAvatarConfigUseCase>(
      USECASE_TYPES.IUpdateAvatarConfigUseCase,
    ).executeAsync(newAvatarConfig);

    // Optional: zusätzliche Notify - falls über den Port noch separate
    // Preview-Updates abgesendet werden sollen:
    // this.notifyAvatarSubscribers(newAvatarConfig);
  }

  private randomizeProperties(avatarConfig: AvatarConfigTO): void {
    // Definiere mögliche Werte für Modelle:
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

    // Wähle zufällige Gesichtszüge:
    const randomEyebrow = this.getRandomElement(AvatarEyeBrowTexture);
    const randomEye = this.getRandomElement(AvatarEyeTexture);
    const randomNose = this.getRandomElement(AvatarNoseTexture);
    const randomMouth = this.getRandomElement(AvatarMouthTexture);

    // Farben:
    const skinColors: AvatarColor[] = AvatarSkinColorPalette;
    const generalColors: AvatarColor[] = AvatarColorPalette;

    // Setze alle Felder auf einen zufälligen Wert:
    avatarConfig.hair = this.getRandomElement(hairModelValues) || "none";
    avatarConfig.beard = this.getRandomElement(beardModelValues) || "none";
    avatarConfig.headgear =
      this.getRandomElement(headgearModelValues) || "none";
    avatarConfig.glasses = this.getRandomElement(glassesModelValues) || "none";
    avatarConfig.backpack =
      this.getRandomElement(backpackModelValues) || "none";
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

  private notifyAvatarSubscribers(newAvatarConfig: AvatarConfigTO): void {
    // Logge die finale Konfiguration
    this.logger.log(
      LogLevelTypes.TRACE,
      `RandomizeAvatarConfigUseCase: Final Avatar Config: ${JSON.stringify(newAvatarConfig)}`,
    );
    console.log(newAvatarConfig);

    // Da alle Felder neu gesetzt werden, entspricht das diff einfach der neuen Konfiguration.
    const diff: Partial<AvatarConfigTO> = { ...newAvatarConfig };

    // Übergib die neue Konfiguration und das Diff an alle Adapter über den AvatarPort.
    this.avatarPort.onAvatarConfigChanged(newAvatarConfig, diff);
  }
}
