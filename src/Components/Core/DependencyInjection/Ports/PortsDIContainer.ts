import { ContainerModule } from "inversify";
import ILearningRoomPort from "../../Application/CalculateTotalRoomScore/ILearningRoomPort";
import ILearningElementPort from "../../Application/LearningElementStarted/ILearningElementPort";
import IAvatarPort from "../../Application/LoadAvatar/IAvatarPort";
import ILearningWorldPort from "../../Application/LoadWorld/ILearningWorldPort";
import LearningElementPort from "../../Ports/LearningElementPort/LearningElementPort";
import LearningRoomPort from "../../Ports/LearningRoomPort/LearningRoomPort";
import LearningWorldPort from "../../Ports/LearningWorldPort/LearningWorldPort";
import IMoodlePort from "../../Ports/MoodlePort/IMoodlePort";
import MoodlePort from "../../Ports/MoodlePort/MoodlePort";
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
});

export default PortsDIContainer;
