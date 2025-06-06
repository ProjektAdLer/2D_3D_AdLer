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

  private getUserDataEntity(): UserDataEntity | undefined {
    const userDataEntities =
      this.entityContainer.getEntitiesOfType(UserDataEntity);
    if (userDataEntities.length === 0) {
      this.logger.log(LogLevelTypes.ERROR, "No user data entity found");
      return undefined;
    }
    if (userDataEntities.length > 1) {
      this.logger.log(LogLevelTypes.ERROR, "Multiple user data entities found");
      return undefined;
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
      return undefined;
    }
    return userDataEntity;
  }

  private cloneAvatarConfig(currentConfig: AvatarConfigTO): AvatarConfigTO {
    return Object.assign(new AvatarConfigTO(), structuredClone(currentConfig));
  }

  private randomizeProperties(
    avatarConfig: AvatarConfigTO,
    currentConfig: AvatarConfigTO,
  ): void {
    // Definiere mögliche Werte für die Modelle:
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

    // Randomisiere die konfigurierbaren Felder:
    avatarConfig.hair =
      this.getRandomElement(hairModelValues) || currentConfig.hair;
    avatarConfig.beard =
      this.getRandomElement(beardModelValues) || currentConfig.beard;
    avatarConfig.headgear =
      this.getRandomElement(headgearModelValues) || currentConfig.headgear;
    avatarConfig.glasses =
      this.getRandomElement(glassesModelValues) || currentConfig.glasses;
    avatarConfig.backpack =
      this.getRandomElement(backpackModelValues) || currentConfig.backpack;
    avatarConfig.other =
      this.getRandomElement(otherModelValues) || currentConfig.other;
    avatarConfig.shirt =
      this.getRandomElement(shirtModelValues) || currentConfig.shirt;
    avatarConfig.pants =
      this.getRandomElement(pantsModelValues) || currentConfig.pants;
    avatarConfig.shoes =
      this.getRandomElement(shoesModelValues) || currentConfig.shoes;

    avatarConfig.eyebrows = randomEyebrow?.id || currentConfig.eyebrows;
    avatarConfig.eyes = randomEye?.id || currentConfig.eyes;
    avatarConfig.nose = randomNose?.id || currentConfig.nose;
    avatarConfig.mouth = randomMouth?.id || currentConfig.mouth;

    avatarConfig.skinColor =
      this.getRandomElement(skinColors) || currentConfig.skinColor;
    avatarConfig.hairColor =
      this.getRandomElement(generalColors) || currentConfig.hairColor;
    avatarConfig.shirtColor =
      this.getRandomElement(generalColors) || currentConfig.shirtColor;
    avatarConfig.pantsColor =
      this.getRandomElement(generalColors) || currentConfig.pantsColor;
    avatarConfig.shoesColor =
      this.getRandomElement(generalColors) || currentConfig.shoesColor;

    avatarConfig.roundness = Math.random(); // Zufälliger Wert zwischen 0 und 1
  }

  private calculateDiff(
    currentConfig: AvatarConfigTO,
    newConfig: AvatarConfigTO,
  ): Partial<AvatarConfigTO> {
    const diff: Partial<AvatarConfigTO> = {};
    for (const key in newConfig) {
      if (newConfig.hasOwnProperty(key)) {
        const newValue = newConfig[key as keyof AvatarConfigTO];
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
    return diff;
  }

  private async updateBackendAndNotifyPorts(
    userDataEntity: UserDataEntity,
    newAvatarConfig: AvatarConfigTO,
    diff: Partial<AvatarConfigTO>,
  ): Promise<void> {
    const backendAvatarConfigTO =
      BackendAdapterUtils.convertAvatarConfigToBackendAvatarConfig(
        newAvatarConfig,
      );
    const result = await this.backend.updateAvatarConfig(
      userDataEntity.userToken,
      backendAvatarConfigTO,
    );

    if (result) {
      this.logger.log(
        LogLevelTypes.TRACE,
        `RandomizeAvatarConfigUseCase: Backend updated with randomized avatar config ${JSON.stringify(newAvatarConfig)}`,
      );
      this.avatarPort.onAvatarConfigChanged(
        Object.assign({}, newAvatarConfig), // Sende eine Kopie
        diff,
      );
    } else {
      this.logger.log(
        LogLevelTypes.ERROR,
        "Backend update failed for randomized avatar config",
      );
      userDataEntity.avatar = userDataEntity.avatar; // Rollback zur alten Konfiguration in der Entity
      this.notificationPort.onNotificationTriggered(
        LogLevelTypes.ERROR,
        "Failed to save randomized avatar to backend.",
        NotificationMessages.BACKEND_ERROR,
      );
    }
  }

  public async executeAsync(): Promise<void> {
    const userDataEntity = this.getUserDataEntity();
    if (!userDataEntity || !userDataEntity.avatar) {
      // Die Fehlerbehandlung und Benachrichtigung erfolgt bereits in getUserDataEntity
      return;
    }

    const currentConfig = userDataEntity.avatar;
    const newAvatarConfig = this.cloneAvatarConfig(currentConfig);

    this.randomizeProperties(newAvatarConfig, currentConfig);

    const diff = this.calculateDiff(currentConfig, newAvatarConfig);

    // Aktualisiere die Konfiguration in der UserDataEntity vor dem Backend-Aufruf,
    // damit die Entity den aktuellen Stand widerspiegelt.
    // Bei einem Fehler im Backend wird dies in updateBackendAndNotifyPorts behandelt.
    userDataEntity.avatar = newAvatarConfig;

    await this.updateBackendAndNotifyPorts(
      userDataEntity,
      newAvatarConfig,
      diff,
    );
  }
}
