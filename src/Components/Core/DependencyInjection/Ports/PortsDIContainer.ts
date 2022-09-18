import { ContainerModule } from "inversify";
import ISpacePort from "../../Ports/SpacePort/ISpacePort";
import IElementPort from "../../Ports/ElementPort/IElementPort";
import IAvatarPort from "../../Application/LoadAvatar/IAvatarPort";
import IWorldPort from "../../Ports/WorldPort/IWorldPort";
import DebugPort from "../../Ports/DebugPort/DebugPort";
import IDebugPort from "../../Ports/DebugPort/IDebugPort";
import ElementPort from "../../Ports/ElementPort/ElementPort";
import SpacePort from "../../Ports/SpacePort/SpacePort";
import WorldPort from "../../Ports/WorldPort/WorldPort";
import IMoodlePort from "../../Ports/MoodlePort/IMoodlePort";
import MoodlePort from "../../Ports/MoodlePort/MoodlePort";
import IUIPort from "../../Ports/UIPort/IUIPort";
import UIPort from "../../Ports/UIPort/UIPort";
import AvatarPresenter from "../../Presentation/Babylon/Avatar/AvatarPresenter";
import PORT_TYPES from "./PORT_TYPES";

const PortsDIContainer = new ContainerModule((bind) => {
  // Ports
  bind<IWorldPort>(PORT_TYPES.IWorldPort).to(WorldPort).inSingletonScope();

  bind<ISpacePort>(PORT_TYPES.ISpacePort).to(SpacePort).inSingletonScope();

  bind<IElementPort>(PORT_TYPES.IElementPort)
    .to(ElementPort)
    .inSingletonScope();

  bind<IMoodlePort>(PORT_TYPES.IMoodlePort).to(MoodlePort).inSingletonScope();

  bind<IAvatarPort>(PORT_TYPES.IAvatarPort)
    .to(AvatarPresenter)
    .inSingletonScope();

  bind<IUIPort>(PORT_TYPES.IUIPort).to(UIPort).inSingletonScope();
  bind<IDebugPort>(PORT_TYPES.IDebugPort).to(DebugPort).inSingletonScope();
});

export default PortsDIContainer;
