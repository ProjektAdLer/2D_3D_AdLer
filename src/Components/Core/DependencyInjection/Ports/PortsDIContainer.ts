import { ContainerModule } from "inversify";
import ILearningRoomPort from "../../Ports/LearningRoomPort/ILearningRoomPort";
import ILearningElementPort from "../../Ports/LearningElementPort/ILearningElementPort";
import IAvatarPort from "../../Application/LoadAvatar/IAvatarPort";
import ILearningWorldPort from "../../Ports/LearningWorldPort/ILearningWorldPort";
import DebugPort from "../../Ports/DebugPort/DebugPort";
import IDebugPort from "../../Ports/DebugPort/IDebugPort";
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

  bind<IUIPort>(PORT_TYPES.IUIPort).to(UIPort).inSingletonScope();
  bind<IDebugPort>(PORT_TYPES.IDebugPort).to(DebugPort).inSingletonScope();
});

export default PortsDIContainer;
