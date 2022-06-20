import { ContainerModule } from "inversify";
import ILearningRoomPort from "../../Application/CalculateTotalRoomScore/ILearningRoomPort";
import ILearningElementPort from "../../Application/LearningElementStarted/ILearningElementPort";
import IAvatarPort from "../../Application/LoadAvatar/IAvatarPort";
import ILearningWorldPort from "../../Application/LoadWorld/ILearningWorldPort";
import ErrorPort from "../../Ports/ErrorPort/ErrorPort";
import IErrorPort from "../../Ports/ErrorPort/IErrorPort";
import LearningElementPort from "../../Ports/LearningElementPort/LearningElementPort";
import LearningRoomPort from "../../Ports/LearningRoomPort/LearningRoomPort";
import LearningWorldPort from "../../Ports/LearningWorldPort/LearningWorldPort";
import IMoodlePort from "../../Ports/MoodlePort/IMoodlePort";
import MoodlePort from "../../Ports/MoodlePort/MoodlePort";
import IUIPort from "../../Ports/UIPort/IUIPort";
import UIPort from "../../Ports/UIPort/UIPort";
import AvatarPresenter from "../../Presentation/Babylon/Avatar/AvatarPresenter";
import PORT_TYPES from "./PORT_TYPES";

const PortsDIContainer = new ContainerModule((bind) => {
  // Ports
  bind<ILearningWorldPort>(PORT_TYPES.ILearningWorldPort)
    .to(LearningWorldPort)
    .inSingletonScope();

  bind<ILearningRoomPort>(PORT_TYPES.ILearningRoomPort)
    .to(LearningRoomPort)
    .inSingletonScope();

  bind<ILearningElementPort>(PORT_TYPES.ILearningElementPort)
    .to(LearningElementPort)
    .inSingletonScope();

  bind<IMoodlePort>(PORT_TYPES.IMoodlePort).to(MoodlePort).inSingletonScope();

  bind<IAvatarPort>(PORT_TYPES.IAvatarPort)
    .to(AvatarPresenter)
    .inSingletonScope();

  bind<IErrorPort>(PORT_TYPES.IErrorPort).to(ErrorPort).inSingletonScope();
  bind<IUIPort>(PORT_TYPES.IUIPort).to(UIPort).inSingletonScope();
});

export default PortsDIContainer;
