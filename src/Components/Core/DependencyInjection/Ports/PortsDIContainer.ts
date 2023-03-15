import { ContainerModule } from "inversify";
import IAvatarPort from "../../Application/UseCases/LoadAvatar/IAvatarPort";
import IWorldPort from "../../Application/Ports/Interfaces/IWorldPort";
import WorldPort from "../../Application/Ports/WorldPort/WorldPort";
import ILMSPort from "../../Application/Ports/Interfaces/ILMSPort";
import LMSPort from "../../Application/Ports/LMSPort/LMSPort";
import IUIPort from "../../Application/Ports/Interfaces/IUIPort";
import UIPort from "../../Application/Ports/UIPort/UIPort";
import AvatarPresenter from "../../Presentation/Babylon/Avatar/AvatarPresenter";
import PORT_TYPES from "./PORT_TYPES";

const PortsDIContainer = new ContainerModule((bind) => {
  bind<IWorldPort>(PORT_TYPES.IWorldPort).to(WorldPort).inSingletonScope();

  bind<ILMSPort>(PORT_TYPES.ILMSPort).to(LMSPort).inSingletonScope();

  bind<IAvatarPort>(PORT_TYPES.IAvatarPort)
    .to(AvatarPresenter)
    .inSingletonScope();

  bind<IUIPort>(PORT_TYPES.IUIPort).to(UIPort).inSingletonScope();
});

export default PortsDIContainer;
