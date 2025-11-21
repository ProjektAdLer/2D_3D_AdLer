import { ContainerModule } from "inversify";
import IAvatarPort from "../../Application/Ports/Interfaces/IAvatarPort";
import ILearningWorldPort from "../../Application/Ports/Interfaces/ILearningWorldPort";
import LearningWorldPort from "../../Application/Ports/LearningWorldPort/LearningWorldPort";
import ILMSPort from "../../Application/Ports/Interfaces/ILMSPort";
import LMSPort from "../../Application/Ports/LMSPort/LMSPort";
import INotificationPort from "../../Application/Ports/Interfaces/INotificationPort";
import NotificationPort from "../../Application/Ports/NotificationPort/NotificationPort";
import PORT_TYPES from "./PORT_TYPES";
import AvatarPort from "../../Application/Ports/AvatarPort/AvatarPort";
import ISettingsPort from "../../Application/Ports/Interfaces/ISettingsPort";
import SettingsPort from "../../Application/Ports/SettingsPort/SettingsPort";
import IWorldManagementPort from "../../Application/Ports/Interfaces/IWorldManagementPort";
import WorldManagementPort from "../../Application/Ports/WorldManagementPort/WorldManagementPort";
import IWorldStorageAdapter from "../../Application/Ports/WorldStoragePort/IWorldStorageAdapter";
import WorldStorageAdapter from "../../Adapters/WorldStorageAdapter/WorldStorageAdapter";
import IMBZParserAdapter from "../../Application/Ports/MBZParserPort/IMBZParserAdapter";
import MBZParserAdapter from "../../Adapters/MBZParserAdapter/MBZParserAdapter";

const PortsDIContainer = new ContainerModule((bind) => {
  bind<ILearningWorldPort>(PORT_TYPES.ILearningWorldPort)
    .to(LearningWorldPort)
    .inSingletonScope();

  bind<ILMSPort>(PORT_TYPES.ILMSPort).to(LMSPort).inSingletonScope();

  bind<IAvatarPort>(PORT_TYPES.IAvatarPort).to(AvatarPort).inSingletonScope();

  bind<INotificationPort>(PORT_TYPES.INotificationPort)
    .to(NotificationPort)
    .inSingletonScope();

  bind<ISettingsPort>(PORT_TYPES.ISettingsPort)
    .to(SettingsPort)
    .inSingletonScope();

  bind<IWorldManagementPort>(PORT_TYPES.IWorldManagementPort)
    .to(WorldManagementPort)
    .inSingletonScope();

  bind<IWorldStorageAdapter>(PORT_TYPES.IWorldStorageAdapter)
    .to(WorldStorageAdapter)
    .inSingletonScope();

  bind<IMBZParserAdapter>(PORT_TYPES.IMBZParserAdapter)
    .to(MBZParserAdapter)
    .inSingletonScope();
});

export default PortsDIContainer;
