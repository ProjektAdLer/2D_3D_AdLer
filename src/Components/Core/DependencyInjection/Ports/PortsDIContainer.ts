import { ContainerModule } from "inversify";
import IAvatarPort from "../../Application/Ports/Interfaces/IAvatarPort";
import ILearningWorldPort from "../../Application/Ports/Interfaces/ILearningWorldPort";
import LearningWorldPort from "../../Application/Ports/LearningWorldPort/LearningWorldPort";
import ILMSPort from "../../Application/Ports/Interfaces/ILMSPort";
import LMSPort from "../../Application/Ports/LMSPort/LMSPort";
import INotificationPort from "../../Application/Ports/Interfaces/INotificationPort";
import UIPort from "../../Application/Ports/NotificationPort/NotificationPort";
import AvatarPresenter from "../../Presentation/Babylon/Avatar/AvatarPresenter";
import PORT_TYPES from "./PORT_TYPES";

const PortsDIContainer = new ContainerModule((bind) => {
  bind<ILearningWorldPort>(PORT_TYPES.ILearningWorldPort)
    .to(LearningWorldPort)
    .inSingletonScope();

  bind<ILMSPort>(PORT_TYPES.ILMSPort).to(LMSPort).inSingletonScope();

  bind<IAvatarPort>(PORT_TYPES.IAvatarPort)
    .to(AvatarPresenter)
    .inSingletonScope();

  bind<INotificationPort>(PORT_TYPES.INotificationPort)
    .to(UIPort)
    .inSingletonScope();
});

export default PortsDIContainer;
