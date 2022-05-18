import { ContainerModule } from "inversify";
import ILearningElementPort from "../../Application/LearningElementStarted/ILearningElementPort";
import ILearningWorldPort from "../../Application/LoadWorld/ILearningWorldPort";
import ILearningRoomPort from "../../Presentation/Babylon/LearningRoom/ILearningRoomPort";
import LearningRoomPresenter from "../../Presentation/Babylon/LearningRoom/LearningRoomPresenter";
import LearningElementPort from "../../Presentation/Ports/LearningElementPort/LearningElementPort";
import LearningWorldPort from "../../Presentation/Ports/LearningWorldPort/LearningWorldPort";
import IMoodlePort from "../../Presentation/Ports/MoodlePort/IMoodlePort";
import MoodlePort from "../../Presentation/Ports/MoodlePort/MoodlePort";
import PORT_TYPES from "./PORT_TYPES";
const PortsDIContainer = new ContainerModule((bind) => {
  // Ports
  bind<ILearningWorldPort>(PORT_TYPES.ILearningWorldPort)
    .to(LearningWorldPort)
    .inSingletonScope();

  bind<ILearningRoomPort>(PORT_TYPES.ILearningRoomPort)
    .to(LearningRoomPresenter)
    .inSingletonScope();

  bind<ILearningElementPort>(PORT_TYPES.ILearningElementPort)
    .to(LearningElementPort)
    .inSingletonScope();

  bind<IMoodlePort>(PORT_TYPES.IMoodlePort).to(MoodlePort).inSingletonScope();
});

export default PortsDIContainer;
