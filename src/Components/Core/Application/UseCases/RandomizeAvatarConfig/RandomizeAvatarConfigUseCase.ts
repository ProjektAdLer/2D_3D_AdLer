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
import AvatarColorPalette, {
  AvatarColor,
} from "../../../Domain/AvatarModels/AvatarColorPalette";
import AvatarSkinColorPalette from "../../../Domain/AvatarModels/AvatarSkinColorPalette";

// Statt RepositoryTypes und EventService – analog zu LoadAvatarConfigUseCase und SaveAvatarConfigUseCase:
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import { LogLevelTypes } from "src/Components/Core/Domain/Types/LogLevelTypes";
import type ILoggerPort from "../../Ports/Interfaces/ILoggerPort";
import type INotificationPort from "../../Ports/Interfaces/INotificationPort";
import { NotificationMessages } from "src/Components/Core/Domain/Types/NotificationMessages";
import type IEntityContainer from "src/Components/Core/Domain/EntityContainer/IEntityContainer";
import type IBackendPort from "../../Ports/Interfaces/IBackendPort";
import BackendAdapterUtils from "src/Components/Core/Adapters/BackendAdapter/BackendAdapterUtils";
import UserDataEntity from "src/Components/Core/Domain/Entities/UserDataEntity";
import type IAvatarPort from "../../Ports/Interfaces/IAvatarPort";

@injectable()
export default class RandomizeAvatarConfigUseCase
  implements IRandomizeAvatarConfigUseCase
{
  constructor(
    @inject(CORE_TYPES.ILogger)
    private logger: ILoggerPort,
    @inject(PORT_TYPES.INotificationPort)
    private notificationPort: INotificationPort,
    @inject(CORE_TYPES.IEntityContainer)
    private entityContainer: IEntityContainer,
    @inject(CORE_TYPES.IBackendAdapter)
    private backend: IBackendPort,
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
    // 1. Hole die UserDataEntity über den EntityContainer:
    console.log(
      "RandomizeAvatarConfigUseCase: Executing randomization of avatar config...",
    );
    const userDataEntities =
      this.entityContainer.getEntitiesOfType(UserDataEntity);
    if (userDataEntities.length === 0) {
      this.logger.log(LogLevelTypes.ERROR, "No user data entity found");
      return;
    } else if (userDataEntities.length > 1) {
      this.logger.log(LogLevelTypes.ERROR, "Multiple user data entities found");
      return;
    }

    const userDataEntity = userDataEntities[0];
    if (!userDataEntity.avatar) {
      this.logger.log(
        LogLevelTypes.ERROR,
        "No avatar config found in user data entity",
      );
      this.notificationPort.onNotificationTriggered(
        LogLevelTypes.ERROR,
        "No avatar config found to randomize.",
        NotificationMessages.ELEMENT_NOT_FOUND,
      );
      return;
    }

    // 2. Erstelle einen strukturierten Klon der vorhandenen Konfiguration:
    const currentConfig: AvatarConfigTO = userDataEntity.avatar;
    const avatarConfig = Object.assign(
      new AvatarConfigTO(),
      structuredClone(currentConfig),
    );

    // 3. Definiere mögliche Werte für die Modelle:
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

    // 4. Definiere die Farbpaletten:
    const skinColors: AvatarColor[] = AvatarSkinColorPalette;
    const generalColors: AvatarColor[] = AvatarColorPalette;

    // 5. Randomisiere die konfigurierbaren Felder:
    avatarConfig.hair =
      this.getRandomElement(hairModelValues) || avatarConfig.hair;
    avatarConfig.beard =
      this.getRandomElement(beardModelValues) || avatarConfig.beard;
    avatarConfig.headgear =
      this.getRandomElement(headgearModelValues) || avatarConfig.headgear;
    avatarConfig.glasses =
      this.getRandomElement(glassesModelValues) || avatarConfig.glasses;
    avatarConfig.backpack =
      this.getRandomElement(backpackModelValues) || avatarConfig.backpack;
    avatarConfig.other =
      this.getRandomElement(otherModelValues) || avatarConfig.other;
    avatarConfig.shirt =
      this.getRandomElement(shirtModelValues) || avatarConfig.shirt;
    avatarConfig.pants =
      this.getRandomElement(pantsModelValues) || avatarConfig.pants;
    avatarConfig.shoes =
      this.getRandomElement(shoesModelValues) || avatarConfig.shoes;
    avatarConfig.skinColor =
      this.getRandomElement(skinColors) || avatarConfig.skinColor;
    avatarConfig.hairColor =
      this.getRandomElement(generalColors) || avatarConfig.hairColor;
    avatarConfig.shirtColor =
      this.getRandomElement(generalColors) || avatarConfig.shirtColor;
    avatarConfig.pantsColor =
      this.getRandomElement(generalColors) || avatarConfig.pantsColor;
    avatarConfig.shoesColor =
      this.getRandomElement(generalColors) || avatarConfig.shoesColor;
    avatarConfig.roundness = Math.random(); // Zufälliger Wert zwischen 0 und 1

    // 6. (Optional) Berechne ein Diff zwischen alter und neuer Konfiguration:
    const diff: Partial<AvatarConfigTO> = {};
    for (const key in avatarConfig) {
      if (avatarConfig.hasOwnProperty(key)) {
        const newValue = avatarConfig[key as keyof AvatarConfigTO];
        const oldValue = currentConfig[key as keyof AvatarConfigTO];
        if (typeof newValue === "object" && newValue !== null) {
          if (JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
            diff[key as keyof AvatarConfigTO] = newValue as any;
          }
        } else if (newValue !== oldValue) {
          diff[key as keyof AvatarConfigTO] = newValue as any;
        }
      }
    }

    // 7. Aktualisiere die Konfiguration in der UserDataEntity:
    userDataEntity.avatar = avatarConfig;

    // 8. Übertrage die neue Konfiguration an das Backend:
    const backendAvatarConfigTO =
      BackendAdapterUtils.convertAvatarConfigToBackendAvatarConfig(
        avatarConfig,
      );
    const result = await this.backend.updateAvatarConfig(
      userDataEntity.userToken,
      backendAvatarConfigTO,
    );
    if (result) {
      this.logger.log(
        LogLevelTypes.TRACE,
        `RandomizeAvatarConfigUseCase: Backend updated with randomized avatar config ${JSON.stringify(avatarConfig)}`,
      );
      // 9. Schicke die aktualisierte Konfiguration an den AvatarPort, damit die 3D-Szene aktualisiert wird:
      console.log(
        "RandomizeAvatarConfigUseCase: Sending new avatar config and diff to AvatarPort",
        userDataEntity.avatar,
        diff,
      );
      this.avatarPort.onAvatarConfigChanged(
        Object.assign({}, userDataEntity.avatar),
        diff,
      );
    } else {
      this.logger.log(
        LogLevelTypes.ERROR,
        "Backend update failed for randomized avatar config",
      );
    }
  }
}
