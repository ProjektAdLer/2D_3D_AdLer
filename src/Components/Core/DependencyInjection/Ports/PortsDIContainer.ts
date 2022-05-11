import { ContainerModule } from "inversify";
import ILearningWorldPort from "../../Application/LoadWorld/ILearningWorldPort";
import ILearningRoomPort from "../../Presentation/Babylon/LearningRoom/ILearningRoomPort";
import LearningRoomPresenter from "../../Presentation/Babylon/LearningRoom/LearningRoomPresenter";
import LearningWorldPort from "../../Presentation/Ports/LearningWorldPort/LearningWorldPort";
import PORT_TYPES from "./PORT_TYPES";
const PortsDIContainer = new ContainerModule((bind) => {
  // Ports
  bind<ILearningWorldPort>(PORT_TYPES.ILearningWorldPort)
    .to(LearningWorldPort)
    .inSingletonScope();

  bind<ILearningRoomPort>(PORT_TYPES.ILearningRoomPort)
    .to(LearningRoomPresenter)
    .inSingletonScope();
});

export default PortsDIContainer;
