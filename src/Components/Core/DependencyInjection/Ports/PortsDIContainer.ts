import { ContainerModule } from "inversify";
import ILearningRoomPort from "../../Application/CalculateTotalRoomScore/ILearningRoomPort";
import ILearningElementPort from "../../Application/LearningElementStarted/ILearningElementPort";
import ILearningWorldPort from "../../Application/LoadWorld/ILearningWorldPort";
import LearningElementPort from "../../Presentation/Ports/LearningElementPort/LearningElementPort";
import LearningRoomPort from "../../Presentation/Ports/LearningRoomPort/LearningRoomPort";
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
    .to(LearningRoomPort)
    .inSingletonScope();

  bind<ILearningElementPort>(PORT_TYPES.ILearningElementPort)
    .to(LearningElementPort)
    .inSingletonScope();

  bind<IMoodlePort>(PORT_TYPES.IMoodlePort).to(MoodlePort).inSingletonScope();
});

export default PortsDIContainer;
